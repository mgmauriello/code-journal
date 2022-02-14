/* global data */
/* exported data */
var $input = document.querySelector('#photoUrl');
var $img = document.querySelector('img');

$input.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});
