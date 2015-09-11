request = require 'request'
querystring = require 'querystring'


class StreamTweets

  shouldFormatResults = null # Will be set (true|false) when object initiated

  constructor: (@credentials, @shouldFormatResults = true) ->
    shouldFormatResults = @shouldFormatResults

  # Fetches the data from given URL from Twitter
  makeRequest = (params, credentials, callback) ->

    message = "" # Variable that accumulates tweets
    separator = "\r" # What separates multiple Tweet objects

    params.oauth = {
      callback: '/'
      consumer_key: credentials.consumer_key
      consumer_secret: credentials.consumer_secret
      token : credentials.token
      token_secret : credentials.token_secret
    }

    req = request.post(params, (err, response, body) ->
      console.error err if err
    )

    req.on 'data', (buffer) ->
      message += buffer.toString()
      tweetSeparatorIndex = message.indexOf(separator)
      didFindTweet = tweetSeparatorIndex != -1

      if didFindTweet
        tweet = message.slice(0, tweetSeparatorIndex)
        callback JSON.parse(tweet)
        message = message.slice(tweetSeparatorIndex + 1)


  # Processes the results to get rid of not needed data
  formatResults = (twitterResults) ->
    if !shouldFormatResults
      return twitterResults
    {
      'date': twitterResults.created_at,
      'body': twitterResults.text
      'location': {
        'geo' : twitterResults.geo
        'coordinates' : twitterResults.coordinates
        'place' : twitterResults.place
      }
      'retweet-count' : twitterResults.retweet_count
      'favorited-count' : twitterResults.favorite_count
      'lang' : twitterResults.lang
    }

  stream: (cb) ->
    params = { uri: 'https://stream.twitter.com/1.1/statuses/filter.json?track=twitter'}
    makeRequest params, @credentials, (results) ->
      cb formatResults(results)


module.exports = StreamTweets