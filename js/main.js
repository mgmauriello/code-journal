/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photoUrl');
var $img = document.querySelector('img');
var $entryForm = document.querySelector('#entry-form');
var $noEntry = document.querySelector('.no-entries-text');
var $h1 = document.querySelector('h1');
var $entryView = document.querySelector('#entry-view');
var $view = document.querySelectorAll('.view');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $ul = document.querySelector('ul');
var $newButton = document.querySelector('.new-button');
var $saveButton = document.querySelector('.save-button');
var entriesAnchor = document.querySelector('.entries');
var $modalPopUp = document.querySelector('.modal-popup');
var $deleteButton = document.querySelector('.delete-btn');

$photoUrl.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

// submit event
$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();

  if (data.editing === null) {
    var newEntry = {
      photoUrl: $photoUrl.value,
      title: $title.value,
      notes: $notes.value,
      entryId: data.nextEntryId
    };
    data.entries.unshift(newEntry);
    data.nextEntryId++;
    $ul.prepend(renderEntries(newEntry));

  } else {
    var editEntryValues = {
      entryId: data.editing,
      photoUrl: $photoUrl.value,
      title: $title.value,
      notes: $notes.value
    };
    for (var i = 0; i < data.entries.length; i++) {
      if (editEntryValues.entryId === data.entries[i].entryId) {
        data.entries[i] = editEntryValues;
      }
    }
    var $listOfEntries = document.querySelectorAll('li');
    for (var j = 0; j < $listOfEntries.length; j++) {
      if (editEntryValues.entryId === parseInt($listOfEntries[j].getAttribute('data-entry-id'))) {
        $listOfEntries[j].replaceWith(renderEntries(editEntryValues));
      }
    }
    data.editing = null;
  }

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
  swapViews('entries');
});

// users can view their entry
function renderEntries(entry) {
  var listofEntries = document.createElement('li');
  listofEntries.setAttribute('data-entry-id', entry.entryId);
  $ul.appendChild(listofEntries);

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
  editIcon.setAttribute('data-entry-id', data.entryId);
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
    $ul.appendChild(entriesData);
  }
  swapViews(data.view);
});

// swapping views
function swapViews(string) {
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === string) {
      $view[i].className = 'view';
      data.view = $view[i].getAttribute('data-view');
    } else {
      $view[i].className = 'view hidden';
    }
  }

  if (data.entries.length === 0) {
    $noEntry.className = 'no-entries-text';
  } else {
    $noEntry.className = 'hidden';
  }
}

// edit the entry
$entryView.addEventListener('click', function (event) {
  if (!(event.target.className === 'fas fa-pen pen')) {
    return;
  }
  var editEntryId = parseInt(event.target.closest('li').getAttribute('data-entry-id'));
  data.editing = editEntryId;
  $deleteButton.setAttribute('class', 'delete-btn');
  for (var i = 0; i < data.entries.length; i++) {
    if (editEntryId === data.entries[i].entryId) {
      $h1.textContent = 'Edit Entry';
      $title.value = data.entries[i].title;
      $photoUrl.value = data.entries[i].photoUrl;
      $notes.value = data.entries[i].notes;
      $img.setAttribute('src', $photoUrl.value);

    }
    swapViews('entry-form');
  }
});

$saveButton.addEventListener('click', function (event) {
  swapViews('entries');
});

$newButton.addEventListener('click', function (event) {
  swapViews('entry-form');
  $h1.textContent = 'New Entry';
  $entryForm.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
});

entriesAnchor.addEventListener('click', function (event) {
  swapViews('entries');
});

// can delete entry

$deleteButton.addEventListener('click', function (event) {
  if (event.target.matches('button')) {
    $modalPopUp.className = 'modal-popup show-modal';
  } else {
    $modalPopUp.className = 'modal-popup hidden';
  }
  swapViews('entry-form');
});
