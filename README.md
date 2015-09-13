
# stream-tweets
> A node.js module for streaming Tweets live using the Twitter streaming API's

[![Build Status](https://travis-ci.org/Lissy93/stream-tweets.svg?branch=dev)](https://travis-ci.org/Lissy93/stream-tweets)

## Install
```npm install stream-tweets```

## Set Up
Include the module in your code: ` var StreamTweets = require('stream-tweets'); `

Create a file (if you haven't already), for your API keys, and add your Twitter credentials in there.

```javascript
module.exports.twitterKeys = {
    consumer_key :      'XXXXXXXXXXXXXXXXXXXXXXXXX',
    consumer_secret :   'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    token:              'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    token_secret:       'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
};
```

Include your Twitter keys module, and create a new instance of stream-tweets

```javascript
var credentials = require('./config/api-keys').twitterKeys;

var st = new StreamTweets(credentials);
```

Done, now ready to strart streaming!
## Basic Usage
This code will continue returning a live stream of all Tweets containing the word 'JavaScript', in real-time.
```
st.stream('JavaScript', function(results){
    console.log(results); // Do awesome stuff with the results here
});
```

## Stream by location
This example will return a live stream of real-time Tweets from San Fransisco.
```
st.stream({locations: [-122.75,36.8,-121.75,37.8]}, function(results){
    console.log(results); 
});
```
You can also select Tweets from multiple locations, just by listing more latitudes and longitudes in the array.

## More Streaming paramaters
All the options listed on the official [Twitter streaming API documentation] are availible in this module.


## The Output
By defualt stream-tweets will return just the usefull stuff. An example output will follow this format:
```javascript
{ date: 'Sun Sep 13 08:48:18 +0000 2015',
  body: 'RT @jsconfasia: Princiya Sequeira; loves JavaScript and can hack D3.js to death! Read more about Princiya on http://t.co/3phJjnObkr http://…',
  location: { geo: null, coordinates: null, place: null },
  'retweet-count': 0,
  'favorited-count': 0,
  lang: 'en' }
{ date: 'Sun Sep 13 08:48:19 +0000 2015',
  body: 'nodenow: Who likes late night coding? #developer #java #javascript #code #coding #programming #adwords #api… … http://t.co/rvoRGmj9Zx',
  location: { geo: null, coordinates: null, place: null },
  'retweet-count': 0,
  'favorited-count': 0,
  lang: 'en' }
{ date: 'Sun Sep 13 08:48:22 +0000 2015',
  body: 'RT @_ericelliott: Advanced Performance Audits with DevTools: http://t.co/UaPoJEFNo0 by @paul_irish #js #JavaScript',
  location: { geo: null, coordinates: null, place: null },
  'retweet-count': 0,
  'favorited-count': 0,
  lang: 'en' }
  ```
  
  You want the full output returned by Twitter? No problem! Just set the second paramater to false when creating an instance of StreamTweets. Like this:
```javascript 
var st = new StreamTweets(credentials, false);
```

## Building
stream-tweets uses Gulp to prepare all files
- ```gulp build``` - Lints and compiles all CoffeeScript into JavaScript 
- ```gulp test``` - Run unit and coverage tests
- ```gulp``` - Watches files for changes, cleans working directory, builds project and tests then continues watching

See gulpfile.js for full documentation

## Testing
```npm test```

After tests are run, see reports directory for full and detailed test reports.

Veiw the [Continuous integration testing report on Travis]

Mocha, Chai, Istanbul, Sinon.js, MochaAwesome and Travis CI have been used in the test environment

License
----
MIT (C) [Alicia Sykes]

[View full license]


[//]: # (LINKS)
   [Twitter streaming API documentation]: <https://dev.twitter.com/streaming/overview/request-parameters>
   [Continuous integration testing report on Travis]: <https://travis-ci.org/Lissy93/stream-tweets>
   [View full license]: <LICENSE.md>
   [Alicia Sykes]: <http://aliciasykes.com>

