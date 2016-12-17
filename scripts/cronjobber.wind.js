const db = require( '../server/db' );
const Collect = require('../lib/cron.wind');

function next(){
  Collect( mtns.shift() )
    .then( next )
    .catch( err => {
      console.log('Problem running scraper, should update the DB with the error and surface in Miester', err )
      next();
    } )
}

db.Mountain.find( {}, (err, all) => { mtns = all; return next(); });
