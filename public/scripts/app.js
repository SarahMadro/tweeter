$(() => {

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}
function createTweetElement(tweet) {

  //puts tweetdata info and puts in variable.
  const $tweet = $("<article>").addClass("tweet");
  const $header = $("<header>");
  const $img = $("<img>").attr('src', tweet.user.avatars.small);
  const $h2 = $("<h2>").addClass("name");
  const $span = $("<span>").addClass("username");
  const $div = $("<div>").addClass("the-tweet");
  const $footer = $("<footer>").addClass("tweetFooter");
  const $heart = $('<div>').html('&#10084;').addClass('heart');
  const $flag = $('<div>').html('&#9873;').addClass('flag');
  const $retweet = $('<div>').html('&#x21bb').addClass('retweet');
  };

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet)

function renderTweets(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  // ...
  return $tweet;
}

renderTweets(data);





});
