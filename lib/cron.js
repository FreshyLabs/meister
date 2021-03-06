const db = require( '../server/db' );
const Scraper = require('../lib/scraper');
const Snow = require('../lib/snow');
const FreshyFactor = require('../lib/freshy_factor');

var mtns = [];


function Collect( mtn, skipSnow ) {
  if ( mtn ) {
    console.log(mtn.name)
    mtn.error = [];
    return Scraper( mtn, mtn.scraperUrl, mtn.scraperFunc )
      .then( result => Snow( result[ 0 ], skipSnow ? null : result[ 1 ] ) )
      .then( doc => FreshyFactor( doc ) )
      .then( doc => {
        console.log('Saving...', doc.error );
        return db.Mountain.findOneAndUpdate(
          { _id: doc._id },
          { 'feature.properties': doc.feature.properties, 'error': doc.error },
          { upsert: true } );
      })

      .catch( doc => {
        console.log('ERROR', doc.error );
        db.Mountain.findOneAndUpdate( { _id: doc._id }, doc, { upsert: true } )
      } );

    } else {
      process.exit();
    }
}

module.exports = Collect;
