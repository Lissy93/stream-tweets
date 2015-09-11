request = require 'request'
querystring = require 'querystring'


class StreamTweets

  shouldFormatResults = null

  constructor: (@credentials, @shouldFormatResults = true) ->
    shouldFormatResults = @shouldFormatResults



module.exports = StreamTweets