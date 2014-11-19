'use strict';

var request = require('request');

var url = 'http://www.general-search.com/download/';

var gse = function(title, cb) {
  title = title.replace(/[^(\w)]+/gi, '-').toLowerCase();
  request(url+title, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var results = body.match(/\/fileinfo\/gs([\w]+)/gi);
      if (results) {
        var filteredResults;
        filteredResults = results.filter(function(item, pos, self) {
          return self.indexOf(item) == pos;
        });

        console.log(filteredResults);
      } else {
        // no results
      }
    }
  });
};


gse('American Dad! S01E01', function(err, result) {

});

//GENERALFIL.ES
