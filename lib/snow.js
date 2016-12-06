
function Snow( doc, newSnow ) {
  return new Promise( resolve => {

    doc.feature.properties.report_time = new Date();

    if ( !newSnow ) {
      return resolve( doc );
    }
    try { 
      var now = new Date();
      if ( !doc.data ) { 
        doc.data = { snow: [] };
      }
      doc.data.snow.push({"new_snow": newSnow["new"], "base_depth": newSnow["base"], "date": now});

      // Calc the 5 day past snow (for the freshy factor)
      var snow = {};
      var five_day_total = 0;

      var x = 5; // go back 5 days!
      var e = now.setDate(now.getDate() - x);
      var d5 = new Date(e).getTime();

      for (var i = 0; i < doc.data.snow.length; i++ ){
        var cur = doc.data.snow[i];
        var d = new Date( cur.date );
        if ( d.getTime() > d5 ) {
          if (!snow[d.getDay()]) {
            snow[d.getDay()] = parseInt(cur.new_snow);
          } else if (snow[d.getDay()] < parseInt(cur.new_snow)) {
            snow[d.getDay()] = parseInt(cur.new_snow);
          }
        }
      }

      for (var day in snow) {
        five_day_total += parseInt(snow[day]);
      }

      doc.feature.properties.five_day_snow = five_day_total;
      doc.feature.properties.current_new = newSnow["new"];
      doc.feature.properties.current_base = newSnow["base"];
      doc.feature.properties.current_conditions = newSnow["conditions"];
      return resolve( doc );
    } catch ( e ) {
      doc.error.push( { snowStats: e } );
      return resolve( doc );
    }
  });
}

module.exports = Snow;
