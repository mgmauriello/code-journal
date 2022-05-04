/* global data */
/* exported data */
const $photoUrl = document.querySelector('#photoUrl');
const $img = document.querySelector('img');
const $entryForm = document.querySelector('#entry-form');
const $noEntry = document.querySelector('.no-entries-text');
const $h1 = document.querySelector('h1');
const $entryView = document.querySelector('#entry-view');
const $view = document.querySelectorAll('.view');
const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');
const $ul = document.querySelector('ul');
const $newButton = document.querySelector('.new-button');
const entriesAnchor = document.querySelector('.entries');

const $modalPopUp = document.querySelector('.modal-popup');
const $deleteButton = document.querySelector('button[type="button"]');
const $confirmButton = document.querySelector('.confirm-btn');
const $cancelButton = document.querySelector('.cancel-btn');

$photoUrl.addEventListener('input', event => {
  $img.setAttribute('src', event.target.value);
});

// submit event
$entryForm.addEventListener('submit', event => {
  event.preventDefault();

  if (data.editing === null) {
    const newEntry = {
      photoUrl: $photoUrl.value,
      title: $title.value,
      notes: $notes.value,
      entryId: data.nextEntryId
    };
    data.entries.unshift(newEntry);
    data.nextEntryId++;
    $ul.prepend(renderEntries(newEntry));

  } else {
    const editEntryValues = {
      entryId: data.editing,
      photoUrl: $photoUrl.value,
      title: $title.value,
      notes: $notes.value
    };
    for (let i = 0; i < data.entries.length; i++) {
      if (editEntryValues.entryId === data.entries[i].entryId) {
        data.entries[i] = editEntryValues;
      }
    }
    const $listOfEntries = document.querySelectorAll('li');
    for (let j = 0; j < $listOfEntries.length; j++) {
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
  const listofEntries = document.createElement('li');
  listofEntries.setAttribute('data-entry-id', entry.entryId);
  $ul.appendChild(listofEntries);

  const row = document.createElement('div');
  row.className = 'row';
  listofEntries.appendChild(row);

  const columnHalf = document.createElement('div');
  columnHalf.className = 'column-half';
  row.appendChild(columnHalf);

  const img = document.createElement('img');
  img.setAttribute('src', entry.photoUrl);
  img.className = 'img-entries';
  columnHalf.appendChild(img);

  const entriesText = document.createElement('div');
  entriesText.className = 'column-half entries-text';
  row.appendChild(entriesText);

  const titles = document.createElement('h2');
  titles.className = 'entries-title';
  titles.textContent = entry.title;
  entriesText.appendChild(titles);

  const editIcon = document.createElement('i');
  editIcon.setAttribute('class', 'fas fa-pen pen');
  editIcon.setAttribute('data-entry-id', data.entryId);
  editIcon.setAttribute('data-view', 'entry-form');
  titles.appendChild(editIcon);

  const entriesNotes = document.createElement('p');
  entriesNotes.textContent = entry.notes;
  entriesText.appendChild(entriesNotes);

  return listofEntries;
}

document.addEventListener('DOMContentLoaded', event => {
  for (let i = 0; i < data.entries.length; i++) {
    const entriesData = renderEntries(data.entries[i]);
    $ul.appendChild(entriesData);
  }
  swapViews(data.view);
});

// swapping views
function swapViews(string) {
  for (let i = 0; i < $view.length; i++) {
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
$entryView.addEventListener('click', event => {
  if (!(event.target.className === 'fas fa-pen pen')) {
    return;
  }
  const editEntryId = parseInt(event.target.closest('li').getAttribute('data-entry-id'));
  data.editing = editEntryId;
  for (let i = 0; i < data.entries.length; i++) {
    if (editEntryId === data.entries[i].entryId) {
      $h1.textContent = 'Edit Entry';
      $title.value = data.entries[i].title;
      $photoUrl.value = data.entries[i].photoUrl;
      $notes.value = data.entries[i].notes;
      $img.setAttribute('src', $photoUrl.value);
      $deleteButton.className = 'delete-btn';
    }
    swapViews('entry-form');
  }
});

$newButton.addEventListener('click', event => {
  swapViews('entry-form');
  $h1.textContent = 'New Entry';
  $entryForm.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
});

entriesAnchor.addEventListener('click', event => {
  swapViews('entries');
});

// can delete entry

$deleteButton.addEventListener('click', event => {
  if (event.target.matches('button[type="button"]')) {
    $modalPopUp.className = 'modal-popup show-modal';
  } else {
    $modalPopUp.className = 'modal-popup hidden';
  }

});

$cancelButton.addEventListener('click', event => {
  if (event.target.matches('.cancel-btn')) {
    $modalPopUp.className = 'modal-popup hidden';
  } else {
    $modalPopUp.className = 'modal-popup show-modal';
  }
});

$confirmButton.addEventListener('click', event => {
  event.preventDefault();
  swapViews('entries');
  $modalPopUp.className = 'modal-popup hidden';

  const deleteEntry = document.querySelector('[data-entry-id=' + '"' + data.editing + '"' + ']');
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing) {
      data.entries.splice(i, 1);
    }
  }
  deleteEntry.remove(deleteEntry);
  $entryForm.reset();
});
