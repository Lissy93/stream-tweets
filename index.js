(function() {
  var StreamTweets, _private, querystring, request;

  request = require('request');

  querystring = require('querystring');

  _private = {};

  StreamTweets = (function() {
    var formatResults, isStrValidJson, makeRequest, shouldFormatResults;

    shouldFormatResults = null;

    function StreamTweets(credentials1, shouldFormatResults1) {
      this.credentials = credentials1;
      this.shouldFormatResults = shouldFormatResults1 != null ? shouldFormatResults1 : true;
      shouldFormatResults = this.shouldFormatResults;
    }

    makeRequest = function(params, credentials, callback) {
      var message, req, separator;
      message = "";
      separator = "\r";
      params.oauth = {
        callback: '/',
        consumer_key: credentials.consumer_key,
        consumer_secret: credentials.consumer_secret,
        token: credentials.token,
        token_secret: credentials.token_secret
      };
      req = request.post(params, function(err) {
        if (err) {
          return console.error(err);
        }
      });
      return req.on('data', function(buffer) {
        var didFindTweet, tweet, tweetSeparatorIndex;
        message += buffer.toString();
        tweetSeparatorIndex = message.indexOf(separator);
        didFindTweet = tweetSeparatorIndex !== -1;
        if (didFindTweet) {
          tweet = message.slice(0, tweetSeparatorIndex);
          if (isStrValidJson(tweet)) {
            callback(JSON.parse(tweet));
          }
          return message = message.slice(tweetSeparatorIndex + 1);
        }
      });
    };

    formatResults = function(twitterResults) {
      if (!shouldFormatResults) {
        return twitterResults;
      }
      return {
        'date': twitterResults.created_at,
        'body': twitterResults.text,
        'location': {
          'geo': twitterResults.geo,
          'coordinates': twitterResults.coordinates,
          'place': twitterResults.place
        },
        'retweet-count': twitterResults.retweet_count,
        'favorited-count': twitterResults.favorite_count,
        'lang': twitterResults.lang
      };
    };

    isStrValidJson = function(str) {
      var e, error;
      try {
        JSON.parse(str);
      } catch (error) {
        e = error;
        return false;
      }
      return true;
    };

    StreamTweets.prototype.stream = function(params, cb) {
      var urlParams;
      if (typeof params === 'string') {
        urlParams = 'track=' + params;
      } else if (typeof params === 'object') {
        urlParams = querystring.stringify(params);
      }
      params = {
        uri: 'https://stream.twitter.com/1.1/statuses/filter.json?' + urlParams
      };
      return makeRequest(params, this.credentials, function(results) {
        return cb(formatResults(results));
      });
    };

    _private = {
      isStrValidJson: isStrValidJson
    };

    return StreamTweets;

  })();

  module.exports = StreamTweets;

  if (process.env.NODE_ENV === 'test') {
    module.exports = {
      main: StreamTweets,
      _private: _private
    };
  }

}).call(this);
/* (C) Alicia Sykes <alicia@aliciasykes.com> 2015           *\
\* MIT License. Read full license at: https://goo.gl/IL4lQJ */