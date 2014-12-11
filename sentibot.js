var Twit = require('twit')
var Pusher = require('pusher');

var config;
try {
  config = require("./config");
} catch(e) {
  console.log("Failed to find local config, falling back to environment variables");
  config = {
    pusher_app_id: process.env.PUSHER_APP_ID,
    pusher_key: process.env.PUSHER_KEY,
    pusher_secret: process.env.PUSHER_SECRET,
    twitter_consumer_key: process.env.TWITTER_CONSUMER_KEY,
    twitter_consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    twitter_access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    twitter_access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  }
}


var T = new Twit({
    consumer_key: config.twitter_consumer_key,
	consumer_secret: config.twitter_consumer_secret,
	access_token: config.twitter_access_token_key,
	access_token_secret: config.twitter_access_token_secret
})

var pusher = new Pusher({
  appId: config.pusher_app_id,
  key: config.pusher_key,
  secret: config.pusher_secret
});

//
// filter the public stream by english tweets containing `#sentibot`
//
var stream = T.stream('statuses/filter', { track: '#sentibot', language: 'en' })

stream.on('tweet', function (tweet) {
	console.log(tweet.text)

	// pusher.trigger('sentibot_channel', 'tweet', {
	// 	"message": tweet.text
	// });
})