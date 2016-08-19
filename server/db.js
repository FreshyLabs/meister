/* eslint-disable no-console */
const jwt      = require( 'jsonwebtoken' );
const mongoose = require( 'mongoose' );

const config             = require( './config' );

const db       = config.database;
const ObjectId = mongoose.Schema.Types.ObjectId;
const models   = {};

mongoose.connect( db );

/**
 * users
 */
const userSchema = mongoose.Schema( {
  createdAt:        { type: Date, default: Date.now },
  githubId:         String,
  profile:          Object,
  wasNew:           Boolean
} );

userSchema.pre( 'save', function setWasNew( next ) {
  this.wasNew = this.isNew;
  next();
} );


/**
 *  Mountains
 */
const mtnSchema = mongoose.Schema( {
  createdAt:    { type: Date, default: Date.now },
  scraper:      String,
  feature:      mongoose.Schema.Types.Mixed,
  name:         String
} );


Object.assign( models, {
  Mountain: mongoose.model( 'Mountain', mtnSchema ),
  User:   mongoose.model( 'User', userSchema ),
  _db:    mongoose.connection.db
});

module.exports = models;
