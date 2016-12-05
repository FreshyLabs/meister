//script to pull down an array of resorts and ingest them into one db locally 

var request = require('request'),
  db = require('../server/db');
  
db.Mountain.find({}).remove().exec()
/*  .then( function( docs ) {
    docs.forEach( function(d){
      console.log(d.remove)
      //d.remove( function(err) {
      //  console.log(err)
      //}) 
    });
    process.exit();
  }, function(err){ 
    console.log(err) 
  })*/


