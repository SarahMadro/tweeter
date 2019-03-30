$(() => {

$(`section.new-tweet textarea`).on(`input`, function(event) {
  event.preventDefault();
  event.stopPropagation();
  let $textAreaLeng = $(this).val().length;
  let $counter = $(this).parent().find('.counter');
  $counter.text(140 - $textAreaLeng);
  if($textAreaLeng > 140) {
    $counter.css(`color`, `red`);
  } else {
    $counter.css(`color`, `black`);
  }
})

});

