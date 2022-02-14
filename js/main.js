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
  var entryId = {};

  entryId.photoUrl = $entryForm.elements.photoUrl.value;
  entryId.title = $entryForm.elements.title.value;
  entryId.notes = $entryForm.elements.notes.value;

  entryId.EntryId = data.newEntryId;
  data.newEntryId++;

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
});
