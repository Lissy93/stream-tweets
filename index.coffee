request = require 'request'
querystring = require 'querystring'

_private = {}

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

    req = request.post(params, (err) ->
      console.error err if err
    )

    req.on 'data', (buffer) ->
      message += buffer.toString()
      tweetSeparatorIndex = message.indexOf(separator)
      didFindTweet = tweetSeparatorIndex != -1

      if didFindTweet
        tweet = message.slice(0, tweetSeparatorIndex)
        if isStrValidJson(tweet)
          callback JSON.parse(tweet)
        message = message.slice(tweetSeparatorIndex + 1)


  # Processes the results to get rid of not needed data
  formatResults = (twitterResults) ->

    if !shouldFormatResults
      return twitterResults
    {
      'date': twitterResults.created_at,
      'body': twitterResults.text
      'location': prepareLocation(twitterResults)
      'retweet-count' : twitterResults.retweet_count
      'favorited-count' : twitterResults.favorite_count
      'lang' : twitterResults.lang
    }


  # Get location
  prepareLocation = (body) ->
    location =
      place_name: '_'
      location: { lat: 0.0000000, lng: 0.0000000 }

    # Check Coordinates object
    if body.coordinates?
      location.location.lat = body.coordinates.coordinates[1]
      location.location.lng = body.coordinates.coordinates[0]
    else if body.geo?
      location.location.lat = body.geo.coordinates[0]
      location.location.lng = body.geo.coordinates[1]

    # Check for place name
    if body.place?
      location.place_name = body.place.name
    else if body.user?
      location.place_name = body.user.location

    location


  # Check if the string would be valid json
  isStrValidJson = (str) ->
    try JSON.parse str
    catch e then return false
    true


  # Public function, to be directly called by main program
  stream: (params, cb) ->
    #Check what type of params we working with, and format appropriately
    if typeof params is 'string' then urlParams = 'track='+params
    else if typeof params is 'object' then urlParams = querystring.stringify(params)

    params = {
      uri: 'https://stream.twitter.com/1.1/statuses/filter.json?'+urlParams
    }
    makeRequest params, @credentials, (results) ->
      cb formatResults(results)

  _private = {
    isStrValidJson: isStrValidJson
    formatResults:  formatResults
    makeRequest:  makeRequest
  }


module.exports = StreamTweets

# If we're developing/ testing then export the private methods too
if process.env.NODE_ENV == 'test'
  module.exports = {
    main: StreamTweets
    _private: _private
  }