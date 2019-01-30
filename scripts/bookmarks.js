'use strict';
/* global Item $ STORE api bookmarks */

const bookmarks = (function() {

  // adding bookmark listener function, event listener on click of add bookmark to un-hide create bookmark form

  const listenToAddBookmark = function() {
    $('.js-main-view').on( 'click', '.add-bookmark-button', function(event) {
      event.preventDefault();
      console.log('add button triggered');
      $('.js-main-view').html(`
    <form class="create-bookmark-form js-create-bookmark-form">
    <input type="text" class="bookmark-title" name="title" placeholder="title" required>
    <input type="text" class="url-input" name="url" placeholder="website link" value="https://" required>
    <input type="text" class="description-input" name="description" placeholder="describe the site" required>
    <select id="rating-input" name="rating" value="Give a Rating" required>
      <option value="">Give a Rating</option>
      <option value="5">5 Stars</option>
      <option value="4">4 Stars</option>
      <option value="3">3 Stars</option>
      <option value="2">2 Stars</option>
      <option value="1">1 Star</option>
    </select>
    <input type="submit" class="create-submit" name="submit" value="Submit">
  </form>
    `);
      createBookmark();
    });
  };

  // create bookmark function, event listener on submit of form to put user data into store and API

  const createBookmark = function() {
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
      api.createItem(bookmarkTitle, bookmarkUrl, bookmarkDesc, bookmarkRating);

      htmlTheBookmark(bookmarkObj);
      $('.js-main-view').html(`
        <button class="add-bookmark-button" value="Add Bookmark">Add Bookmark</button>
          <select id="filter-rating" name="filter" value="Minimum Rating">
              <option value="">Minimum Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>`);
    } );
  };

  const htmlTheBookmark = function(bookmark){
    $('.bookmark-list').append(`
          <li class="bookmark-li">
        <h3 class="bookmark-title">${bookmark.title}</h3>
        <div class="rating-view">
          ${bookmark.rating}
        </div>
      </li>
          `);
    bindListeners();
  };

  // filter funtion, event listener on selection value of dropdown "minimum rating", only show certain LIs
  // replace this functionality by doing it in the new render function
  const filterByRating = function() {
    $('.js-main-view').on( 'change', '#filter-rating', function(event) {
      event.preventDefault();
      const filterBy = $('#filter-rating').val();
      console.log(filterBy);
      for ( let i = 0; i < STORE.list.length; i++ ){
        if ( STORE.list[i].rating < filterBy ) {
          STORE.list[i].hidden = true;
        }
      }
      // STORE.list.rating.filter(filterBy)
      bindListeners();
    } );
  };

  const getItemIdFromElement = function(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  };

  // detailed view function, event listener on click of LI to expand into detailed view, should work in
  // both filtered and non-filtered views

  const detailView = function() {
    $('.bookmark-list').on('click', '.bookmark-li', function(event) {
    // $(event.currentTarget).toggleClass('selected');
    // $('.description').toggleClass('hidden');
    // $('.bookmark-link').toggleClass('hidden');
    // $('.delete-bookmark').toggleClass('hidden');
      
      const id = $(event.currentTarget).closest('h3') ;
      const currentItem = STORE.findById(id);

      console.log(id);

      STORE.expanded(currentItem);

      $('.bookmark-list').closest('li').html(`
    <li class="bookmark-li">
        <h3 class="bookmark-title">${currentItem.title}</h3>
        <p class="description hidden">
          ${currentItem.desc}
        </p>
        <a href=${currentItem.url}><button class="bookmark-link hidden">
          Visit Site
        </button></a>
        <button class="delete-bookmark hidden">Delete</button>
        <div class="rating-view">
          ${currentItem.rating}
        </div>
      </li>
    `);
      bindListeners();
    });
  };

  // delete function, event listener on click to delete bookmark

  const deleteBookmark = function(id) {
    $('.bookmark-li').on('click', '.delete-bookmark', function(event) {
      event.preventDefault();
      const currentItem = $(event.currentTarget).findById(id);
      $(event.currentTarget).closest('li').remove();
      api.deleteItem(currentItem);

      // $('.bookmark-li').remove();
      bindListeners();
    });
  };

  // render function tying things together based upon store booleans

  const render = function() {
    console.log('`render` ran');
    let items = [...STORE.list];
    if (STORE.hidden) {
      items = items.filter(item => !item.hidden);
    }
    if (STORE.rating <= $('#filter-rating').val()) {
      items = items.filter(item => item.rating.includes(this));
    }
    
    for ( let i = 0; i < STORE.list.length; i++ ) {
      htmlTheBookmark(STORE.list[i]);
    }

  };

  const bindListeners = function() {
    listenToAddBookmark();
    detailView();
    filterByRating();
    deleteBookmark();
  };

  return {
    render: render,
    bindListeners: bindListeners
  };

}());