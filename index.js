(function(){var t,e,r;r=require("request"),e=require("querystring"),t=function(){function t(t,e){this.credentials=t,this.shouldFormatResults=null!=e?e:!0,s=this.shouldFormatResults}var n,o,s;return s=null,o=function(t,e,n){var o,s,c;return o="",c="\r",t.oauth={callback:"/",consumer_key:e.consumer_key,consumer_secret:e.consumer_secret,token:e.token,token_secret:e.token_secret},s=r.post(t,function(t,e,r){return t?console.error(t):void 0}),s.on("data",function(t){var e,r,s;return o+=t.toString(),s=o.indexOf(c),e=-1!==s,e?(r=o.slice(0,s),n(JSON.parse(r)),o=o.slice(s+1)):void 0})},n=function(t){return s?{date:t.created_at,body:t.text,location:{geo:t.geo,coordinates:t.coordinates,place:t.place},"retweet-count":t.retweet_count,"favorited-count":t.favorite_count,lang:t.lang}:t},t.prototype.stream=function(t,r){var s;return"string"==typeof t?s="track="+t:"object"==typeof t&&(s=e.stringify(t)),t={uri:"https://stream.twitter.com/1.1/statuses/filter.json?"+s},o(t,this.credentials,function(t){return r(n(t))})},t}(),module.exports=t}).call(this);