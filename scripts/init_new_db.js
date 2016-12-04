//script to pull down an array of resorts and ingest them into one db locally 

var request = require('request'),
  db = require('../server/db'),
  scrapers = require('../../../freshymap_live/data/scraper_docs');
  

function getAll(){
  //request.get({url: 'http://66.228.48.190/mountains', json: true}, function(err, res, data){
  request.get({url: 'http://freshymap.com/data/mountains', json: true}, function(err, res, data){
    console.log(data.length);
    //console.log('data', data, err)
    var cnt = 0;
    data.forEach(function(f, i){
      var feature = f.feature;
      console.log(feature.properties.Name, cnt++)
      feature.properties.snow = [0];
      feature.properties.wx_history = [0];

      var scraper = scrapers[feature.properties.Name];

      var model = {
        name: feature.properties.Name,
        data: {},
        error: [],
        scraperUrl: scraper.url,
        scraperFunc: scraper.scraper,
        scraperHeaders: scraper.headers || [],
        feature: {
          properties: feature.properties,
          geometry:feature.geometry
        }
      };
      
      db.Mountain.create( model, function( err, mtn ){
        if (err){
          console.log('didnt insert', m);
        } else {
          console.log('Success!')
        }
      } )
      /*mountains.insert(model, function(err){
        console.log(feature.properties.Name, err)
      });*/
    });
  });
}


// hmm underscore has a function called purge I should use
function findScraper(name){
  var scraper;
  /*for (var i = 0; i < scrapers.length; i++){
    
    console.log(name, scrapers[i].name)
    if (scrapers[i].name == name) {
      scraper = scrapers[i];
      delete scraper.name;
      delete scraper.state;
      //console.log(JSON.stringify(scraper.scraper));
      //scraper.scraper = scraper.scraper + '';
    }
  }*/
  
  return scraper;
}

getAll('colorado');

