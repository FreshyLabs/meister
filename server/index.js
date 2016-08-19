/* eslint-disable no-console */
const http           = require( 'http' );
const express        = require( 'express' );
const morgan         = require( 'morgan' );
const bodyParser     = require( 'body-parser' );
const path           = require( 'path' );
const methodOverride = require( 'method-override' );
const passport       = require( 'passport' );
const cookieParser   = require( 'cookie-parser' );
const session        = require( 'cookie-session' );
const expiry         = require( 'static-expiry' );

const webpack              = require( 'webpack' );
const webpackDevMiddleware = require( 'webpack-dev-middleware' );
const webpackHotMiddleware = require( 'webpack-hot-middleware' );

const config        = require( './config' );
const initRoutes    = require( './routes' );
const webpackConfig = require( '../webpack.config' );
const compiler      = webpack( webpackConfig );
require( './passport' );

const app = express();
const expiryHeaders = config.mode === 'production' ? 'both' : 'none';

if ( config.mode !== 'production' ) {
  app
    .use( webpackDevMiddleware( compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }))
    .use( webpackHotMiddleware( compiler ) );
}

app
  .use( bodyParser.urlencoded( { limit: '50mb', extended: true } ) )
  .set( 'view engine', 'pug' )
  .use( morgan( 'dev' ) )
  .use( expiry( app, {
    dir:           path.join( __dirname, '/public' ),
    conditional:   expiryHeaders,
    unconditional: expiryHeaders
  } ) )
  .use( express.static( path.join( __dirname, '/public' ) ) )
  .use( methodOverride( 'X-HTTP-Method-Override' ) )
  .use( cookieParser() )
  .use( session( { secret: 'what?', resave: false,  saveUninitialized: false } ) );

app
  .use( passport.initialize() )
  .use( passport.session() );

initRoutes( app );

http.createServer( app )
  .listen( config.port, () => console.log( '\nListening on ' + config.port + '\n' ) );
