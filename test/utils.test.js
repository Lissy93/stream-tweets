(function() {
  var expect, longResult1, streamTweets;

  expect = require('chai').expect;

  process.env.NODE_ENV = 'test';

  streamTweets = require('../index');

  longResult1 = require('./data-stubs/long-result1');

  describe('Check the private utility methods of the module', function() {
    it('Should be able to check is a string is valid JSON or not', function() {
      var isStrValidJson;
      isStrValidJson = streamTweets._private.isStrValidJson;
      expect(isStrValidJson("{}")).equal(true);
      expect(isStrValidJson('[]')).equal(true);
      expect(isStrValidJson('{"hello": "World"}')).equal(true);
      expect(isStrValidJson('{"meaning_of_life": 42}')).equal(true);
      expect(isStrValidJson('{"created_at":"Sat Sep 12 22:47:42 +0000 2015","id":642831981466652672,"id_str":"642831981466652672"}')).equal(true);
      expect(isStrValidJson('')).equal(false);
      expect(isStrValidJson('{hello}')).equal(false);
      expect(isStrValidJson('{"hello":"world')).equal(false);
      return expect(isStrValidJson('{"dinosaurs":"are":"awesome"')).equal(false);
    });
    it('Should correclt format the full result returned by Twitter', function() {
      var formatResults;
      formatResults = streamTweets._private.formatResults;
      return expect(formatResults(longResult1)).to.be.a('object');
    });
    return it('Should handle errors in the input of make request', function() {
      var makeRequest;
      return makeRequest = streamTweets._private.makeRequest;
    });
  });

}).call(this);
/* (C) Alicia Sykes <alicia@aliciasykes.com> 2015           *\
\* MIT License. Read full license at: https://goo.gl/IL4lQJ */