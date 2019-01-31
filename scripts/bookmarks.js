'use strict';
/* global $ STORE api bookmarks */

const bookmarks = (function() {

  // adding bookmark listener function, event listener on click of add bookmark to un-hide create bookmark form

  const listenToAddBookmark = function() {
    $('.js-main-view').on( 'click', '.add-bookmark-button', function(event) {
      event.preventDefault();
      
      editingViewRender();
      
      createBookmark();
    });
  };

  const editingViewRender = function() {
    return `<form class="create-bookmark-form js-create-bookmark-form" for="creating a new bookmark">
    <input type="text" class="bookmark-title" name="title" placeholder="title" for="bookmark title" required>
    <input type="text" class="url-input" name="url" for="website link" value="https://" required>
    <input type="text" class="description-input" name="description" for="website description" placeholder="description" required>
    <select id="rating-input" name="rating" for="selecting a rating for your bookmark" value="Give a Rating" required>
      <option value="" for="placeholder selection">Give a Rating</option>
      <option value="5" for="select 5 Stars rating">5 Stars</option>
      <option value="4" for="select 4 Stars rating">4 Stars</option>
      <option value="3" for="select 3 Stars rating">3 Stars</option>
      <option value="2" for="select 2 Stars rating">2 Stars</option>
      <option value="1" for="select 1 Stars rating">1 Star</option>
    </select>
    <input type="submit" class="create-submit" name="submit" for="submitting the form" value="Submit">
  </form>`;
  };

  const mainViewRender = function() {
    return `
        <button class="add-bookmark-button" value="Add Bookmark">Add Bookmark</button>
          <select id="filter-rating" name="filter" value="Minimum Rating">
              <option value="">Minimum Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
      `;
  };

  // create bookmark function, event listener on submit of form to put user data into store and API

  const createBookmark = function() {
    $('.js-main-view').on('submit', '.js-create-bookmark-form', function(event) {
      event.preventDefault();

      const bookmarkTitle = $('.bookmark-title').val();
      const bookmarkUrl = $('.url-input').val();
      const bookmarkDesc = $('.description-input').val();
      const bookmarkRating = $('#rating-input').val();

      api.createItem(bookmarkTitle, bookmarkUrl, bookmarkDesc, bookmarkRating)
        .then( response => {
          STORE.list.push(response);
          render();
        } );

      // reload standard main view once submit completes
      mainViewRender();
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
          <a href=${bookmark.url} target="_blank"><button class="bookmark-link">
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

  const filterByRating= function(rating){
    for (let i = 0; i < STORE.list.length; i++){
      if(STORE.list[i].rating <= rating-1){
        STORE.list[i].hidden = true;
        console.log(STORE.list[i]);
      }
      else{
        STORE.list[i].hidden = false;
      }
    }
  };


  // filter funtion, event listener on selection value of dropdown "minimum rating", only show certain LIs
  // replace this functionality by doing it in the new render function
  const handleFilter = function() {
    $('.js-main-view').on( 'change', '#filter-rating', function(event) {
      event.preventDefault();
      const filterBy = $('#filter-rating').val();
      
      filterByRating(filterBy);
      render();
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

        STORE.setExpanded(currentItem.id);

        render();
        detailViewClosed();
      }
    });
  };

  const detailViewClosed = function() {
    if ( STORE.expanded !== null ) {

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
      
      event.preventDefault();

      const currentItem = $(event.currentTarget).closest('li').attr('id');
      console.log(currentItem);

      // $(event.currentTarget).closest('li').remove();

      const currentItemInStore = STORE.findById(currentItem);

      api.deleteItem(currentItem)
        .then( () => {
          STORE.expanded = null;
          STORE.list.splice(STORE.list.indexOf(currentItemInStore), 1);
          render();
        });
    });
  };

  // render function tying things together based upon store booleans

  const render = function() {

    let items = [...STORE.list];
    
    items = items.filter(item => !item.hidden);

    const bookmarkElements= [];

    for ( let i = 0; i < (items.length); i++ ) {
      bookmarkElements.push(htmlTheBookmark( items[i] ));
    }
    $('.js-bookmark-list').html(bookmarkElements);
  };

  const bindListeners = function() {
    listenToAddBookmark();
    detailView();
    ratingRender();
    handleFilter();
    deleteBookmark();
  };

  return {
    render: render,
    bindListeners: bindListeners
  };

}());