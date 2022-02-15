/* global data */
/* exported data */
var $input = document.querySelector('#photoUrl');
var $img = document.querySelector('img');
var $entryForm = document.querySelector('#entry-form');

$input.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var newEntry = {};

  newEntry.photoUrl = $entryForm.elements.photoUrl.value;
  newEntry.title = $entryForm.elements.title.value;
  newEntry.notes = $entryForm.elements.notes.value;

  newEntry.newEntry = data.nextEntryID;
  data.nextEntryId++;

  data.entries.unshift(newEntry);

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
});
