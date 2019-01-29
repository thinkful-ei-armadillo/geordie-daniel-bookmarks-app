'use strict';

/*global Item $ STORE*/


//detailed bookmark template


//condensed bookmark template
{/* <li class="bookmark-li">
    <h3 class="bookmark-title">Bookmark Title</h3>
    <div class="rating-view">
    //put rating into this div
    </div>
</li>; */}

// adding bookmark listener function, event listener on click of add bookmark to un-hide create bookmark form

function listenToAddBookmark() {
  $('.js-main-view').on( 'click', '.add-bookmark-button', function(event) {
    event.preventDefault();
    $('.js-add-form').toggleClass('hidden');
    $('.js-main-view').toggleClass('hidden');
    createBookmark();
  });
}

// create bookmark function, event listener on submit of form to put user data into store and API

function createBookmark() {
  $('.js-create-bookmark-form').on('submit', function(event) {
    event.preventDefault();
    const bookmarkTitle = $('.bookmark-title').val();
    const bookmarkUrl = $('.url-input').val();
    const bookmarkDesc = $('.description-input').val();
    const bookmarkRating = $('#rating-input').val();
    console.log(bookmarkRating);
    const bookmarkObj = Item.create(bookmarkTitle, bookmarkUrl, 
      bookmarkDesc, bookmarkRating);
    console.log(bookmarkObj);
    console.log(STORE.list);
    STORE.list.push(bookmarkObj);
    htmlTheBookmark(bookmarkObj);
  } );
}

function htmlTheBookmark(bookmark){
  $('.bookmark-list').append(`
    <li class="bookmark-li">
  <h3 class="bookmark-title">${bookmark.title}</h3>
  <p class="description hidden">
    ${bookmark.desc}
  </p>
  <button class="bookmark-link hidden">
    <a href="${bookmark.url}">Visit Site</a>
  </button>
  <button class="delete-bookmark hidden"></button>
  <div class="rating-view">
    ${bookmark.rating}
  </div>
</li>
    `);
}

// filter funtion, event listener on selection value of dropdown "minimum rating", only show certain LIs

function filterByRating() {
  $('#filter-rating').on( 'change', function(event) {
    event.preventDefault();
    const filterBy = this.val();
    for ( let i = 0; i < STORE.list.length; i++ ){
      if ( STORE.list[i].rating < filterBy ) {
        STORE.list[i].hidden = true;
      }
    }
    // STORE.list.rating.filter(filterBy)
    renderTheBookmarkApp();
  } );
}

// detailed view function, event listener on click of LI to expand into detailed view, should work in
// both filtered and non-filtered views

function detailView() {
  $('.bookmark-list').on('click', '.bookmark-li', function(event) {
    $(event.currentTarget).toggleClass('selected');
    $('.description').toggleClass('hidden');
    $('.bookmark-link').toggleClass('hidden');
    $('.delete-bookmark').toggleClass('hidden');
    renderTheBookmarkApp();
  });
}

// delete function, event listener on click to delete bookmark

// render funtion - pretty important!

function renderTheBookmarkApp() {
  listenToAddBookmark();
  detailView();
  filterByRating();
}