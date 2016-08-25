const webpack           = require( 'webpack' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const postcssImport     = require('postcss-import');
const config            = require( './server/config' );

const entry = {
  'bundle':       './app/index',
  'bundle_login': './app_login/index'
};

const plugins = [
  new webpack.EnvironmentPlugin( [ 'NODE_ENV' ] ),
  new webpack.optimize.CommonsChunkPlugin( 'common.js' )
];

if ( config.mode !== 'production' ) {
  Object.keys( entry ).forEach( key => {
    entry[ key ] = [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      entry[ key ]
    ];
  });
  plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
} else {
  plugins.push( new ExtractTextPlugin( 'app.css' ) );
}


const babelSettings = {
  plugins: [
    'transform-flow-strip-types',
    'add-module-exports',
    'transform-regenerator',
    'transform-decorators-legacy'
  ],
  presets: [ 'es2015', 'react', 'stage-1' ],
  env: {
    development: {
      plugins: ['react-hot-loader/babel']
    }
  }
};

module.exports = {
  module: {
    loaders: [
      { test: /\.css$/, loader: config.mode === 'production'
        ? ExtractTextPlugin.extract( 'style-loader', 'css-loader!postcss-loader' ) :
        'style-loader!css-loader?sourceMap!postcss-loader'
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [`babel?${JSON.stringify( babelSettings )}`]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'file-loader?name=img/[name].build-[hash].[ext]'
      }
    ]
  },
  entry,
  output: {
    path: __dirname + '/server/public',
    filename: '[name].js',
    publicPath: `${config.protocol}${config.host}/`
  },
  plugins,
  devtool: 'cheap-module-source-map',
  postcss: function( wpack ) {
    return [
      postcssImport({
        addDependencyTo: wpack,
        path: './app/styles'
      })
    ];
  }
};
