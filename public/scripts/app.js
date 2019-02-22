$(() => {

  function createTweetElement(tweetData) {
    // .moment().startOf('day').fromNow();

    //takes data from tweetData and puts in variable
    const name = tweetData.user.name;
    const img = tweetData.user.avatars.small;
    const username = tweetData.user.handle;
    const content = tweetData.content.text;
    const time = tweetData.created_at

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

