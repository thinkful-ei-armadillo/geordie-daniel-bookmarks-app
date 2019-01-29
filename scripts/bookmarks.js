'use strict';

//detailed bookmark template
<li class="selected bookmark-li">
  <h3 class="bookmark-title">Bookmark Title</h3>
  <p class="description">
    boomark description
  </p>
  <button class="bookmark-link">
    <a href="#">Visit Site</a>
  </button>
  <button class="delete-bookmark"></button>
  <div class="rating-view">
    //put rating into this div
  </div>
</li>;

//condensed bookmark template
<li class="bookmark-li">
    <h3 class="bookmark-title">Bookmark Title</h3>
    <div class="rating-view">
    //put rating into this div
    </div>
</li>;

// adding bookmark listener function, event listener on click of add bookmark to un-hide create bookmark form

function listenToAddBookmark() {
  $('.js-main-view').on( 'click', '.add-bookmark-button', function(event) {
    event.preventDefault();
    $('.js-add-form').toggleClass('.hidden');
    $('.js-main-view').toggleClass('.hidden');
    createBookmark();
  })
}

// create bookmark function, event listener on submit of form to put user data into store and API

function createBookmark() {
  $('.js-create-bookmark-form').on( 'submit', function(event) {
    event.preventDefault();
    const bookmarkTitle = $('.bookmark-title').val();
    const bookmarkUrl = $('.url-input').val();
    const bookmarkDesc = $('.description-input').val();
    const bookmarkRating = $('.rating-input').val();
    const bookmarkObj = { id: cuid(), title: bookmarkTitle, url: bookmarkUrl, 
      desc: bookmarkDesc, rating: bookmarkRating };
    STORE.list.push(bookmarkObj);
  } )
}

// filter funtion, event listener on selection value of dropdown "minimum rating", only show certain LIs

function filterByRating() {
  $('#filter-rating').on( 'change', function(event) {
    event.preventDefault();
    const filterBy = this.val();
    for ( let i = 0; i < STORE.list.length; i++ ){
      if ( STORE.list[i].rating >= filterBy ) {

      }
      else if ( STORE.list[i].rating < filterBy ) {
        STORE.list[i].hidden = true;
      }
    }
    STORE.list.rating.filter(filterBy)
  } )
}

// detailed view function, event listener on click of LI to expand into detailed view, should work in
// both filtered and non-filtered views

// delete function, event listener on click to delete bookmark

// render funtion - pretty important!

function renderTheBookmarkApp() {
  listenToAddBookmark();
}