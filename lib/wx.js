var request = require('superagent');

function Wx( doc ) {
  return new Promise( ( resolve ) => {
    console.log('update weather')
    var snow_forecast = [];
    var one_day_forecast = {};
    var current_weather = {};
    var lat = doc.feature.properties.latitude;
    var lon = doc.feature.properties.longitude;

    var url = 'http://api.worldweatheronline.com/free/v1/weather.ashx?key=vbt3mdk5ss2bdg88gsy5x2kg&q='+lat+','+lon+'&num_of_days=5&format=json';
    console.log(url)
    request.get(url)
      .on('error', function( e ) {
        doc.error.push( { wx: e.message } );
        return resolve( doc );
      })
      .end( function( err, body ) {
        if ( !body ) {
          doc.error.push( { wx: 'No body: ' + url } );
          return resolve( doc );
        }
        try {
          var json = JSON.parse(body.text);
          if ( json.data.error ) {
            doc.error.push( { wx: json.data.error } );
            return resolve( doc );
          }
          //daily min max temps
          one_day_forecast.time = json.data.weather[0].date;
          one_day_forecast.max = Math.round( json.data.weather[0].tempMaxF );
          one_day_forecast.min = Math.round( json.data.weather[0].tempMinF );
          doc.feature.properties.one_day_forecast = one_day_forecast;

          //current weather
          current_weather.wind_speed = json.data.current_condition[0].windspeedMiles;
          current_weather.wind_direction = json.data.current_condition[0].winddir16Point;
          current_weather.time = json.data.current_condition[0].observation_time;
          current_weather.temp = Math.round( json.data.current_condition[0].temp_F );
          current_weather.weather = json.data.current_condition[0].weatherDesc[0].value;
          current_weather.icon = json.data.current_condition[0].weatherDesc[0].value;
          doc.feature.properties.current_weather = current_weather;
          //snow forecast
          var s = 0;
          for (var i = 0; i < json.data.weather.length; i++){
            var snow_amt;
            //console.log('wx', json.data.weather[i]);
            //console.log('here', json.data.weather[i].tempMinF)

            if ( json.data.weather[i].tempMinF > 36) {

              //assume too warm for snow
              snow_amt = 0;

            } else if ( json.data.weather[i].tempMinF <=36 && json.data.weather[i].tempMinF >=33 ) {

              snow_amt = (json.data.weather[i].precipMM * 0.039370) * 9;
              if ( json.data.weather[i].weatherDesc[0].value.toLowerCase().match('rain')) {
                snow_amt = 0;
              }
              if ( json.data.weather[i].weatherDesc[0].value.toLowerCase().match('sleet')) {
                snow_amt = snow_amt / 10;
              }

            } else if ( json.data.weather[i].tempMinF < 33 && json.data.weather[i].tempMinF >= 28 ) {

              snow_amt = (json.data.weather[i].precipMM * 0.039370) * 10;
              if ( json.data.weather[i].weatherDesc[0].value.toLowerCase().match('rain')) {
                snow_amt = snow_amt / 4;
              }
              if ( json.data.weather[i].weatherDesc[0].value.toLowerCase().match('sleet')) {
                snow_amt = snow_amt / 8;
              }

            } else if ( json.data.weather[i].tempMinF < 28 && json.data.weather[i].tempMinF >= 22 ) {

              //snow ratio 13:1
              snow_amt = (json.data.weather[i].precipMM * 0.039370) * 13;
              if ( json.data.weather[i].weatherDesc[0].value.toLowerCase().match('rain')) {
                snow_amt = snow_amt / 3;
              }
              if ( json.data.weather[i].weatherDesc[0].value.toLowerCase().match('sleet')) {
                snow_amt = snow_amt / 5;
              }

            } else if ( json.data.weather[i].tempMinF < 22 ) {
              //snow ratio 17:1
              snow_amt = (json.data.weather[i].precipMM * 0.039370) * 17;
              if ( json.data.weather[i].weatherDesc[0].value.toLowerCase().match('rain')) {
                snow_amt = snow_amt / 3;
              }
              if ( json.data.weather[i].weatherDesc[0].value.toLowerCase().match('sleet')) {
                snow_amt = snow_amt / 4;
              }

            }

            if ( !snow_amt ) snow_amt = 0;
            snow_forecast.push({weather: json.data.weather[i].weatherDesc, time: json.data.weather[i].date, snow_amount: snow_amt});

          }

          doc.feature.properties.snow_forecast = snow_forecast;
          resolve( doc );
        } catch ( e ) {
          doc.error.push( { wx: e } );
          resolve( doc )
        }

      });
  });
}

module.exports = Wx;
