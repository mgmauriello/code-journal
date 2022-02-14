/* global data */
/* exported data */
var $input = document.querySelector('#photoUrl');
var $img = document.querySelector('img');

$input.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

var $entryForm = document.querySelector('#entry-form');

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var nextEntryId = {};

  nextEntryId.photoUrl = $entryForm.elements.photoUrl.value;
  nextEntryId.title = $entryForm.elements.title.value;
  nextEntryId.notes = $entryForm.elements.notes.value;
  nextEntryId.nextEntryId = data.newEntryId;

  data.newEntryId++;

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();

});
