/* global data */
/* exported data */
var $input = document.querySelector('#photoUrl');
var $img = document.querySelector('img');
var $entriesList = document.querySelector('.entries-list');
var $entryForm = document.querySelector('#entry-form');
var $newButton = document.querySelector('.new- button');
var $viewEntry = document.querySelector('[data-veiw="entries"]');
var $noEntry = document.querySelector('.no-entries-text');
var $newEntry = document.querySelector('[data-veiw="entry-form"]');

$input.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var entryId = {};

  entryId.photoUrl = $entryForm.elements.photoUrl.value;
  entryId.title = $entryForm.elements.title.value;
  entryId.notes = $entryForm.elements.notes.value;

  entryId.EntryId = data.newEntryID;
  data.newEntryId++;

  data.entries.unshift(entryId);
  var newEntry = viewEntries(entryId);
  $entriesList.prepend(newEntry);

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();

  $newEntry.className = 'hidden';
  $noEntry.className = 'hidden';
  $viewEntry.className = '';
  data.view = 'entries';
});

/*
users can view their entry #2
recreate entry form line by line (row (in div), col (in div), then img, divs
form wont be form - title = h1? entries text = p ;; ^^ look at props
in the $entrieslist - appendChild
*/

function viewEntries(entry) {
  var listofEntries = document.createElement('li');

  var row = document.createElement('div');
  row.className = 'row';
  listofEntries.appendChild(row);

  var columnHalf = document.createElement('div');
  columnHalf.className = 'column-half';
  row.appendChild(columnHalf);

  var img = document.createElement('img');
  img.setAttribute('src', entry.photoUrl);
  img.className = 'img-entries';
  columnHalf.appendChild(img);

  var entriesText = document.createElement('div');
  entriesText.className = 'column half entries-text';
  row.appendChild(entriesText);

  var titles = document.createElement('h2');
  titles.textContent = entry.title;
  entriesText.appendChild(titles);

  var entriesNotes = document.createElement('p');
  entriesNotes.textContent = entry.notes;
  entriesText.appendChild(entriesNotes);

  return listofEntries;
}
/*
Use a loop to create a DOM tree for each journal entry in the data model
and append it to the page when the 'DOMContentLoaded' event is fired.
*/

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entryData = viewEntries(data.entries[i]);
    $entriesList.appendChild(entryData);
  }
  if (data.view === 'entries') {
    $newEntry.className = 'hidden';
  } else if (data.view === 'entry-form') {
    $noEntry.className = 'hidden';
    $viewEntry.className = 'hidden';
  }

  if (data.entries.length === '') {
    $noEntry.className = 'no-entries-text';
  } else {
    $noEntry.className = 'hidden';
  }
});

$newButton.addEventListener('click', function (event) {
  $viewEntry.className = 'hidden';
  $newEntry.className = '';
  data.view = 'entry-form';
});
