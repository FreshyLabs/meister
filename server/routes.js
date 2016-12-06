'use strict';
/* eslint-disable no-console */
const express    = require( 'express' );
const passport   = require( 'passport' );
const bodyParser = require( 'body-parser' );

const config              = require( './config' );
const db                  = require( './db' );
const Users               = require( './users.json' );

const Scraper = require('../lib/scraper');
const CronOne = require('../lib/cron');

const apiRouter = express.Router();
const json      = bodyParser.json( { limit: '50mb' } );

function onSuccess( res ) {
  return results => res.status( 200 ).send( results );
}

function onError( res ) {
  return err => {
    console.error( err );
    res.sendStatus( err.code || 500 );
  };
}

function needsLogin( req, res, next ) {
  if ( req.user ) {
    req.needsLogin = false;
  } else {
    req.needsLogin = true;
  } 
  next();
}

function isWhitelisted( url ) {
  return false;
}

apiRouter
  .use( function authenticate( req, res, next ) {
    if ( req.isAuthenticated() || isWhitelisted( req.url ) ) {
      next();
    } else {
      res.sendStatus( 401 );
    }
  })
  .use( json );

apiRouter.route( '/mountains' )
  .get( function listKernels( req, res ) {
    db.Mountain.find( {} ).exec()
      .then( onSuccess( res ), onError( res ) );
  } )
  .post( function createMountain( req, res ) {
    try {
      const isFreshyUser = ~Users.indexOf( req.user.profile.nickname );
      if ( req.body.type !== 'external' && !isFreshyUser ) {
        res.sendStatus( 403 );
      } else {
        db.Mountain.create( req.body ).then( onSuccess( res ), onError( res ) );
      }
    } catch ( error ) {
      console.log( error );
      res.sendStatus( 500 );
    }
  } );



apiRouter.route( '/mountains/scraper' )
  .post( function scraper( req, res ) {
    db.Mountain.findOne( { name: req.body.name } ).exec()
      .then( doc => {
        doc.error = [];
        Scraper( doc, req.body.url, eval( "(" + req.body.func + ")") )
          .then( result => res.status( 200 ).send( result[ 1 ] ) )
          .catch( err => res.status( 200 ).send( err ) );
      })
  });
 

apiRouter.route( '/mountains/:id' )
  .get( function getMtn( req, res ) {
    db.Mountain
      .findOne( { name: req.params.id } ).exec()
      .then( onSuccess( res ), onError( res ) );
  } )
  .put( function updateMtn( req, res ) {
    db.Mountain
      .findOne( { name: req.params.id } ).exec()
      .then( mtn => { 
          const newMtn = Object.assign( mtn, req.body );
          newMtn.save();
          return newMtn;
      })
      .then( mtn => {
          CronOne( mtn, true );
          res.status( 200 ).send( mtn );
        }, 
        onError( res ) 
      );

    res.sendStatus( 200 );
  } )

apiRouter.route( '/user/current' )
  .get( function getCurrentUser( req, res ) {
    let user = req.user && req.user.toJSON ? req.user.toJSON() : req.user;
    if ( user && ~Users.indexOf( user.profile.username ) ) {
      user = Object.assign( {}, user, { admin: true } );
    }
    res.status( 200 ).send( user );
  });


module.exports = function initRoutes( app ) {

  app.route( '/callback' )
    .get(
      passport.authenticate( 'github', { failureRedirect: '/' } ),
      function( req, res ) {
        if ( !req.user ) {
          throw new Error( 'user null' );
        }
        res.redirect( '/' );
      }
    );

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

  app.route( '/logout' )
    .get( ( req, res ) => {
      req.logout();
      res.redirect( '/' );
    } );

  app.use( '/api', apiRouter );

  app.route( '/*' )
    .all( needsLogin )
    .get( ( req, res ) => {
      res.render( 'index', {
        mode:          config.mode,
        login:         req.needsLogin,
        host:          config.protocol + config.host
      } );
    } );
};
