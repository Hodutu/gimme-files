'use strict';

var request = require('request');
var async = require('async');
var cheerio = require('cheerio');

var host = 'http://www.generalfil.es/';
var url = host + 'files-a/';

var getFile = function (link, cb) {
  request(host + link, function (err, response, body) {
    try {
      var finalLink = JSON.parse(body).link;
      cb(null, finalLink);
    } catch (e) {
      cb(new Error('Error on response parsing for ' + host + link));
    }
  });
};

var gf = function (title, options, cb) {
  var finalLinks = [];

  title = title.replace(/[^(\w)]+/gi, '-').toLowerCase();

  var reqOptions = '/?';

  // Set up type filter
  // Archives | Audio | Video | Docs | Pictures | Applications | CD,DVD
  if (options.types) {
    var types = options.types;
    reqOptions += '&filter=_';
    if(types instanceof Array){
      reqOptions += types[0];
      for (var i = 1; i < types.length; i++) {
        reqOptions += '_' + types[i];
      }
    } else {
      reqOptions += types;
    }
    reqOptions += "_";
  }

  if (options.hosts) {
    var hosts = options.hosts;
    reqOptions += '&hosting=';
    if(hosts instanceof Array){
      reqOptions += hosts[0];
      for (var i = 1; i < hosts.length; i++) {
        reqOptions += ',' + hosts[i];
      }
    } else {
      reqOptions += hosts;
    }
  }

  request(url + title + reqOptions, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var links = body.match(/gf_ShowDownloadLink\([\w',?=\/&]+/gi);
      if (!links || links.length === 0) {
        cb(new Error('No files found'));
        return;
      }

      links = links.map(function (link) {
        return link.split(',').pop().replace(/'/gi, '');
      });

      async.each(links, function (el, next) {
        getFile(el, function (err, result) {
          if (err) {
            next(err);
            return;
          }
          finalLinks.push(result);
          next();
        });
      }, function (err) {
        // Alles klar
        cb(err, finalLinks);
      });
    }
  });
};

// Get all available host
var getAllHosts = function (callback) {

  // This Array will store all the host and their key code.
  var hosts = [];

  request.get(url + 'advanced', function (err, res, body) {
    var $ = cheerio.load(body);

    // Let's grab available host from the page...
    var results = $('em[class^=i-fh-]').each(function (i, element) {

      // Element attributes
      var elementAttributes = element.attribs;

      if(elementAttributes) {

        // Host key
        var hostKey = elementAttributes.class;
        hostKey = hostKey ? hostKey.replace('i-fh-', '') : hostKey;

        // Host name
        var hostName = elementAttributes.title;

        if (hostKey != null) {
          var host = {};
          host.key = hostKey;
          host.name = hostName;
          hosts.push(host);
        }

      }
    });

    callback(err, hosts);

  });
};

module.exports = gf;
