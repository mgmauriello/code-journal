/* global data */
/* exported data */
var $input = document.querySelector('#photoUrl');
var $img = document.querySelector('img');
var $entryForm = document.querySelector('#entry-form');
var $entrylist = document.querySelector('.entries-lists');
var $newButton = document.querySelector('.new-button');
var $saveButton = document.querySelector('.save-button');
var $noEntry = document.querySelector('.no-entries-text');
var entriesAnchor = document.querySelector('.entries');
var newEntryContainer = document.querySelector('main');
var $entriesViewContainer = document.querySelector('.entries-view-container');

var $ul = document.querySelector('ul');
var $newEntryEdit = document.querySelector('#new-entry-edit');

$input.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

function changePageView(views) {
  if (data.view === 'entries') {
    newEntryContainer.className = 'hidden';
  } else if (data.view === 'entry-form') {
    $noEntry.className = 'hidden';
    $entriesViewContainer.className = 'hidden';
  }

  if (data.entries.length === 0) {
    $noEntry.className = 'no-entries-text';
  } else {
    $noEntry.className = 'hidden';
  }
}

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var newEntry = {};

  newEntry.photoUrl = $entryForm.elements.photoUrl.value;
  newEntry.title = $entryForm.elements.title.value;
  newEntry.notes = $entryForm.elements.notes.value;

  newEntry.newEntry = data.nextEntryId;
  data.nextEntryId++;

  data.entries.unshift(newEntry);
  var journalEntry = renderEntries(newEntry);
  $entrylist.prepend(journalEntry);

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');

  $entryForm.reset();
  changePageView('entries');
});

// users can view their entry #2

function renderEntries(entry) {
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
  entriesText.className = 'column-half entries-text';
  row.appendChild(entriesText);

  var titles = document.createElement('h2');
  titles.className = 'entries-title';
  titles.textContent = entry.title;
  entriesText.appendChild(titles);

  var editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fas fa-pencil-alt edit-icon');
  editIcon.setAttribute('data-entry-id', entry.entryId);
  titles.appendChild(editIcon);

  var entriesNotes = document.createElement('p');
  entriesNotes.textContent = entry.notes;
  entriesText.appendChild(entriesNotes);

  return listofEntries;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entriesData = renderEntries(data.entries[i]);
    $entrylist.appendChild(entriesData);
  }
});

$saveButton.addEventListener('click', function (event) {
  $entriesViewContainer.className = '';
  newEntryContainer.className = 'hidden';
  data.view = 'entries';
});

$newButton.addEventListener('click', function (event) {
  $entriesViewContainer.className = 'hidden';
  newEntryContainer.className = '';
  data.view = 'entry-form';
});

entriesAnchor.addEventListener('click', function (event) {
  $entriesViewContainer.className = '';
  newEntryContainer.className = 'hidden';
  data.view = 'entries';
});

// edit an entry #3
$ul.addEventListener('click', function (event) {
  $newEntryEdit.textContent = 'Edit Entry';

  if (event.target.nodeName !== 'I') {
    return;
  }

  $newEntryEdit.textContent = 'Edit Entry';
  var $entryListTarget = event.target.getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    if (Number($entryListTarget) === data.entries[i].entryId) {
      data.editing = data.entries[i];
    }
  }

  $entryForm.elements.title.value = data.editing.title;
  $entryForm.elements.photoUrl.value = data.editing.photoUrl;
  $entryForm.elements.notes.value = data.editing.notes;
  $img.setAttribute('src', $entryForm.elements.photoUrl.value);
});
