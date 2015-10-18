(function() {
  var expect, streamTweets, twitterKeys;

  expect = require('chai').expect;

  process.env.NODE_ENV = 'test';

  streamTweets = require('../index').main;

  twitterKeys = {
    consumer_key: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
    consumer_secret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  };

  describe('Check the modules basic functionality', function() {
    it('Should create a new instance of stream-tweets with twitter keys and default second param', function() {
      var newInstance;
      newInstance = new streamTweets(twitterKeys);
      expect(newInstance).to.be.an["instanceof"](streamTweets);
      expect(newInstance.credentials).equal(twitterKeys);
      return expect(newInstance.shouldFormatResults).equal(true);
    });
    return it('Should create a new instance of stream-tweets with 2 params passed to constructor', function() {
      var newInstance2;
      newInstance2 = new streamTweets(twitterKeys, false);
      expect(newInstance2).to.be.an.instanceOf(streamTweets);
      expect(newInstance2.credentials).equal(twitterKeys);
      expect(newInstance2.shouldFormatResults).to.be.a('boolean');
      return expect(newInstance2.shouldFormatResults).equal(false);
    });
  });

}).call(this);
/* (C) Alicia Sykes <alicia@aliciasykes.com> 2015           *\
\* MIT License. Read full license at: https://goo.gl/IL4lQJ */