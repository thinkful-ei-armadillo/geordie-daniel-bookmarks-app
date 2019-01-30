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

      // const bookmarkObjData = $(this).serializeJson();

      // console.log(bookmarkObjData.rating);

      const bookmarkObj = Item.create(bookmarkTitle, bookmarkUrl, 
        bookmarkDesc, bookmarkRating);

      console.log(bookmarkObj);
      console.log(STORE.list);

      STORE.list.push(bookmarkObj);
      api.createItem(bookmarkTitle, bookmarkUrl, bookmarkDesc, bookmarkRating);
      
      // create HTML bookmark with new stored values
      render();

      // reload standard main view once submit completes
      $('.js-main-view').html(`
        <button class="add-bookmark-button" value="Add Bookmark">Add Bookmark</button>
          <select id="filter-rating" name="filter" value="Minimum Rating">
              <option value="">Minimum Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <button class="clear-all js-clear-all">Clear All Bookmarks</button>`);
    } );
  };

  // translate bookmark into HTML
  const htmlTheBookmark = function(bookmark){
    if ( STORE.expanded === bookmark.id ) {
      console.log( 'if statement for expanded id works' );
      return `
      <div class="bookmark-item-wrapper js-bookmark-item-wrapper">
        <li class="bookmark-li" id="${bookmark.id}">
          <h3 class="bookmark-title">${bookmark.title}</h3>
          <p class="description">
            ${bookmark.desc}
          </p>
          <a href=${bookmark.url}><button class="bookmark-link">
            Visit Site
          </button></a>
          <button class="delete-bookmark">Delete</button>
          <div class="rating-view">
            ${ratingRender(bookmark.rating)}
          </div>
          <button for="expand" class="close-button js-close">-</button>
        </li>
      </div>
      `;
    }
    else {
      return `
      <div class="bookmark-item-wrapper">
          <li class="bookmark-li" id="${bookmark.id}">
          <h3 class="bookmark-title">${bookmark.title}</h3>
          <div class="rating-view">
          ${ratingRender(bookmark.rating)}
          </div>
          <button for="expand" class="expand-button js-expand">+</button>
        </li>
        </div>
            `;}
  };

  // rating handling function

  const ratingRender = function(rating) {
    if ( rating === 5 ) {
      return `<img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
      <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
      <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
      <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
      <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">`;
    }
    else if ( rating === 4 ) {
      return `
      <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
                    <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
                    <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
                    <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
                    <img src="https://image.flaticon.com/icons/svg/149/149220.svg" for="star rating empty">`;
    }
    else if ( rating === 3 ) {
      return `<img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
      <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
      <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
      <img src="https://image.flaticon.com/icons/svg/149/149220.svg" for="star rating empty">
      <img src="https://image.flaticon.com/icons/svg/149/149220.svg" for="star rating empty">`;
    }
    else if ( rating === 2 ) {
      return `<img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
      <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
      <img src="https://image.flaticon.com/icons/svg/149/149220.svg" for="star rating empty">
      <img src="https://image.flaticon.com/icons/svg/149/149220.svg" for="star rating empty">
      <img src="https://image.flaticon.com/icons/svg/149/149220.svg" for="star rating empty">`;
    }
    else if ( rating === 1 ) {
      return `<img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
      <img src="https://image.flaticon.com/icons/svg/149/149220.svg" for="star rating empty">
      <img src="https://image.flaticon.com/icons/svg/149/149220.svg" for="star rating empty">
      <img src="https://image.flaticon.com/icons/svg/149/149220.svg" for="star rating empty">
      <img src="https://image.flaticon.com/icons/svg/149/149220.svg" for="star rating empty">`;
    }
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
    } );
  };

  // detailed view function, event listener on click of LI to expand into detailed view, should work in
  // both filtered and non-filtered views

  const detailView = function() {
    $('.js-bookmark-list').on('click', '.js-expand', function(event) {
      if ( STORE.expanded === null ) {
        event.preventDefault();
        console.log('expand button clicked');

        const id = $(event.currentTarget).parents('li').attr('id');
        const currentItem = STORE.findById(id);

        console.log(currentItem);

        STORE.setExpanded(currentItem.id);
        console.log(STORE.expanded);
        // $('.js-expand').toggleClass('js-expand', true);
        render();
        detailViewClosed();
      }
    });
  };

  const detailViewClosed = function() {
    if ( STORE.expanded !== null ) {
      console.log( 'close it up' );
      $('.js-bookmark-list').on('click', '.js-close', function(event) {
        event.preventDefault();
        console.log( 'close it up' );
        // set expanded back to null after expanded in render
        STORE.setExpanded(null);
        // re-render as closed
        render();
      });
    }
  };

  // delete function, event listener on click to delete bookmark

  const deleteBookmark = function() {
    $('.js-bookmark-list').on('click', '.delete-bookmark', function(event) {
      console.log('delete button is running');
      event.preventDefault();
      const currentItem = $(event.currentTarget).closest('li').attr('id');
      console.log(currentItem);
      $(event.currentTarget).closest('li').remove();
      const currentItemInStore = STORE.findById(currentItem);
      STORE.list.splice(STORE.list.indexOf(currentItemInStore), 1);
      api.deleteItem(currentItem);
      render();
    });
  };

  const clearAllBookmarks = function() {
    $('.js-main-view').on( 'click', '.js-clear-all', function() {
      for ( let i = 0; i , STORE.list.length; i++ ){
        const deletionId = STORE.list[i].id;
        // STORE.findById(deletionId).splice(STORE.list.indexOf(deletionId), 1);
        api.deleteItem(deletionId);
        render();
      }
    });
  };

  // render function tying things together based upon store booleans

  const render = function() {
    console.log('`render` ran');

    let items = [...STORE.list];

    console.log(items);

    if ( items.hidden ) {
      items = items.filter(item => !item.hidden);
    }
    if ( items.rating <= $('#filter-rating').val() ) {
      items = items.filter(item => item.rating.includes(this));
    }
    const bookmarkElements= [];

    for ( let i = 0; i < (items.length); i++ ) {
      bookmarkElements.push(htmlTheBookmark( items[i] ));
    }
    $('.js-bookmark-list').html(bookmarkElements);
  };

  const bindListeners = function() {
    listenToAddBookmark();
    detailView();
    // detailViewClosed();
    filterByRating();
    deleteBookmark();
    clearAllBookmarks();
  };

  return {
    render: render,
    bindListeners: bindListeners
  };

}());