const request = require('superagent');
const cheerio = require('cheerio');

function Scrape( doc, url, fn ) {
  return new Promise( resolve => {
    const req = request.get( url );

    req.on('error', function(e){
      doc.error.push( { newsnow: e } );
      resolve( [ doc, {} ] );
    });

    req.end( function( err, data ) {
      if (err || !data || (data.status && data.status != 200)) {
        doc.error.push( { newsnow: 'No 200 Response from URL:'+ url } );
        resolve( [ doc, {} ] );
      } else {
        const $ = cheerio.load( data.text );
        try {
          const result = fn.apply(this, [ null, $, data.text ] );
          resolve( [ doc, result ] );
        } catch( e ) {
          doc.error.push( { newsnow: e } );
          resolve( [ doc, {} ] );
        }
      }
    });
  });
}

module.exports = Scrape;
