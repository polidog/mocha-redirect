var baseUrl, expect, file, fs, line, request;

expect = require('Chai').expect;

request = require('request');

fs = require('fs');

baseUrl = 'http://www.polidog.jp';

file = fs.readFileSync('./list.txt', {
  encoding: 'UTF-8'
}).split("\n");

line = function*(file) {
  var line, recirectUri, target, uri, _i, _len;
  for (_i = 0, _len = file.length; _i < _len; _i++) {
    line = file[_i];
    target = line.replace('\~\^', '').replace('.*', '').replace(';','').split(' ');
    if (target[0].length > 0) {
      uri = baseUrl + target[0];
      recirectUri = target[1];
      yield {
        uri: uri,
        recirectUri: recirectUri
      };
    }
  }
  return null;
};

describe('redirect 302 checks', function() {
  var data;
  for (data of line(file)) {
    it('should return 301:' + data.uri, function(done) {
      request.get({
        followRedirect: false,
        uri: data.uri
      }, function(err, res, body) {
        expect(res.statusCode).to.equal(301);
        done();
      });
    });
  }
});

describe('redirected site 200 checks', function() {
  var data;
  for (data of line(file)) {
    it('should return 200:' + data.uri, function(done) {
      request.get(data.uri, function(err, res, body) {
        expect(res.statusCode).to.equal(200);
        expect(res.request.uri.href).to.equal(data.recirectUri);
        done();
      });
    });
  }
});
