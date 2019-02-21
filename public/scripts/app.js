$(() => {

  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [{
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
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];


  function createTweetElement(tweetData) {
    //takes data from tweetData and puts in variable
    const name = tweetData.user.name;
    const img = tweetData.user.avatars.small;
    const username = tweetData.user.handle;
    const content = tweetData.content.text;
    const time = tweetData.created_at;

    //creates html form using jQuery
    const $article = $("<article>").addClass("tweet");
    const $header = $("<header>");
    const $img = $("<img>").attr('src', img);
    const $h2 = $("<h2>").addClass("name").html(name);
    const $span = $("<span>").addClass("username").html(username);
    const $div = $("<div>").addClass("the-tweet").text(content);
    const $footer = $("<footer>").addClass("tweetFooter").html(time);
    const $heart = $('<div>').html('&#10084;').addClass('heart');
    const $flag = $('<div>').html('&#9873;').addClass('flag');
    const $retweet = $('<div>').html('&#x21bb').addClass('retweet');

    //puts form in parent/child format
    $article.append($header);
    $header.append($img);
    $header.append($h2);
    $header.append($span);
    $article.append($div);
    $article.append($footer);
    $footer.append($heart);
    $footer.append($flag);
    $footer.append($retweet);

    return $article;
  }

  //loops through tweet objects and appends each to #tweets-container
  function renderTweets(tweets) {
    tweets.forEach((tweet) => {
      const element = createTweetElement(tweet);
      $('#tweets-container').prepend(element);
    })
  };

  renderTweets(data);

  // submit/post
  $('#tweet-form').on('submit', function (event) {
    event.preventDefault();

    let valid = false;
    if ($('textarea').val() === '') {
      $('.error1').slideDown();
    } else {
      $('.error1').slideUp();
      valid = true;
    }

    let $tweetArea = $('textarea').val().length;
    if ($tweetArea > 140) {
      $('.error2').slideDown();
      valid = false;
    } else {
      $('.error2').slideUp();
      valid = true;
    }
    if (valid) {
    const textVal = $(this).serialize();
    $.post('/tweets', textVal)
      .then(res => {
        loadTweets();
      })
      //clear tweet form
      $('#tweet-form')[0].reset();
    }
  });

  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).then((res) => {
      renderTweets(res)
    })
  };

  loadTweets();

  $('.compose-tweet').click(function () {
    $('.new-tweet').slideToggle('slow');
    $('#tweetMaker textarea').focus();
  });

});

