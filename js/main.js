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
// var newEntryContainer = document.querySelector('main');
// var $entriesViewContainer = document.querySelector('.entries-view-container');
var $view = document.querySelectorAll('.view');
var $entries = document.querySelector('.entries-list');
var $h1 = document.querySelector('h1');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $ul = document.querySelector('ul');

$input.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();

  var $entry = document.querySelectorAll('.entry');
  var newEntry = {};

  newEntry.photoUrl = $entryForm.elements.photoUrl.value;
  newEntry.title = $entryForm.elements.title.value;
  newEntry.notes = $entryForm.elements.notes.value;

  if ($h1.textContent === 'Edit Entry') {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing === data.entries[i]) {
        data.entries[i].title = $entryForm.elements.title.value;
        data.entries[i].photoUrl = $entryForm.elements.photoUrl.value;
        data.entries[i].notes = $entryForm.elements.notes.value;
        $entry[i].replaceWith(renderEntries(data.entries[i]));
      }
    }
  } else if ($h1.textContent === 'New Entry') {
    data.entries.unshift(newEntry);
    $entries.prepend(renderEntries(data.entries[0]));
    data.nextEntryId++;
  }
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');

  $entryForm.reset();

});

// users can view their entry #2

function renderEntries(entry) {
  var listofEntries = document.createElement('li');
  listofEntries.setAttribute('data-entry-id', entry.entryId);

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
  editIcon.setAttribute('class', 'fas fa-pen pen');
  editIcon.setAttribute('data-entry-id', entry.entryId);
  editIcon.setAttribute('data-view', 'entry-form');
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

function swapViews(event) {
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].dataset.view === event) {
      $view[i].className = 'view';
      var currentView = $view[i].dataset.view;
      data.view = currentView;
    } else {
      $view[i].className = 'view hidden';
    }
  }
  if (data.view === 'entry-form') {
    $noEntry.className = 'hidden';
  } else if (data.entries.length === 0) {
    $noEntry.className = '';
  }
}

$saveButton.addEventListener('click', function (event) {
  swapViews('entries');
});

$newButton.addEventListener('click', function (event) {
  swapViews('entry-form');
});

entriesAnchor.addEventListener('click', function (event) {
  swapViews('entries');
});

$ul.addEventListener('click', function (event) {
  if (!(event.target.className === 'fas fa-pen pen')) {
    return;
  }

  swapViews('entry-form');

  var entryListElement = event.target.closest('li');
  var dataEntryIdValue = entryListElement.getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === dataEntryIdValue) {
      data.editing = data.entries[i];
    }
  }

  $h1.textContent = 'Edit Entry';
  $img.setAttribute('src', data.editing.photoUrl);
  $title.value = data.editing.title;
  $input.value = data.editing.url;
  $notes.value = data.editing.notes;

});
