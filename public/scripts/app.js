$(() => {

  function createTweetElement(tweetData) {

    //takes data from tweetData and puts in variable
    const name = tweetData.user.name;
    const img = tweetData.user.avatars.small;
    const username = tweetData.user.handle;
    const content = tweetData.content.text;
    const time = tweetData.created_at
    const timeElapsed = timeSince(new Date(time));

    //creates html form using jQuery
    const $article = $("<article>").addClass("tweet");
    const $header = $("<header>");
    const $img = $("<img>").attr('src', img);
    const $h2 = $("<h2>").addClass("name").html(name);
    const $span = $("<span>").addClass("username").html(username);
    const $div = $("<div>").addClass("the-tweet").text(content);
    const $footer = $("<footer>").addClass("tweetFooter").html(timeElapsed + ' ago');
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

  // submit/post
  $('#tweet-form').on('submit', function (event) {
    event.preventDefault();

    //validation
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

function timeSince(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + 's';
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + 'm';
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + 'h';
  }
  if (secondsPast > 86400) {
    day = timeStamp.getDate();
    month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
    year = timeStamp.getFullYear() == now.getFullYear() ? "" : " " + timeStamp.getFullYear();
    return day + " " + month + year;
  }
}

  loadTweets();

  $('.compose-tweet').click(function () {
    $('.new-tweet').slideToggle('slow');
    $('#tweetMaker textarea').focus();
  });

});

