const request = require('superagent');
const cheerio = require('cheerio');

function Scrape( url, fn, cb ) {
    var req = request.get( url );

    req.on('error', function(e){
      console.log('Wha happened', e );
    });

    req.end( function( err, data ) {
      
      if (err || !data || (data.status && data.status != 200)) {
        cb( 'No 200 response' );
      } else {
        var result = {};
        var $ = cheerio.load( data.text );
        try {
          var result = fn.apply(this, [ null, $, data.text ] );
          cb( null, result )
        } catch( e ) {
          cb( 'Uncaught err ' + e );
        }
      }
    });
}

module.exports = Scrape;
