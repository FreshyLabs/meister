var request = require('request'), cheerio = require('cheerio');

var docs = {'Alta':{
  state:'utah',
  url:'http://www.alta.com/pages/report.php',
  scraper:function(errors, $){
    var newsnow = parseInt( $('.fullwidthtextleft .tablerowwhite').eq(1).text() );
    var base = parseInt( $('.fullwidthtextleft .tablerowwhite').eq(13).text() );
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},
'Snowbird':{
  state:'utah',
  url:'http://www.snowbird.com/',
  headers: [['User-Agent', 'freshy-request']],
  scraper:function(errors, $){
    console.log(parseInt($('.total-inches').innerHTML));
    var newsnow = 0; //parseInt( $('#snowfall .total-inches').eq(0).text() );
    var base = parseInt( $('#snowfall .total-inches').eq(2).text() );
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Beaver Mountain':{
  state:'utah',
  url:'http://www.skithebeav.com/c/mountain/weather-report--cams',
  scraper:function(errors, $){
    var newsnow = parseInt($('.middle strong').eq(1).text()) || 0;
    var base = parseInt($('.middle div').eq(5).text().split('Total Snow:')[1]);
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Brian Head':{
  state:'utah',
  url:'http://brianhead.com/winter/conditions/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.fancy-table tr td').eq(0).text());
    var base = parseInt($('.fancy-table tr td').eq(4).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Brighton':{
  state:'utah',
  url:'http://www.brightonresort.com/mountain/snow-report/',
  scraper:function(errors, $){
    var newsnow = parseInt($('p').eq(3).text().split(':')[1]);
    var base = parseInt($('.c_totals.quarter h2').eq(0).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Deer Valley':{
  state:'utah',
  url:'http://www.deervalley.com/OnTheMountain/Mountain',
  scraper:function(errors, $){
    var newsnow = parseInt($('.snow_stats_list span').eq(0).text());
    var base = parseInt($('.snow_stats_list span').eq(3).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Park City':{
  state:'utah',
  url:'http://www.parkcitymountain.com/site/mountain-info/conditions/snow-report/snow_report',
  scraper:function(errors, $){
    var newsnow = parseInt($('.resort-conditions-value-numeric').eq(0).text());
    var base = parseInt($('.value-line').eq(5).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Powder Mountain':{
  state:'utah',
  url:'http://www.powdermountain.com/en/resort-conditions/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.stat').eq(0).text());
    var base = parseInt($('.stat').eq(1).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Solitude':{
  state:'utah',
  url:'http://www.skisolitude.com/mountain/snow-report.php',
  scraper:function(errors, $){
    var newsnow = parseInt($('table').eq(1).find('td').eq(1).text());
    var base = parseInt($('table').eq(1).find('td').eq(4).text());
    var conditions = 'n/a';
    console.log(newsnow, base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Sundance':{
  state:'utah',
  url:'http://www.sundanceresort.com/winter/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.contentBlock p').eq(5).text().split(":")[1]);
    var base = parseInt($('.contentBlock p').eq(5).text().split("Base")[1]);
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Snow Basin':{
  state:'utah',
  url:'http://www.snowbasin.com/mountain/mountain-report/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.conditions-list .value').eq(1).text());
    var base = parseInt($('.conditions-list .value').eq(4).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Canyons':{
  state:'utah',
  url:'http://www.canyonsresort.com/snow_report.html',
  scraper:function(errors, $){
    var newsnow = parseInt($('.newSnow td').eq(1).text());
    var base = parseInt($('.snowConditions td').eq(3).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Terry Peak": {
    state: 'south dakota',
    url: 'http://www.terrypeak.com/TheMountain/Weather',
    scraper:function(errors, $){
      var newsnow = parseInt($('.view-weather-report .table-cell').eq(1).text()) || 0;
      var base = parseInt($('.view-weather-report .table-cell').eq(7).text().split('-')[1]);
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':parseInt(newsnow), 'base': parseInt(base), 'conditions':conditions};
    }
},'Jackson Hole':{
  state:'wyoming',
  url:'http://www.jacksonhole.com/weather-snow-report.html',
  scraper:function(errors, $){
    var newsnow = parseInt($('.col-md-4').eq(10).text());
    var base = parseInt($('.col-md-4').eq(19).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Grand Targhee':{
  state:'wyoming',
  url:'http://www.grandtarghee.com',
  scraper:function(errors, $){
    var newsnow = parseInt($('#weatherRow1 .orange').eq(0).text());
    var base = parseInt($('#weatherRow1 .orange').eq(2).text());
    var conditions = 'n/a';
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Big Sky':{
  state:'montana',
  url:'http://www.bigskyresort.com/activities/winter/conditions.asp',
  scraper:function(errors, $){
    var newsnow = parseInt($('.snow-report .large').eq(0).text());
    var base = parseInt($('.snow-depth strong').eq(0).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Bridger Bowl':{
  state:'montana',
  url:'http://bridgerbowl.com/Weather/Snow-Report',
  scraper:function(errors, $){
    //console.log($('span').eq(1).innerHTML)
    var newsnow = parseInt($('.new-snow-and-base-info').eq(1).text());
    var base = parseInt($('.new-snow-and-base-info').eq(2).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, 'Showdown':{
  state:'montana',
  url:'http://www.showdownmontana.com/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.report tr td').eq(0).text());
    var base = parseInt($('.report tr td').eq(1).text());
    var conditions = "n/a";
    console.log('new?', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, 'Montana Snowbowl':{
  state:'montana',
  url:'http://montanasnowbowl.com/report.php3',
  scraper:function(errors, $){
    var newsnow = parseInt($('table tr td').eq(9).text());
    var base = parseInt($('table tr td').eq(8).text());
    var conditions = "n/a";
    console.log('new?', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, 'Moonlight Basin':{
  state:'montana',
  url:'http://bigskyresort.com/the-mountain/snow-report-and-conditions',
  scraper:function(errors, $){
    var newsnow = parseInt($('.snow-report .large').eq(1).text());
    var base = parseInt($('.snow-depth strong').eq(0).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Red Lodge Mountain':{
  state:'montana',
  url:'http://www.redlodgemountain.com/snow-report',
  scraper:function(errors, $){
    var newsnow = parseInt($('#current_snow_conditions table tr td').eq(5).text());
    var base = parseInt($('#current_snow_conditions table tr td').eq(19).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Whitefish':{
  state:'montana',
  url:'http://skiwhitefish.com/favorites/snow-report/',
  scraper:function(errors, $){
    var newsnow = parseInt($('table tr td').eq(34).text().split('/')[0]);
    var base = parseInt($('table tr td').eq(27).text().split('/')[0]);
    var conditions = "n/a";
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Blacktail':{
  state:'montana',
  url:'http://www.blacktailmountain.com/snow-report/',
  scraper:function(errors, $){
    var newsnow = parseInt($('#snow li').eq(2).text().split(':')[1]) || 0;
    var base = parseInt($('#snow li').eq(5).text().split(':')[1]);
    var conditions = "n/a";
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Bear Paw Ski Bowl':{
  state:'montana',
  url:'http://www.skibearpaw.com/snowreport.html',
  scraper:function(errors, $){
    var newsnow = parseInt($('#home p').eq(0).text().split(":")[1]);
    var base = parseInt($('#home p').eq(2).text().split(":")[1]);
    var conditions = "n/a";
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Discovery':{
  state:'montana',
  url:'http://www.skidiscovery.com/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.weather-snow-report tr td').eq(5).text());
    var base = parseInt($('.weather-snow-report tr td').eq(9).text());
    var conditions = "n/a";
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Maverick Mountain':{
  state:'montana',
  url:'http://skimaverick.com/mountain/snow-report/',
  scraper:function(errors, $){
    var newsnow = parseInt($('#content750 tr td').eq(3).text()) || 0;
    var base = parseInt($('#content750 tr td').eq(25).text());
    var conditions = $('#content750 tr td').eq(19).text();
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Bogus':{
  state:'idaho',
  url:'http://www.inidaho.com/idaho_snow_reports.asp',
  scraper:function(errors, $){
    var newsnow = parseInt($('#isocontainer div').eq(13).text()) || 0;
    var base = parseInt(($('#isocontainer div').eq(16).text()).replace(/Base/, '')) || 0;
    var conditions = "n/a"
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Brundage':{
  state:'idaho',
  url:'http://www.inidaho.com/idaho_snow_reports.asp',
  scraper:function(errors, $){
    var newsnow = parseInt($('#isocontainer div').eq(31).text()) || 0;
    var base = parseInt(($('#isocontainer div').eq(34).text()).replace(/Base/, ''));
    var conditions = 'n/a';
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Pomerelle':{
  state:'idaho',
  url:'http://www.inidaho.com/idaho_snow_reports.asp',
  scraper:function(errors, $){
    var newsnow = parseInt($('#isocontainer div').eq(13).text()) || 0;
    var base = parseInt(($('#isocontainer div').eq(16).text()).replace(/Base/, '')) || 0;
    var conditions = 'n/a';
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Schweitzer':{
  state:'idaho',
  url:'http://www.schweitzer.com/mountain/',
  scraper:function(errors, $){
    var newsnow = parseInt( $('.shortConditions .hour').eq(0).text() );
    var base = parseInt( $('.shortConditions .base').eq(0).text() );
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Silver':{
  state:'idaho',
  url:'http://www.silvermt.com/snow-report',
  scraper:function(errors, $){
    var newsnow = parseInt($('#NewSnow #dnn_ctr708_FullView_lblSnowLast24Hr').eq(0).text());
    var base = parseInt($('#dnn_ctr708_FullView_lblSnowBaseMidMountain').eq(0).text());
    var conditions = $('#contentDiv tr td').eq(6).text();
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Sun Valley':{
  state:'idaho',
  url:'http://www.inidaho.com/idaho_snow_reports.asp',
  scraper:function(errors, $){
    var newsnow = parseInt($('#isocontainer div').eq(127).text()) || 0;
    var base = parseInt(($('#isocontainer div').eq(130).text()).replace(/Base/, ''));
    var conditions = 'n/a';
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Tamarack':{
  state:'idaho',
  url:'http://tamarackidaho.com/winter/snow-report',
  scraper:function(errors, $){
    var newsnow = parseInt($('.snowtable.reporttable tr td').eq(1).text());
    var base = parseInt($('.snowtable.reporttable tr td').eq(5).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'49 Degrees North':{
  state:'washington',
  url:'http://www.ski49n.com/snow_report.php',
  scraper:function(errors, $){
    var newsnow = parseInt($('.report2').eq(7).text()) || 0;
    var base = parseInt($('.report2').eq(10).text());
    var conditions = 'n/a';
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Bluewood':{
  state:'washington',
  url:'http://www.bluewood.com/',
  scraper:function(errors, $){
    var newsnow = parseInt( $('#conditionsInfo .column').eq(3).text() ) || 0;
    var base = parseInt( $('#conditionsInfo .column').eq(8).text() );
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Crystal':{
  state:'washington',
  url:'http://crystalmountainresort.com/the-mountain/about/current-conditions/',
  scraper:function(errors, $){
    var newsnow = parseInt( $('#hours-24').text() );
    var base = parseInt( $('#top-depth').text() );
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Hurricane Ridge':{
  state:'washington',
  url:'http://www.skiwashington.com/conditions',
  scraper:function(errors, $){
    var newsnow = 0; //$('#weather-conditions2 table tr td').eq(4).text();
    var base = 0; //$('#weather-conditions2 .standard').eq(10).text();
    var conditions = 'n/a';
    console.log('FIX HURRICANE RIDGE');
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Loup Loup':{
  state:'washington',
  url:'http://www.skitheloup.com/the_mountain/conditions/',
  scraper:function(errors, $){
    var newsnow = $('#content strong').eq(3).text().replace(/New Snow Past 24 hrs :/g, '');
    var base = parseInt($('.wrapper h2').eq(3).text().split(')').pop().replace(/:/,''));
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Mission Ridge':{
  state:'washington',
  url:'http://www.missionridge.com/the-mountain/snow-conditions.html',
  scraper:function(errors, $){
    var newsnow = parseInt($('.weather.data-table tr td').eq(6).text());
    var base = parseInt($('.weather.data-table tr td').eq(29).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Mt. Baker':{
  state:'washington',
  url:'http://winter.mtbaker.us/snow-report/',
  scraper:function(errors, $){
    var newsnow = parseInt( $('.snowReportContainer tr td').eq(6).text() );
    var base = parseInt( $('.snowReportContainer tr td').eq(11).text() );
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Mt. Spokane':{
  state:'washington',
  url:'http://www.mtspokane.com/snowreport',
  scraper:function(errors, $){
    var newsnow = parseInt( $('.snowReportBg2 span').eq(5).text() );
    var base = parseInt( $('.snowReportBg2 span').eq(3).text() );
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Stevens Pass':{
  state:'washington',
  url:'http://www.stevenspass.com/site/mountain/reports/snow-and-weather-report/@@snow-and-weather-report',
  scraper:function(errors, $){
    var newsnow = parseFloat($('.page-report-snowfall-value').eq(0).text());
    var base = parseFloat($('.page-report-snowdepth-value').eq(0).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);

    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'The Summit':{
  state:'washington',
  url:'http://www.summitatsnoqualmie.com/conditions',
  scraper:function(errors, $){
    var newsnow = parseInt( $('.condition-snow').eq(2).text() );
    var base = parseInt( $('.snow-base .value').eq(1).text() );
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'White Pass':{
  state:'washington',
  url:'http://skiwhitepass.com/the-mountain/snow-report.aspx',
  scraper:function(errors, $){
    var newsnow = parseInt( $('.Pink60').eq(0).text() );
    var base =  parseInt($('.Gry60').eq(0).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Alpine Meadows':{
  state:'california',
  url:'http://www.skialpine.com/mountain/snow-report',
  scraper:function(errors, $){
    var newsnow = parseInt($('#current_snow_conditions tr td').eq(4).text());
    var base = parseInt($('#current_snow_conditions tr td').eq(2).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Bear Valley':{
  state:'california',
  url:'http://www.bearvalley.com/weather',
  scraper:function(errors, $){
    var base = parseInt($('.base').eq(0).text().replace(/p|<|>|\/|Base Total/g,''));
    var newsnow = parseInt($('.stat.off').eq(3).text().replace(/p|<|>|\/|24hr Snowfall/g,''));
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Homewood Mountain Resort':{
  state:'california',
  url:'http://www.skihomewood.com/mountain/snow-report',
  scraper:function(errors, $){
    var newsnow = parseInt($('#current_snow_conditions tr td').eq(4).text());
    var base = parseInt($('#current_snow_conditions tr td').eq(2).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Sugar Bowl':{
  state:'california',
  url:'http://www.sugarbowl.com/snowreport',
  scraper:function(errors, $){
    var newsnow = parseInt($('#bottomwrap .center').eq(6).text());
    var base = parseInt($('#bottomwrap .g1').eq(2).text().split(':')[ 1 ]);
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Kirkwood Mountain Resort':{
  state:'california',
  //url:'http://summer.kirkwood.com/site/mountain/snow-report/'+ new Date().getUTCFullYear() + '-' + (new Date().getUTCMonth() + 1) + '-' + (new Date().getUTCDate()),
  //url:'http://summer.kirkwood.com/site/mountain/snow-report/2014-1-30',
  url:'http://www.kirkwood.com/',
  scraper:function(errors, $){
    //var newsnow = parseInt( $('#snowReport tr td').eq(1).text() );
    //var base = parseInt($('#snowReport tr td').eq(14).text());
    var newsnow = parseInt($('#ctl03_ctl00_liNewSnow24').eq(0).text());
    var base = parseInt($('#ctl03_ctl00_liSnowDepthMid').eq(0).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Heavenly Ski Resort':{
  state:'california',
  url:'http://www.skiheavenly.com/the-mountain/snow-report/snow-report.aspx',
  scraper:function(errors, $){
    var newsnow = parseInt($('.snowReportDataColumn2 tr td').eq(1).text());
    var base = parseInt($('.snowReportDataColumn2 tr td').eq(11).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Mt. Rose':{
  state:'nevada',
  url:'http://www.skirose.com/on-the-mountain/snowreport',
  scraper:function(errors, $){
    var newsnow = parseInt($('.dataorange').eq(0).text());
    var base = parseInt($('.datablue').eq(1).text().split('-')[1]);
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Mammoth Mountain':{
  state:'california',
  url:'http://www.mammothmountain.com/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.snowfall').eq(1).text());
    var base = parseInt($('.base_depth').eq(1).text());
    var conditions = 'n/a'; //$('#mcSnow').eq(0).text().split('<p>')[0].split(':')[6].split(',')[0];
    console.log('mammoth', newsnow, base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Mountain High':{
  state:'california',
  url:'http://www.mthigh.com/trails-conditions/snow-report',
  scraper:function(errors, $){
    var newsnow = parseInt($('.snow-summary .value').eq(0).text());
    var base = parseInt($('.snow-summary .value').eq(4).text().split('-')[1]);
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, 'Mount Baldy':{
  state:'california',
  url:'http://www.mtbaldyskilifts.com/weather.lasso',
  scraper:function(errors, $){
    var newsnow = 0; //parseInt($('#temp td').eq(22).text()) || 0;
    var base = 0; //parseInt($('#temp td').eq(21).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, 'Mount Shasta Ski Park':{
  state:'california',
  url:'http://skipark.com/the-mountain/conditions',
  scraper:function(errors, $){
    var newsnow = 0; //parseInt($('#pagecontent-narrow .right').eq(3).text()) || 0;
    var base = parseInt($('#pagecontent-narrow .right').eq(4).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, 'Snow Summit':{
  state:'california',
  url:'http://www.snowsummit.com/ski/snow-report/current-snow-report/',
  scraper:function(errors, $){
    var newsnow = parseInt($('#content tr td').eq(20).text()) || 0;
    var base = parseInt($('#content tr td').eq(26).text()) || 0;
    var conditions = $('#content tr td').eq(24).text();;
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Northstar':{
  state:'california',
  url:'http://www.northstarcalifornia.com/',
  scraper:function(errors, $){
    var newsnow = parseInt($('#ctl03_ctl00_liNewSnow24').eq(0).text());
    var base = parseInt($('#ctl03_ctl00_liSnowDepthMid').eq(0).text()) || 15;
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base)
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Northstar at Tahoe':{
  state:'california',
  url:'http://www.northstarcalifornia.com/',
  scraper:function(errors, $){
    var newsnow = parseInt($('#ctl03_ctl00_liNewSnow24').eq(0).text());
    var base = parseInt($('#ctl03_ctl00_liSnowDepthMid').eq(0).text()) || 15;
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base)
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Sierra at Tahoe':{
  state:'california',
  url:'http://www.sierraattahoe.com/mountain/conditions',
  scraper:function(errors, $){
    var newsnow = parseInt($('#block-sierra_conditions-current-snow .summary-value .total').eq(0).text());
    var base = parseInt($('#block-sierra_conditions-current-snow table tr td').eq(12).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Soda Springs Snow Park':{
  state:'california',
  url:'http://www.skisodasprings.com/',
  scraper:function(errors, $){
    var newsnow = parseInt($('#snow_stats span').eq(2).text()) || 0;
    var base = parseInt($('#snow_stats span').eq(0).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Squaw Valley Ski Area':{
  state:'california',
  url:'http://squawalpine.com/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.snowfall .cell p').eq(1).text() );
    var base = parseInt($('.snowfall .cell p').eq(3).text() );
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, 'Dodge Ridge':{
  state:'california',
  url:'http://one.prance.com/php/iPrance/DodgeRidge/snowreport.php',
  scraper:function(errors, $){
    var newsnow = parseInt($('table tr td span').eq(14).text());
    var base = parseInt($('table tr td span').eq(10).text());
    var conditions = 'Powder';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, 'Mt. Bachelor':{
  state:'oregon',
  url:'http://www.mtbachelor.com/site/plan/info/winterconditions',
  scraper:function(errors, $){
    var newsnow = parseInt($('.snow-report-tab-conditions .key').eq(1).text());
    var base = parseInt($('.snow-report-tab-conditions .key').eq(5).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Mt. Hood Skibowl':{
  state:'oregon',
  url:'http://www.skibowl.com/conditions/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.currentConditions tr td').eq(11).text());
    var base = parseInt($('.currentConditions .info').eq(4).text().split('-')[1]);
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Mt. Hood Meadows':{
  state:'oregon',
  url:'http://www.skihood.com/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.depth').eq(1).text());
    var base = parseInt($('.depth').eq(3).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Hoodoo':{
  state:'oregon',
  url:'http://www.hoodoo.com/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.dcRow').eq(0).text().replace(/Over/, ''));
    var base = parseInt($('.dcRow').eq(1).text());
    var conditions = 'n/a';
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, 'Mt. Ashland':{
  state:'oregon',
  url:'http://www.mtashland.com/',
  scraper:function(errors, $){
    var newsnow = parseInt($('table tr td b').eq(2).text());
    var base = parseInt($('table tr td b').eq(6).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Timberline Lodge':{
  state:'oregon',
  url:'http://www.timberlinelodge.com/conditions/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.stat').eq(1).text());
    var base = parseInt($('#baseDepth').html()) || 0;
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Pajarito Mountain Ski Area':{
  state:'new_mexico',
  url:'http://www.skipajarito.com/conditions.php',
  scraper:function(errors, $){
    var newsnow = parseInt($('#row1 tr td').eq(5).text());
    var base = parseInt($('#row1 tr td').eq(15).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Angel Fire Resort':{
  state:'new_mexico',
  url:'http://www.angelfireresort.com/winter/mountain/snow-report',
  scraper:function(errors, $){
    var newsnow = $('#main p').eq(2).text().split('"')[0].replace(/Last 24 Hours:/, '');
    var base = $('#main p').eq(2).text().split('"')[3].replace(/Avg Base Depth:/, '');
    var conditions = 'n/a';
    console.log('new', newsnow)
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Red River Ski Area':{
  state:'new_mexico',
  url:'http://www.redriverskiarea.com/snow-grooming-report',
  scraper:function(errors, $){
    var newsnow = parseInt($('#region-content span').eq(0).text());
    var base = parseInt($('#region-content span').eq(4).text());
    var conditions = 'n/a';
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Sipapu Ski and Summer Resort':{
  state:'new_mexico',
  url:'http://www.sipapunm.com/',
  scraper:function(errors, $){
    var newsnow = parseInt($('#snowreportLink tr td').eq(3).text());
    var base = parseInt($('#snowreportLink tr td').eq(4).text());
    var conditions = 'n/a';
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Sandia Peak Ski Area':{
  state:'new_mexico',
  url:'http://sandiapeak.com/index.php?page=snow-report',
  scraper:function(errors, $){
    var newsnow = parseInt($('table tr td').eq(2).text().split(':').pop());
    var base = parseInt($('table tr td').eq(3).text().split(':').pop());
    var conditions = 'n/a';
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Ski Apache':{
  state:'new_mexico',
  url:'http://www.skiapache.com/the-mountain/snow-report-weather-conditions/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.snow-report strong').eq(0).text()) || 0;
    var base = parseInt($('.snow-report strong').eq(5).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Ski Santa Fe':{
  state:'new_mexico',
  url:'http://www.skisantafe.com/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.report td div').eq(1).text().replace(/24 hours:/, ''));
    var base = parseInt($('.report td div').eq(4).text().replace(/Base Depth:/, ''));
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Taos Ski Valley':{
  state:'new_mexico',
  url:'http://www.skitaos.org/weather',
  scraper:function(errors, $){
    var newsnow = parseInt($('.content li').eq(1).text());
    var base = parseInt($('.content li').eq(0).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
},'Enchanted Forest XC and Snowshoe':{
  state:'new_mexico',
  url:'http://www.skinewmexico.com/resorts/enchanted-forest/?tab=snowreport',
  scraper:function(errors, $){
    var newsnow = parseInt($('.snow td').eq(0).text());
    var base = parseInt($('.snow td').eq(2).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Steamboat": {
  state: 'colorado',
  url: 'http://m.steamboat.com/system/jsonfeed.aspx?site=steamboat&type=snow',
  scraper:function(errors, $, raw){
        var json = JSON.parse( raw );
        var newsnow = parseInt(json.snow.data.imperial.hours12) || 0;
        var base = json.snow.data.imperial.baseSnow;
        console.log('new', newsnow, 'base', base);
        //return {'new':newsnow, 'base': base, 'conditions':conditions};
    	return {'new':newsnow, 'base': base, 'conditions': 'n/a'};
  }
}, "Powderhorn": {
  state: 'colorado',
  url: 'http://www.powderhorn.com/snow-report',
  scraper:function(errors, $){
    var newsnow = parseInt($('.field-item.even').eq(2).text());
    var base = parseInt($('.field-item.even').eq(4).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base)
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Winter Park": {
  state: 'colorado',
  headers: [['User-Agent', 'freshy-request']],
  url: 'http://www.winterparkresort.com/the-mountain/snow-weather-report.aspx',
  scraper:function(errors, $, raw){
    var newsnow = parseInt($('.amount .unit').data('imperial'));
    var base = parseInt($('.data .unit').data('imperial'));
    var conditions = $('.snowMeta .data').eq(9).text();
    console.log('newsnow', newsnow, 'base', base, 'conditions', conditions);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Vail": {
  state: 'colorado',
  url: 'http://www.vail.com/mountain/current-conditions/snow-and-weather-report.aspx',
  scraper:function(errors, $){
    var newsnow = parseInt($('#snowReportData tr td').eq(1).text());
    var base = parseInt($('#snowReportData tr td').eq(11).text());
    var conditions = $('#snowReportData tr th').eq(6).text();
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Purgatory": {
  state: 'colorado',
  url: 'https://www.purgatoryresort.com/snow-report/',
  scraper:function(errors, $){
    var newsnow = parseInt($('#section-snow-report-tabs .num').eq(4).text());
    var base = parseInt($('#section-snow-report-tabs .num').eq(2).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base, 'conditions', conditions);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Telluride": {
  state: 'colorado',
  url: 'http://tellurideskiresort.com/Tellski/snow-report.aspx',
  scraper:function(errors, $){
    var newsnow = parseInt($('.snowreportConditions .value').eq(1).text());
    var base = parseInt($('.snowreportConditions .value').eq(6).text());
    var conditions = $('.snowreportConditions .value').eq(7).text();
    console.log('newsnow', newsnow, 'base', base, 'conditions', conditions);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Silverton": {
  state: 'colorado',
  url: 'http://www.silvertonmountain.com/page/mountain/snow',
  scraper:function(errors, $){
    var newsnow = parseInt($('#content tr td').eq(4).text().split(':')[2].replace(/New Snow 24 Hour/, ''));
    var base = parseInt($('#content tr td').eq(4).text().split(':')[1]);
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Wolf Creek": {
  state: 'colorado',
  url: 'http://www.wolfcreekski.com/wolf-creek-snow-report.php',
  scraper:function(errors, $){
    var newsnow = parseInt($('#innerPageSnowReport tr td').eq(3).text()) || 0;
    var base = parseInt($('#innerPageSnowReport tr td').eq(2).text());
    var conditions = 'n/a';
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Monarch": {
  state: 'colorado',
  url: 'http://www.skimonarch.com/daily-snow-report/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.sc__status-item').eq(1).text().trim().split(' ')[0]);
    var base = parseInt($('.sc__status-item').eq(4).text().trim().split(' ')[0]);
    var conditions = 'Powder';
    console.log(newsnow, base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Crested Butte": {
  state: 'colorado',
  url: 'http://www.skicb.com/the-mountain/snow-weather',
  scraper:function(errors, $, body){
    var n = parseInt($('.snowfall .value').eq(0).text());
    var b = parseInt($('.snowfall .snow-depth').eq(0).text());
    var conditions = 'n/a';
    console.log('new', n, 'base', b);
    return {'new':n, 'base':b, 'conditions':conditions};
  }
}, "Aspen Mountain": {
  state: 'colorado',
  url: 'http://snow.aspensnowmass.com/dailysnowreportembed/',
  scraper:function(errors, $, raw){
    var newsnow = parseInt($('td span').eq(25).text());
    var base = parseInt($('td span').eq(33).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Aspen Highlands": {
  state: 'colorado',
  url: 'http://snow.aspensnowmass.com/dailysnowreportembed/',
  scraper:function(errors, $){
    var newsnow = parseInt($('td span').eq(49).text());
    var base = parseInt($('td span').eq(57).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Buttermilk": {
  state: 'colorado',
  url: 'http://snow.aspensnowmass.com/dailysnowreportembed/',
  scraper:function(errors, $, raw){
    var newsnow = parseInt($('td span').eq(73).text());
    var base = parseInt($('td span').eq(81).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Snowmass": {
  state: 'colorado',
  url: 'http://snow.aspensnowmass.com/dailysnowreportembed/',
  scraper:function(errors, $){
    var newsnow = parseInt($('td span').eq(1).text());
    var base = parseInt($('td span').eq(9).text());
    var conditions = $('.sec-wrapper p span').eq(3).text();
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Ski Cooper": {
  state: 'colorado',
  url: 'http://skicooper.com/resort/mountain-info/snow-lift-trail-grooming-report/',
  scraper:function(errors, $){
    var newsnow = parseInt($('.wpb_wrapper tr td').eq(4).text());
    var base = parseInt($('.wpb_wrapper tr td').eq(3).text());
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Beaver Creek": {
  state: 'colorado',
  url: 'http://www.beavercreek.com/the-mountain/snow-report.aspx',
  scraper:function(errors, $){
    var newsnow = parseInt($('#snowReportData tr td').eq(1).text());
    var base = parseInt($('#snowReportData tr td').eq(11).text());
    var conditions = 0;
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Breckenridge": {
  state: 'colorado',
  url: 'http://www.snocountry.com/en/resort-page/co/breckenridge',
  //url: 'http://www.breckenridge.com/mountain/snow-and-weather-report.aspx',
  scraper:function(errors, $){
    //var newsnow = parseInt($('#snowReportData tr td').eq(0).text());
    //var base = parseInt($('#snowReportData tr td').eq(4).text());
    var newsnow = parseInt($('li span strong').eq(0).text());
    var base = parseInt($('.stat span').eq(2).text());
    var conditions = 'n/a'; //$('#snowReportData tr th').eq(6).text();
    console.log('Breckenridge', newsnow, base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Copper Mountain": {
  state: 'colorado',
  url: 'http://www.coppercolorado.com/winter/the_mountain/dom/snow.html',
  scraper:function(errors, $){
    var newsnow = parseInt($('#content tr td').eq(31).text());
    var base = parseInt($('#content tr td').eq(42).text());
    var conditions = $('#content tr td').eq(7).text();
    console.log('newsnow', newsnow, 'base', base, 'conditions', conditions);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Eldora": {
  state: 'colorado',
  url: 'http://www.eldora.com/mountain.snow.php',
  scraper:function(errors, $){
    var newsnow = parseInt($('#bodyCopy').eq(0).text().split('<br>')[0].split('New')[1].replace(/snow in the last 24 hours:/, ''));
    var base = parseInt($('#bodyCopy').eq(0).text().split('<br>')[0].split('Base')[1].split('inch')[0].replace(/:/, ''));
    var conditions = 'n/a';
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Keystone": {
  state: 'colorado',
  url: 'http://www.keystoneresort.com/ski-and-snowboard/snow-report.aspx',
  scraper:function(errors, $){
    var newsnow = parseInt($('#snowReportData tr td').eq(1).text());
    var base = 30; //parseInt($('#snowReportData tr td').eq(11).text());
    var conditions = $('#snowReportData tr th').eq(6).text();
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Arapahoe Basin": {
  state: 'colorado',
  url: 'http://www.arapahoebasin.com/abasin/snow-conditions/default.aspx',
  scraper:function(errors, $){
    var newsnow = parseInt($('#banner-snow-conditions dl dd').eq(0).text());
    var base = parseInt($('#banner-snow-conditions dl dd').eq(2).text());
    var conditions = $('#banner-snow-conditions dl dd').eq(3).text();
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Loveland": {
  state: 'colorado',
  url: 'http://skiloveland.com/snow-report/',
  scraper:function(errors, $){
    var newsnow = parseInt($('table tr td').eq(1).text());
    var base = parseInt($('table tr td').eq(22).text());
    var conditions = 'n/a';
    console.log('newsnow', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, 'Arizona Snowbowl':{
  state:'arizona',
  url:'http://www.arizonasnowbowl.com/resort/snow_report.php',
  scraper:function(errors, $){
    var newsnow = parseInt($('#container tr td').eq(5).text());
    var base = parseInt($('#container tr td').eq(9).text());
    var conditions = "n/a";
    console.log('new', newsnow, 'base', base);
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, 'Sunrise Ski Park':{
  state:'arizona',
  url:'http://sunriseskiparkaz.com/winter/daily-ski-report',
  scraper:function(errors, $){
    var newsnow = parseInt($('#contentMiddle tr td').eq(5).text());
    var base = parseInt($('#contentMiddle tr td').eq(3).text());
    var conditions = $('#contentMiddle tr td').eq(21).text().split(',')[0];
    return {'new':newsnow, 'base':base, 'conditions':conditions};
  }
}, "Killington": {
    state: 'vermont',
    url: 'http://www.killington.com/winter/mountain/conditions',
    scraper:function(errors, $){
      var newsnow = parseInt($('#snow_report_stats tr td').eq(5).text());
      var base = parseInt($('#snow_report_stats tr td').eq(8).text());
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':parseInt(newsnow), 'base': parseInt(base), 'conditions':conditions};
    }
}, "Bolton Valley": {
    state: 'vermont',
    url: 'http://www.boltonvalley.com/the-mountain/snow-report-and-maps',
    scraper:function(errors, $){
      var newsnow = parseInt($('#snowConditions tr td').eq(1).text().split(':')[1]);
      var base = parseInt($('#snowConditions tr td').eq(1).text().split(':')[5].split('-')[1]);
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':parseInt(newsnow), 'base': parseInt(base), 'conditions':conditions};
    }
}, "Pico Mountain": {
    state: 'vermont',
    url: 'http://www.picomountain.com/winter/the_mountain/conditions/@@snowreport-detailed.html',
    scraper:function(errors, $){
      var newsnow = parseInt($('#snow_report-page tr td').eq(1).text());
      var base = parseInt($('#snow_report-page tr td').eq(2).text().split('-')[1]);
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':parseInt(newsnow), 'base': parseInt(base), 'conditions':conditions};
    }
}, "Burke Mountain": {
    state: 'vermont',
    url: 'http://www.skiburke.com/the-mountain/winter/snow-report/',
    scraper:function(errors, $){
      var newsnow = parseInt( $('#mainContent tr td').eq(1).text() );
      var base = parseInt( $('#mainContent tr td').eq(9).text().split('-')[1]);
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':parseInt(newsnow), 'base': parseInt(base), 'conditions':conditions};
    }
}, "Mount Snow": {
    state: 'vermont',
    url: 'http://mountsnow.com/snow-report/',
    scraper:function(errors, $){
      var newsnow = parseInt($('.status-snow .value').eq(0).text());
      var base = parseInt($('.status-snow .value').eq(3).text());
      var conditions = 'n/a'; //$('#container tr td').eq(3).text().split(':')[5].split('/').pop();
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Magic Mountain Ski Area": {
    state: 'vermont',
    url: 'http://www.magicmtn.com/snowreport.php',
    scraper:function(errors, $){
      var newsnow = parseInt($('#main-content tr td').eq(52).text());
      var base = parseInt($('#main-content tr td').eq(22).text().split(":")[2]);
      var conditions = $('#main-content tr td').eq(16).text().replace(/Surface/, '').replace(/Conditions:/, '') || 10;
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Jay Peak": {
    state: 'vermont',
    url: 'http://www.jaypeakresort.com/',
    scraper:function(errors, $){
      var newsnow = parseInt($('#snow_report_content .weather_us').eq(0).text());
      var base = parseInt($('#snow_report_content .weather_us').eq(3).text().split('-').pop());
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  }, "Stratton Mountain": {
    state: 'vermont',
    headers: [['User-Agent', 'freshy-request']],
    url: 'http://www.stratton.com/the-mountain/snow-and-conditions-report.aspx',
    scraper:function(errors, $, raw){
      var newsnow = parseInt($('.amountNumber .data').eq(0)[0].data.imperial);
      var base = parseInt($('.amountNumber .data').eq(2)[0].data.imperial) || 0;
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Smugglers Notch": {
    state: 'vermont',
    url: 'http://www.smuggs.com/pages/winter/snowReport/',
    scraper:function(errors, $){
      var newsnow = parseInt($('#trail-summary p').eq(3).text().split(':')[1]);
      var base = parseInt($('#base-summary p').eq(1).text().split(':')[1].split('-')[1]);
      var conditions = 0; //$('#snow-summary p').eq(1).text().split(':')[1];
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Okemo Mountain Resort": {
    state: 'vermont',
    url: 'http://www.okemo.com/activities/snowsports/dailyreport.asp',
    scraper:function(errors, $){
      var newsnow = parseInt($('.snow-report .value').eq(4).text());
      var base = parseInt($('.snow-report .value').eq(6).text());
      var conditions = $('.snow-report .value').eq(7).text();;
      console.log('newsnow', newsnow, 'base', base, 'conditions', conditions);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Lost Trail": {
    state: 'idaho',
    url: 'http://www.losttrail.com/weather-snow/',
    scraper:function(errors, $){
      var newsnow = parseInt($('#insidepagecontent tr td').eq(9).text());
      var base = parseInt($('#insidepagecontent tr td').eq(10).text());
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },'Kelly Canyon': {
    state: 'idaho',
    url: 'http://idahoskiconditions.com/iframe/kellycanyon/',
    scraper:function(errors, $){
      var newsnow = parseInt($('p').eq(0).text()) || 0;
      var base = parseInt($('p').eq(11).text()) || 0;
      var conditions = 'n/a'; //$('p').eq(8).text();
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },'Pebble Creek': {
    state: 'idaho',
    url: 'http://idahoskiconditions.com/iframe/pebblecreek/',
    scraper:function(errors, $){
      var newsnow = 0; //parseInt($('p').eq(0).text()) || 0;
      var base = parseInt($('p').eq(10).text()) || 0;
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  }, 'Lookout Pass':{
    state:'Idaho',
    url:'https://skilookout.com/snow-report',
    scraper:function(errors, $){
      var newsnow = parseInt($('.sr_conditions_con p').eq(3).text());
      var base = parseInt($('.sr_conditions_con p').eq(15).text());
      var conditions = $('#content_row div').eq(62).text();
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },"Mountain Creek": {
    state: 'New Jersey',
    url: 'http://www.mountaincreek.com/mountain/mountain-report/',
    scraper:function(errors, $){
      var newsnow = 0; //$('#sr-stats li').eq(11).text();
      var base = parseInt($('#sr-stats li').eq(12).text().replace(/Base Depth/, ''));
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },"Mohawk Mountain": {
    state: 'Connecticut',
    url: 'http://www.mohawkmtn.com/conditions.html',
    scraper:function(errors, $){
      var newsnow = 0; //parseInt($('.snow_report_table th').eq(3).text().split(":")[2]);
      var base = 0; //parseInt($('.snow_report_table td').eq(0).text().split(':')[1].split('-')[1]);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },"Ski Sundown": {
    state: 'Connecticut',
    url: 'http://skisundown.com/The-Mountain/Mountain-Information/Conditions-Report',
    scraper:function(errors, $){
      var newsnow = parseInt($('.telerik-reTableOddCol-1').eq(4).text()) || 0;
      var base = parseInt($('.telerik-reTableOddCol-1').eq(3).text());
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },"Butternut": {
    state: 'Massachusetts',
    url: 'http://www.skibutternut.com/mountain/snow-report-conditions/',
    scraper:function(errors, $){
      var newsnow = parseInt($('.snowReport .value').eq(0).text()); //<--- 72 hour totals
      var base = parseInt($('.snowReport .value').eq(2).text());
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },"Nashoba Valley": {
    state: 'Massachusetts',
    url: 'http://www.skinashoba.com/resort/conditions/snow-report.html',
    scraper:function(errors, $){
      var newsnow = parseInt($('.content tr td').eq(7).text());
      var base = parseInt($('.content tr td').eq(4).text());
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },"Wachusett": {
    state: 'Massachusetts',
    url: 'http://www.wachusett.com/TheMountain/AboutWachusett/SnowReport/tabid/456/Default.aspx',
    scraper:function(errors, $){
      //request('http://www.wachusett.com/TheMountain/AboutWachusett/SnowReport/tabid/456/Default.   aspx', function(res){
        //console.log($._root.children[3].children[3].children[1])
        //console.log($().find('.container'))
        var newsnow = 0; //parseInt($('.amount').eq(6).text());
        var base = 0; //parseInt($('.amount').eq(5).text());
        var conditions = 'n/a';
        console.log('newsnow', newsnow, 'base', base);
        return {'new':newsnow, 'base': base, 'conditions':conditions};
      //});
    }
  },"Jiminy Peak": {
    state: 'Massachusetts',
    url: 'http://www.jiminypeak.com/snow-report',
    scraper:function(errors, $){
      var newsnow = parseInt($('.snow-rpt-details').eq(3).text());
      var base = parseInt($('.snow-rpt-details').eq(1).text());
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },"Blue Hills": {
    state: 'Massachusetts',
    url: 'http://www.ski-bluehills.com/reports-and-conditions',
    scraper:function(errors, $){
      var newsnow = parseInt($('.article-content tr td').eq(8).text());
      var base = parseInt($('.article-content tr td').eq(2).text());
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },"Hunter Mountain": {
    state: 'New York',
    url: 'http://www.huntermtn.com/snow-report.aspx',
    scraper:function(errors, $){
      var newsnow = 0;
      var base = parseInt($('.basedepth em').eq(0).text());
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },"Windham": {
    state: 'New York',
    url: 'http://www.windhammountain.com/the-mountain/mountain-report/',
    scraper:function(errors, $){
      var newsnow = 0; //parseInt($('.report-details p').eq(0).text().split(':')[3].split('-')[0]) || 0;
      var base = parseInt($('.report-details p').eq(0).text().split(':')[1].split('-')[0]);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },"Belleayre": {
    state: 'New York',
    url: 'http://www.belleayre.com/winter/conditions.htm',
    scraper:function(errors, $){
      var newsnow = parseInt($('table div').eq(20).text());
      var base = parseInt($('table td').eq(117).text());
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },"Peek n Peak Resort": {
    state: 'New York',
    url: 'http://www.pknpk.com/sports/conditions/',
    scraper:function(errors, $){
      var newsnow = parseInt($('.stat').eq(9).text().split('-')[1]);
      var base = parseInt($('.stat').eq(0).text().replace(/Base Depth/, '').split('-')[1]);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },"Gore Mountain": {
    state: 'New York',
    url: 'http://www.goremountain.com/mountain/snow-report',
    scraper:function(errors, $){
      var newsnow = 0; //parseInt($('.alpineConditionsRightRow').eq(3).text().split(':')[1]);
      var base = parseInt( $('.alpineConditionsRightRow').eq(0).text().split(':')[1].split('-')[1] );
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  }, "Holiday Valley": {
    state: 'New York',
    url: 'http://www.holidayvalley.com/explore-our-mountain/ski-amp-ride-snow-reports#.UL6mnNPjm9Q',
    scraper:function(errors, $){
      var newsnow = parseInt($('#reportSummaryWrapper span').eq(22).text().replace(/Snow Fall-Past 24 Hours:/, '')) || 0;
      var base = parseInt($('#reportSummaryWrapper span').eq(20).text());
      var conditions = 'n/a';
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  }, "HoliMont Ski Resort" : {
    state: 'New York',
    url: 'http://www.holimont.com/trails-and-lifts/slope-report/',
    scraper:function(errors, $){
      var newsnow = parseInt($('#content-back tr td p').eq(1).text()) || 0;
      var base = parseInt($('#content-back tr td').eq(7).text()) || 0;
      var conditions = 'n/a';
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  }, 'Whiteface Mountain':{
    state:'new york',
    url:'http://www.whiteface.com/mountain/conditions',
    scraper:function(errors, $){
      var newsnow = parseInt( $('.daily-conditions-summary-container span').eq(5).text() );
      var base = parseInt($('.daily-conditions-summary-container span').eq(18).text()) || 0;
      var conditions = $('.daily-conditions-summary-container span').eq(2).text();
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Cannon Mountain':{
    state:'new hampshire',
    url:'http://www.cannonmt.com/snowreport.html',
    scraper:function(errors, $){
      var newsnow = parseInt($('.secondary-content tr td').eq(1).text().replace(/Snow Received Past 24 Hours:/, '')) || 0;
      var base = parseInt($('.secondary-content tr td').eq(4).text().replace(/Base Depth:/, '')) || 0;
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },'Loon Mountain':{
    state:'new hampshire',
    url:'http://www.loonmtn.com/winter/conditions.aspx',
    scraper:function(errors, $){
      var newsnow = parseInt($('.snow-report-details li span').eq(7).text());
      var base = parseInt($('.snow-report-details li span').eq(4).text().split('-').pop());
      var conditions = $('.snow-report-details li span').eq(14).text();
      console.log('newsnow', newsnow, 'base', base, 'conditions', conditions);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Bretton Woods':{
    state:'new hampshire',
    url:'http://brettonwoods.com/mobile/alpine_report',
    scraper:function(errors, $){
      var newsnow = 0; //parseInt($('#report-second').eq(0).text().split(":")[1]);
      var base = parseInt($('#report-second').eq(0).text().split(":")[3].split("-")[1]);
      var conditions = $('.contentContainer p').eq(8).text().split(':')[4];
      console.log('newsnow', newsnow, 'base', base, 'con', conditions);
      console.log('SET TO ZERO FOR NOW');
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Gunstock": {
    state: 'New Hampshire',
    url: 'http://www.gunstock.com/winter/conditions/',
    scraper:function(errors, $){
      var newsnow = parseInt($('.report-wrapper .col-xs-4').eq(1).text().replace(/New Snow \(24 Hrs\)/g, ''));
      var base = parseInt($('.report-wrapper .col-xs-4').eq(0).text().replace(/Base Depth/g, ''));
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  }, "Waterville Valley": {
    state: 'New Hampshire',
    url: 'http://www.waterville.com/ski-ride/snow-report.html',
    scraper:function(errors, $){
      var newsnow = 0; //parseInt($('table li').eq(0).text().split('"')[0]);
      var base = parseInt($('#content tr td').eq(6).text().split('-').pop());
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base)
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },
   "Attitash": {
    state: 'New Hampshire',
    url: 'http://www.attitash.com/snow-report.html',
    scraper:function(errors, $){
      var newsnow = parseInt( $('table td').eq(3).text().split(':')[1] ) || 0;
      var base = parseInt($('table td').eq(5).text().split(':')[1]);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  }, 'Wildcat Mountain':{
    state:'new hampshire',
    url:'http://www.skiwildcat.com/snow-report.html',
    scraper:function(errors, $){
      var newsnow = parseInt($('.main tr td').eq(3).text().replace(/24 Hour Snowfall:/, '')) || 0;
      var base = parseInt($('.main tr td').eq(10).text().replace(/Base:/, ''));
      var conditions = $('.main tr td').eq(11).text().replace(/Surface:/, '');
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Stowe": {
    state: 'vermont',
    url: 'http://www.stowe.com/ski-ride/conditions/?printReport=1',
    scraper:function(errors, $){
      var newsnow = parseInt( $('.stat').eq(3).text() );
      var base = parseInt( $('.baseText').eq(0).text().split(':')[1].split('-')[1]);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  },
  'Sugarbush': {
    state: 'vermont',
    url: 'http://www.sugarbush.com/snow-trails-conditions/live-mountain-update',
    scraper:function(errors, $){
      var newsnow = parseInt($('#contentRight tr td').eq(18).text().split(':')[1]);
      var base = parseInt($('#contentRight tr td').eq(19).text().split(':')[1]);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base': base, 'conditions':conditions};
    }
  }, 'Mad River Glen':{
    state:'vermont',
    url:'http://www.madriverglen.com/skiing/conditions/',
    scraper:function(errors, $){
      var newsnow = parseInt($('.banner-conditions-content li').eq(2).text().split(':')[1]);
      var base = parseInt($('td').eq(13).find('div').eq(3).text().replace('Snowfall to Date:','').split('-')[0]);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Sunday River':{
    state:'maine',
    url:'http://www.sundayriver.com/TheMountain/MountainReport/index.asp',
    scraper:function(errors, $){
      var newsnow = parseInt($('.snowreportstats li').eq(8).text());
      var base = parseInt($('.snowreportstats li').eq(7).text());
      var conditions = $('.snowreport-table td').eq(0).text().split(':').pop();
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Saddleback Mountain':{
    state:'maine',
    url:'http://www.saddlebackmaine.com/conditions',
    scraper:function(errors, $){
      var newsnow = parseInt( $('#snow-report-full tr td').eq(2).text() );
      var base = parseInt($('#snow-report-full tr td').eq(7).text().split('-')[1]);
      var conditions = 'n/a'
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Sugarloaf':{
    state:'maine',
    url:'http://www.sugarloaf.com/the-mountain/daily-report',
    scraper:function(errors, $){
      var newsnow = parseInt( $('.snow span').eq(0).text() );
      var base = parseInt( $('.snow span').eq(1).text() );
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Mt. Abram': {
    state:'maine',
    url:'http://www.mtabram.com/trails-status-page/',
    scraper:function(errors, $){
      var newsnow = parseInt($('#left_col tr td').eq(9).text());
      var base = parseInt($('#left_col tr td').eq(5).text());
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Black Mountain Ski Resort': {
    state:'maine',
    url:'http://www.blackmt.com/black-mt-snow-report/',
    scraper:function(errors, $){
      var newsnow = parseInt($('#conditions tr td').eq(11).text()) || 0;
      var base = parseInt($('#conditions tr td').eq(15).text()) || 0;
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },'Shawnee Peak': {
    state:'maine',
    url:'http://www.shawneepeak.com/mountain/ski-report/',
    scraper:function(errors, $){
      var newsnow = parseInt($('.conditions li strong').eq(7).text());
      var base = parseInt($('.conditions li strong').eq(6).text().split('-')[1]);
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },'Saddleback': {
    state:'maine',
    url:'http://www.saddlebackmaine.com/conditions',
    scraper:function(errors, $){
      var newsnow = $('table').eq(0).text();
      var base = $('#main_wrapper tr td').eq(0).text();
      var conditions = 'n/a';
      console.log('CANT SCRAPE SADLEABA!')
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },'Bigrock Mountain': {
    state:'maine',
    url:'http://www.bigrockmaine.com/the-mountain.html',
    scraper:function(errors, $){
      var newsnow = parseInt($('#snow-report div').eq(2).text().split(':')[1]);
      var base = parseInt( $('#snow-report div').eq(3).text().split(':')[1].split('to')[1] );
      var conditions = 'n/a';
      console.log('snow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Marquette Mountain':{
    state:'michigan',
    url:'http://www.marquettemountain.com/snowreport.php',
    scraper:function(errors, $){
      var newsnow = 0; //parseInt($('.maintext').eq(13).text());
      var base = parseInt($('.maintext').eq(12).text());
      var conditions = $('table tr td').eq(58).text();
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Mount Bohemia':{
    state:'michigan',
    url:'http://www.mtbohemia.com/',
    scraper:function(errors, $){
      var newsnow = 0; //parseInt($('.userContent').eq(0).text().split(':')[1]);
      var base = parseInt($('.userContent').eq(0).text().split(':')[2]);
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Indianhead Mountain Resort':{
    state:'michigan',
    url:'http://www.indianheadmtn.com/snow_report.php',
    scraper:function(errors, $){
      var newsnow = parseInt($('#snow_report tr td').eq(3).text());
      var base = parseInt($('#snow_report tr td').eq(2).text());
      var conditions = 'n/a';
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Ski Brule':{
    state:'michigan',
    url:'http://skibrule.com/brule-mountain/snow-conditions-hours/',
    scraper:function(errors, $){
      var newsnow = 0;//parseInt($('h3').eq(2).text().split(':')[1]);
      var base = parseInt($('h3').eq(2).text().split(':')[3]);
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Boyne Highlands Resort':{
    state:'michigan',
    url:'http://www.boyne.com/Winter/Two_Mountains/Current_Conditions/boyneHighlands.html',
    scraper:function(errors, $){
      var newsnow = parseInt(0) //parseInt($('.conditionsTable tr td').eq(1).text()) || 0;
      var base = parseInt($('.depth strong').eq(0).text());
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Nubs Nob Ski Resort':{
    state:'michigan',
    url:'http://www.nubsnob.com/index.php?option=com_content&view=article&id=95&Itemid=87',
    scraper:function(errors, $){
      var newsnow = parseInt($('#ja-mainbody tr td').eq(7).text().replace(/New snow:/, '').replace(/and still snowing/, '')) || 0;
      var base = parseInt($('#ja-mainbody tr td').eq(4).text().replace(/Base Depth:/, '').replace(/up to/g, ''));
      var conditions = $('#ja-mainbody tr td').eq(5).text().replace(/Snow Surface:/, '');
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Caberfae Peaks Ski':{
    state:'michigan',
    url:'http://caberfaepeaks.com/the-mountain/snow-report/',
    scraper:function(errors, $){
      var newsnow = parseInt($('#tablepress-1 tr td').eq(1).text());
      var base = parseInt($('#tablepress-1 tr td').eq(11).text().replace(/Up to/, ''));
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Schuss Mountain':{
    state:'michigan',
    url:'http://www.shantycreek.com/',
    scraper:function(errors, $){
      var newsnow = 0; //parseInt($('.accumulation p').eq(0).text());
      var base = parseInt($('.accumulation p').eq(2).text());
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Liberty Mountain Resort':{
    state:'pennsylvania',
    url:'http://www.libertymountainresort.com/mountain/mountain-information/snow-and-grooming-report.aspx',
    scraper:function(errors, $){
      var newsnow = parseInt($('#snowSummaryContainer div').eq(25).text()) || 0;
      var base = parseInt($('#snowSummaryContainer div').eq(12).text());
      var conditions = $('#snowSummaryContainer div').eq(9).text();
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Roundtop Mountain':{
    state:'pennsylvania',
    url:'http://www.skiroundtop.com/weather-conditions',
    scraper:function(errors, $){
      try {
        var newsnow = parseInt($('#sidebar_left tr td').eq(9).text()) || 0;
      } catch( e ){
        var newsnow = 0;
      }
      var base = parseInt($('#sidebar_left tr td').eq(11).text());
      var conditions = $('#sidebar_left tr td').eq(13).text();
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Blue Mountain':{
    state:'pennsylvania',
    url:'http://www.skicentral.com/pennsylvania-skireport.html',
    scraper:function(errors, $){
      var newsnow = parseInt($('.rptline').eq(21).text()) || 0;
      var base = parseInt($('.rptline').eq(22).text().split('-')[1]);
      var conditions = $('#snowSummaryContainer div').eq(9).text();
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Camelback':{
    state:'pennsylvania',
    url:'http://www.skicamelback.com/skiing-in-the-poconos.aspx',
    scraper:function(errors, $){
      var newsnow = 0; //parseInt($('#tdbdepth').eq(0).text());
      var base = parseInt($('#tdbdepth').eq(0).text());
      var conditions = $('#tdsurface').eq(0).text();
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Whitetail':{
    state:'pennsylvania',
    url:'http://www.skiwhitetail.com/winter',
    scraper:function(errors, $){
      var newsnow = parseInt($('#cond_snow tr td').eq(0).text().replace(/Fresh Natural/, '')) || 0;
      var base = parseInt($('#cond_snow tr td').eq(2).text().replace(/Average Base/, ''));
      var conditions = $('#cond_snow tr td').eq(3).text().replace(/Surface Conditions/, '');
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Wisp':{
    state:'maryland',
    url:'http://www.wispresort.com/wisp-snow-report.php',
    scraper:function(errors, $){
      var newsnow = parseInt($('#extraContent tr td').eq(9).text());
      var base = parseInt($('#extraContent tr td').eq(5).text().split('-')[1]);
      var conditions = $('.reportTable tr td').eq(1).text();
      console.log('newnsow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Blue Knob':{
    state:'pennsylvania',
    url:'http://www.blueknob.com/trails.php',
    scraper:function(errors, $){
      var newsnow = parseInt($('#content table tr td').eq(13).text());
      var base = parseInt($('#content table tr td').eq(11).text().split('-')[1]);
      var conditions = $('.content tr td').eq(9).text();
      console.log('newnsow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Seven Springs Mountain Resort':{
    state:'pennsylvania',
    url:'http://www.7springs.com/snow-report/',
    scraper:function(errors, $){
      var newsnow = parseInt($('.snow_wrap p').eq(0).text());
      var base = parseInt($('.snow_wrap p').eq(4).text());
      var conditions = 'n/a';
      console.log('newnsow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Canaan Valley':{
    state:'west virginia',
    url:'http://canaanresort.com/winter/ski/5-2/snow-trails-report/',
    scraper:function(errors, $){
      var newsnow = parseInt($('table tr td').eq(19).text().split(":")[1]) || 0;
      var base = parseInt($('p').eq(1).text().split(":")[1]);
      var conditions = 'n/a';
      console.log('newnsow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Timberline Resort':{
    state:'west virginia',
    url:'http://www.timberlineresort.com/snowreport.asp',
    scraper:function(errors, $){
      var newsnow = parseInt($('table tr div').eq(7).text());
      var base = parseInt($('table tr div').eq(3).text());
      var conditions = 'n/a';
      console.log('newnsow', newsnow, 'base', base);
      console.log('cant! find snow data for TIMBELRINE look again')
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Bryce Resort':{
    state:'virginia',
    url:'http://www.bryceresort.com/Winter/Snow-Report.aspx',
    scraper:function(errors, $){
      var newsnow = 2; //parseInt($('.content tr td').eq(24).text()); //<-- 48 hour
      var base = parseInt($('.content tr td').eq(20).text());
      var conditions = 'n/a';
      console.log('newnsow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Wintergreen':{
    state:'virginia',
    url:'http://www.wintergreenresort.com/Slope-Report/',
    scraper:function(errors, $){
      var newsnow = 0;
      var base = parseInt($('.slope-special').eq(0).text().split(":")[3]);
      var conditions = 'n/a';
      console.log('newnsow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Massanutten Resort':{
    state:'virginia',
    url:'http://www.massresort.com/v.php?pg=46',
    scraper:function(errors, $){
      var newsnow = parseInt($('.content tr td').eq(47).text()) || 0;
      var base = parseInt($('.content tr td').eq(43).text());
      var conditions = 'n/a';
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Alyeska Resort':{
    state:'alaska',
    url:'http://www.alyeskaresort.com/snow-report.aspx',
    scraper:function(errors, $){
      var newsnow = parseInt($('#snowreport tr td').eq(22).text());
      var base = parseInt($('#snowreport tr td').eq(23).text());
      var conditions = 'n/a';
      console.log('newnsow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },

  /*
   * CANADA
   *
   */
  "Fernie": {
    state: 'British Columbia',
    url: 'http://www.skifernie.com/conditions/snow-report.aspx',
    scraper:function(errors, $){
      var newsnow = Math.round(parseInt($('.big').eq(1).text()) * 0.39 );
      var base =  parseInt($('.snow').eq(16).text());
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Whistler Blackcomb": {
    state: 'British Columbia',
    url: 'http://www.whistlerblackcomb.com/local/xml/tom.xml',
    scraper:function(errors, $){
      var newsnow = Math.round( parseFloat($('Snow').find('Last24Hours')[0].children[0].data) * 0.39);
      var base =  Math.round( parseFloat( $('Snow').find('Base')[0].next.data ) * 0.39);
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "APEX Mountain Resort": {
    state: 'British Columbia',
    url: 'http://www.apexresort.com/snow-report/',
    scraper:function(errors, $){
      var newsnow = Math.round(parseInt($('.wrapper-snow-report tr td').eq(9).text()) * 0.39);
      var base = Math.round(parseInt($('.wrapper-snow-report tr td').eq(7).text()) * 0.39);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Whitewater Ski Resort": {
    state: 'British Columbia',
    url: 'http://www.skiwhitewater.com/whitewater_snow_report.php',
    scraper:function(errors, $){
      var newsnow = parseInt($('#content tr td').eq(7).text().split('/').pop());
      var base = parseInt($('#content p').eq(9).text().split("/")[1]);
      var conditions = 'n/a'; //$('#content p').eq(12).text();
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Blue Mtn Resort": {
    state: 'Ontario',
    url: 'http://www.bluemountain.ca/conditions_snow_report.htm',
    scraper:function(errors, $){
      var newsnow = Math.round(parseInt($('#quickreport tr td').eq(11).text()) * 0.39);
      var base = Math.round(parseInt($('#quickreport tr td').eq(7).text()) * 0.39);
      var conditions = $('#quickreport tr td').eq(9).text();
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Red Mountain Resort": {
    state: 'British Columbia',
    url: 'http://www.redresort.com/mountain/report/',
    scraper:function(errors, $){
      var newsnow = parseInt($('#contentContainer tr td').eq(33).text().split('/').pop());
      var base = Math.floor(parseInt($('#snow-update td').eq(1)[0].children[0].data.replace('cm','').split(':')[1])/2.54)//parseInt($('#contentContainer tr td').eq(29).text().split('/').pop());
      var conditions = 'n/a';
      console.log('newnsow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Revelstoke Mountain':{
    state:'British Columbia',
    url:'http://www.revelstokemountainresort.com/conditions/snow-report',
    scraper:function(errors, $){
      var newsnow = Math.round(parseInt($('.snow-report small').eq(6).text()));
      var base = Math.round(parseInt($('.snow-report small').eq(3).text()));
      var conditions = 'n/a';
      console.log('newnsow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Kicking Horse Resort':{
    state:'British Columbia',
    url:'http://kickinghorseresort.com/winter-main/the-mountain/conditions/',
    scraper:function(errors, $){
      var newsnow = Math.round(parseInt($('#boxContentCol tr td').eq(3).text()) * 0.39) || 0;
      var base = Math.round(parseInt($('#boxContentCol tr td').eq(11).text()) * 0.39);
      var conditions = 'n/a';
      console.log('newnsow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Lake Louise':{
    state:'Alberta',
    url:'http://www.skilouise.com/conditions/snow-report.php',
    scraper:function(errors, $){
      var newsnow = Math.round(parseInt($('.midMountain tr td').eq(1).text()) * 0.39) || 0;
      var base = Math.round(parseInt($('.midMountain tr td').eq(7).text()) * 0.39);
      var conditions = 'n/a';
      console.log('newnsow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Marmot Basin':{
    state:'Alberta',
    url:'http://www.skimarmot.com/mountain-report',
    scraper:function(errors, $){
      var newsnow = Math.round(parseInt($('#block-views-mountain-report-snow tr td').eq(0).text()) * 0.39);
      var base = Math.round(parseInt($('#block-views-mountain-report-snow tr td').eq(2).text()) * 0.39);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Castle Mountain':{
    state:'Alberta',
    url:'http://www.skicastle.ca/snowreport.cfm',
    scraper:function(errors, $){
      var newsnow = Math.round(parseInt($('table tr td').eq(23).text()) * 0.39);
      var base = Math.round(parseInt($('table tr td').eq(29).text()) * 0.39);
      var conditions = 'n/a';
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Sunshine':{
    state:'Alberta',
    url:'http://www.skibanff.com/conditions/',
    scraper:function(errors, $){
      var newsnow = Math.round( parseFloat( $('#mainContentDiv tbody tr td').eq(0).text() ) * 0.39 );
      var base = Math.round( parseFloat( $('#mainContentDiv tbody tr td').eq(3).text() ) * 0.39);
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Sun Peaks": {
    state: 'britsh columbia',
    url: 'http://www.sunpeaksresort.com/weather-and-cams/conditions',
    scraper:function(errors, $){
      var newsnow = parseInt( $('.price-grid-weather').eq(3).text().split('/')[ 1 ] );
      var base = parseInt( $('.price-grid-weather').eq(5).text().split('/')[ 1 ] );
      var conditions = 'n/a';
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Silver Star": {
    state: 'britsh columbia',
    url: 'http://winter.skisilverstar.com/my-mountain-info/mountain-conditions/snow-report',
    scraper:function(errors, $){
      var newsnow = Math.round( parseFloat( $('.snow-report-section .value').eq(1).text() ) * 0.39 );
      var base = Math.round( parseFloat( $('.snow-report-section .value').eq(3).text() ) * 0.39 );
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, "Big White": {
    state: 'britsh columbia',
    url: 'http://www.bigwhite.com/mountain-info/mountain-reports/daily-snow-report/',
    scraper:function(errors, $){
      var newsnow = parseInt($('#snow-report tr td').eq(8).text());
      var base = parseInt($('#snow-report tr td').eq(14).text());
      var conditions = $('#snow-report tr td').eq(25).text().split('&')[0];
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Mont Tremblant':{
    state:'quebec',
    url:'http://tremblantmedias.com/conditions/conditions-e.php',
    scraper:function(errors, $){
      var newsnow = parseInt($('table tr td').eq(11).text().split('(').pop().replace(/inches/, ''));
      var base = parseInt($('table tr td').eq(13).text().split('(').pop().replace(/inches/, ''));
      var conditions = $('table tr td').eq(3).text();
      console.log('new', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Kimberley Alpine Resort':{
    state:'british columbia',
    url:'http://www.skikimberley.com/conditions/snow-report.aspx',
    scraper:function(errors, $){
      var newsnow = parseInt($('table tr td span').eq(25).text());
      var base = parseInt($('table tr td span').eq(27).text());
      var conditions = 'n/a'; //$('table tr td span').eq(37).text();
      console.log('newnsow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Le Massif':{
    state:'quebec',
    url:'http://mountain.lemassif.com/weather-and-snow/',
    scraper:function(errors, $){
      var newsnow = Math.round(parseInt($('.right-content').eq(0).text()) * 0.39);
      var base = Math.round(parseInt($('.right-content').eq(3).text()) * 0.39);
      var conditions = 'n/a';
      console.log('newnsow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }, 'Powder King Mountain Resort':{
    state:'british columbia',
    url:'http://www.powderking.com/index.php/full-ski-report/',
    scraper:function(errors, $){
      var newsnow = Math.round(parseFloat($($('#mountainreport tr td')[15]).text()) * 0.39);
      var base = Math.round(parseFloat($($('#mountainreport tr td')[24]).text()) * 0.39);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },


  /*
   * Switzerland
   *
   *
   */
  'Verbier':{
    state:'Valais',
    url:'http://www.infosnow.ch/~apgmontagne/?lang=fr&pid=31&tab=web-wi',
    scraper:function(errors, $){
      var newsnow = parseInt($('.content tr td').eq(21).text()) * 0.39 || 0;
      var base = Math.round(parseInt($('.content tr td').eq(20).text()) * 0.39);
      var conditions = 'n/a';
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },
  'Champex-Lac':{
    state:'Orsières',
    url:'http://meteo.search.ch/snow/champex-lac-snow-region.en.html',
    scraper:function(errors, $){
      var newsnow = parseFloat($('.snowtable tr td').eq(7).text())  * 0.39;
      var base = parseFloat($('.snowtable tr td').eq(5).text()) * 0.39;
      var conditions = 'n/a';
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },
  'Anzère':{
    state:'Ayent',
    url:'http://www.bergfex.com/anzere/schneebericht/',
    scraper:function(errors, $){
      var newsnow = parseInt(parseInt($('.default-size').eq(0).text().split(":")[1]) * 0.39);
      var base = 0;
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },
  'Crans Montana':{
    state:'Montana',
    url:'http://www.bergfex.com/crans-montana/schneebericht/',
    scraper:function(errors, $){
      var newsnow = 0;
      var base = parseInt( $('.big').eq(1).text() ) * 0.39;
      var conditions = 'n/a';
      console.log('CRANS MONATA new snow?')
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },
  'Les Diablerets':{
    state:'Ormont-Dessus',
    url:'http://www.infosnow.ch/~apgmontagne/?lang=en&pid=50&tab=web-wi',
    scraper:function(errors, $){
      var newsnow = Math.round( parseInt($('.content tr td').eq(14).text()) * 0.39 );
      var base = Math.round(parseFloat($('.content tr td').eq(13).text()) * 0.39);
      var conditions = 'n/a';
      console.log('new', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },
  'Portes du Soleil':{
    state:'Val-d Illiez',
    url:'http://www.snow-forecast.com/resorts/Morgins-LesPortesduSoleil',
    scraper:function(errors, $){
      var newsnow = 0; //parseInt( $('.big').eq(1).text() ) * 0.39;
      var base = Math.round(parseInt( $('.big').eq(1).text() ) * 0.39);
      var conditions = 'n/a';
      console.log('Portes du Soleil NEW SNOW?')
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },
  'Leukerbad':{
    state:'',
    url:'http://snow.myswitzerland.com/snow_reports/Valais/Leukerbad-83',
    scraper:function(errors, $){
      var newsnow = Math.round(parseInt( $('#info_set2_stage table tr td').eq(4).text() ) * 0.39);
      var base = Math.round(parseInt( $('#info_set2_stage table tr td').eq(0).text() ) * 0.39);
      var conditions = 'n/a';
      console.log('FIX Leukerbad!', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },
  'Leysin':{
    state:'Valais',
    url:'http://snow.myswitzerland.com/snow_reports/LakeGenevaRegion/Leysin-330',
    scraper:function(errors, $){
      var newsnow = parseInt( $('#info_set2_stage table tr td').eq(4).text() ) * 0.39;
      var base = parseInt( $('#info_set2_stage table tr td').eq(0).text() ) * 0.39;
      var conditions = 'n/a';
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },
  'Lötschental':{
    state:'Blatten',
    url:'http://www.bergfex.com/lauchernalp/schneebericht/',
    scraper:function(errors, $){
      var newsnow = 0; //parseInt($('.content tr td').eq(21).text()) * 0.39 || 0;
      var base = parseInt( $('.big').eq(1).text() ) * 0.39;
      var conditions = 'n/a';
      console.log('Lötschental fix NEW SNOW')
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },
  'Zermatt Matterhorn':{
    state:'Zermatt',
    url:'http://www.zermatt.ch/en/page.cfm/service/Wispo',
    scraper:function(errors, $){
      var newsnow = 0;//$('.row').eq(0).text();
      var base = 0;//0;
      var conditions = 'n/a';
      console.log('FIX ZERMATT new', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },
  'Saas Fee':{
    state:'',
    url:'http://www.snow-forecast.com/resorts/Saas-Fee/snow-report',
    scraper:function(errors, $){
      var newsnow = 0; //parseFloat( $('.roundedTable tr td').eq(5).text() );
      var base = 0; //parseFloat( $('.roundedTable tr td').eq(3).text() );
      var conditions = 'n/a';
      console.log('FIX SAAS newsnow', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },

  /*
  * Russia
  *
  */
  'Rosa Khutor':{
    state:'Western Caucasus',
    url:'http://rosaski.com/skiing/live/',
    scraper:function(errors, $){
      var newsnow = Math.round(parseInt($('.wthr_txtc').eq(3).text().split(':')[2]) * 0.39);
      var base = Math.round(parseInt($('.wthr_txtc').eq(3).text().split(':')[1]) * 0.39);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },

  /*
  * France!
  *
  */
  /*
  'Chamonix Mont Blanc':{
    state:'Rhone Alps',
    url:'http://www.chamonix.com/bulletin-neige,89,fr.html',
    scraper:function(errors, $){
      var newsnow = $('#goog-gt-tt .original-text').eq(0).text();
      var base = $('#goog-gt-tt .original-text').eq(0).text();
      var conditions = 'n/a';
      console.log('FIX Chamonix Mont Blanc newsnow', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }*/

  'Chamrousse':{
    state:'Isère',
    url:'http://www.chamrousse.com/www-bulletin-neige-31-hiver-uk-ski-glisse-2.html',
    scraper:function(errors, $){
      var newsnow = 0;
      var base = 0;
      var conditions = 'n/a';
      console.log('FIX Chamrousse newsnow', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },

  'Les 7 Laux':{
    state:'Isère',
    url:'http://www.les7laux.com/index.php/fr/menu-meteo-pistes',
    scraper:function(errors, $){
      var newsnow = 0;
      var base = 0;
      var conditions = 'n/a';
      console.log('FIX Les 7 Laux newsnow', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },

  "Alpe d'Huez":{
    state:'Isère',
    url:'http://www.alpedhuez.com/fr/hiver/meteo.html',
    scraper:function(errors, $){
     console.log('hello');
      var newsnow = Math.ceil( parseInt($('.colonne3 strong').eq(62).text()) * 0.39);
      var base = Math.ceil(parseInt($('.chiffre').eq(17).text()) * 0.39);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },

  'Les Deux Alpes':{
    state:'Isère',
    url:'http://www.les2alpes.com/en/weather.html',
    scraper:function(errors, $){
      var newsnow = 0;
      var base = 0;
      var conditions = 'n/a';
      console.log('FIX Les 7 Laux newsnow', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },

  'Les Saisies':{
    state:'Isère',
    url:'http://winter.lessaisies.com/snow-report.html',
    scraper:function(errors, $){
      var newsnow = 0;
      var base = 0;
      var conditions = 'n/a';
      console.log('FIX Les Saisies newsnow', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },
  'Les Arcs':{
    state:'Savoie',
    url:'http://www.lesarcs.com/en/enneigement.html',
    scraper:function(errors, $){
      var newsnow = 0;
      var base = 0;
      var conditions = 'n/a';
      console.log('FIX les arcs', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },

  'Val Thorens':{
    state:'Savoie',
    url:'http://www.valthorens.com/winter-en/val-thorens/live/snow-conditions.58.html',
    scraper:function(errors, $){
      var base = Math.ceil(parseInt($('.snowHeight dd').eq(0).text()) * 0.39);
      var newsnow = Math.ceil(parseInt($('.snowQuality dd').eq(1).text()) * 0.39);
      var conditions = 'n/a';
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },

  // NORWAY

  'Hafjell':{
    state:'Norway',
    url:'http://www.hafjell.no/skipass-and-skiing-in-hafjell-ski-resort/ski-snow-report',
    scraper:function(errors, $){
      var newsnow = Math.ceil(parseInt($('.snow-height').eq(0).text()) * 0.39);
      var base = Math.ceil(parseInt($('.snow-height').eq(3).text()) * 0.39);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },

  'Hemsedal':{
    state:'Norway',
    url:'http://www.skistar.com/en/Hemsedal/SkiPass-and-Skiing/Weather-lifts-and-snow/SnowGraph/',
    scraper:function(errors, $){
      var newsnow = Math.ceil(parseInt($('.data p').eq(6).text()) * 0.39);
      var base = Math.ceil(parseInt($('.data p').eq(4).text()) * 0.39);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },

  'Trysil':{
    state:'Norway',
    url:'http://www.skistar.com/en/Trysil/SkiPass-Skiing/Weather-lifts-and-snow/SnowGraph/',
    scraper:function(errors, $){
      var newsnow = Math.ceil(parseInt($('.data p').eq(6).text()) * 0.39);
      var base = Math.ceil(parseInt($('.data p').eq(4).text()) * 0.39);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },

  'Myrkdalen':{
    state:'Norway',
    url:'http://myrkdalen.no/weather/?lang=en',
    scraper:function(errors, $){
      var newsnow = Math.ceil(parseInt($('.report-section.snowfall .meta-full').eq(2).text()) * 0.39);
      var base = Math.ceil(parseInt($('.report-section.snowfall-slopes .meta-full').eq(2).text()) * 0.39);
      var conditions = 'n/a';
      console.log('newsnow', newsnow, 'base', base);
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  },

  'Stranda':{
    state:'Norway',
    url:'http://www.strandafjellet.no/resort-information/snowreport',
    scraper:function(errors, $, raw){
      console.log( $('.infocolumn').eq(5).text());
      var newsnow = parseInt($('.snowfall_cm font font').eq(0).text()) * 0.39;
      var base = parseInt($('.snow_offslope_top font font').eq(0).text()) * 0.39;
      var conditions = 'n/a';
      console.log('Stranda new:', newsnow, 'base', base)
      return {'new':newsnow, 'base':base, 'conditions':conditions};
    }
  }

}

module.exports = docs;
