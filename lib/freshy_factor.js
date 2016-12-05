function FreshyFactor( doc ) {
  return new Promise( ( resolve ) => {
    var val = 0, min = 0, max = 100;

    var factors = {};

    val += factors['new_snow'] = doc.feature.properties.current_status === "open" ? 
      _newSnowFactor( doc.feature.properties.current_new ) : 0;

    val += factors['five_day'] = _fiveDaySnowFactor( doc.feature.properties.five_day_snow || 0 );

    val += factors['time_of_day'] = _timeOfDayFactor() * -1;
    factors['day_of_week'] = _dayOfWeekFactor();

    val = ( (val <= max) ? ((val >= min) ? Math.round(val) : min) : max);
    console.log('FRESHYFACTOR: ', val, 'factors', factors);
    doc.feature.properties.freshy_factor = val;

    resolve( doc );
  });
}

function _newSnowFactor( snow ) {
  if ( snow == 0 || !snow) {
    return 0;
  } else {
    var max = 10;
    return ( snow >= max ) ? 100 : ( snow/max ) * 100;
  }
}

function _fiveDaySnowFactor( fiveday ) {
  var max = 30;
  return ( fiveday >= max ) ? 100 : ( fiveday/max ) * 75;
}

function _timeOfDayFactor() {
  var d = new Date();
  var curr_hour = d.getHours();
  var val = ((curr_hour > 10) ? curr_hour-10 : 0 ) * 2;
  return val;
}

function _dayOfWeekFactor(){
  var weekday = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(' ');
  var day = weekday[ new Date().getDay() ];
  var factor = 1;
  return factor;
}

module.exports = FreshyFactor;
