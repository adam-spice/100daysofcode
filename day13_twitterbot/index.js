const Twit = require('twit');
require('dotenv').config();

console.log(process.env.APPLICATION_CONSUMER_KEY);

const T = new Twit({
  consumer_key: process.env.APPLICATION_CONSUMER_KEY,
  consumer_secret: process.env.APPLICATION_CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

// start stream and track tweets
const stream = T.stream('statuses/filter', {
  track: [
    '#100DaysOfCode',
    '#CodeNewbie',
    '#JavaScript',
    '#CSS3',
    '#HTML5',
    '#CodeNewbie',
    '#CodeNewbies',
    '#freeCodeCamp',
    '#FrontEnd ',
  ],
});

// use this to log errors from requests
function responseCallback(err, data, response) {}

// event handler
stream.on('tweet', (tweet) => {
  // retweet
  T.post('statuses/retweet/:id', { id: tweet.id_str }, responseCallback);
  // like
  T.post('favorites/create', { id: tweet.id_str }, responseCallback);
});
