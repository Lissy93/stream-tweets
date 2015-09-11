request = require 'request'
querystring = require 'querystring'


class StreamTweets

  shouldFormatResults = null

  message = "" # variable that accumalates tweets
  seperator = "\r"

  constructor: (@credentials, @shouldFormatResults = true) ->
    shouldFormatResults = @shouldFormatResults

  # Fetches the data from given URL from Twitter
  makeRequest = (params, credentials, callback) ->
    params.oauth = {
      callback: '/'
      consumer_key: credentials.consumer_key
      consumer_secret: credentials.consumer_secret
      token : credentials.token
      token_secret : credentials.token_secret
    }
#    request {
#      url: url
#      json: true
#      oauth: oauth
#    },(error, response, body)->
#      if !error and response.statusCode == 200
#        callback (body)

    req = request.post(params, (err, response, body) ->
      if err
        console.error err
    )
    req.on 'data', (buffer) ->
      message += buffer.toString()
      tweetSeparatorIndex = message.indexOf(seperator)
      didFindTweet = tweetSeparatorIndex != -1

      if didFindTweet
        tweet = message.slice(0, tweetSeparatorIndex)
        callback JSON.parse(tweet).text + '\n\n'
        message = message.slice(tweetSeparatorIndex + 1)


  stream: (cb) ->
    params = { uri: 'https://stream.twitter.com/1.1/statuses/filter.json?track=twitter'}
    makeRequest params, @credentials, (results) ->
      cb (results)



module.exports = StreamTweets