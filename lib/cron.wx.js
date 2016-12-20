const db = require( '../server/db' );
const Scraper = require('../lib/scraper');
const Wx = require('../lib/wx');

var mtns = [];

function Collect( mtn, skipSnow ) {
  if ( mtn ) {
    console.log('mtn', mtn.name, mtn.feature.properties.one_day_weather);
    mtn.error = [];
    return Wx( mtn )
      .then( doc => {
        console.log('Saving WIND...', doc.error[0].wx );
        return db.Mountain.findOneAndUpdate(
          { _id: doc._id },
          { 
            'feature.properties.current_weather': doc.feature.properties.current_weather, 
            'feature.properties.one_day_forecast': doc.feature.properties.one_day_forecast,
            'feature.properties.snow_forecast': doc.feature.properties.snow_forecast,
            'error': doc.error
          },
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
