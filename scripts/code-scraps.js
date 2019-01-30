'use strict';

// detailview scraps

$(event.currentTarget).toggleClass('selected');
$('.description').toggleClass('hidden');
$('.bookmark-link').toggleClass('hidden');
$('.delete-bookmark').toggleClass('hidden');

$('.bookmark-list').closest('li').html(`
      <li class="bookmark-li" id="${currentItem.id}">
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
            <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
            <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
            <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
            <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
            <img src="https://image.flaticon.com/icons/svg/149/149220.svg" for="star rating empty">
          </div>
        </li>
      `);


// work on if statement inside render- scrapped for if statement in
// htmlTheBookmark

if ( items.expand ) {
  $('.bookmark-li').html(`
  <li class="bookmark-li" id="${items.id}">
      <h3 class="bookmark-title">${items.title}</h3>
      <p class="description hidden">
        ${items.desc}
      </p>
      <a href=${items.url}><button class="bookmark-link hidden">
        Visit Site
      </button></a>
      <button class="delete-bookmark hidden">Delete</button>
      <div class="rating-view">
        ${items.rating}
        <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
        <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
        <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
        <img src="https://image.flaticon.com/icons/svg/148/148839.svg" for="star rating gold">
        <img src="https://image.flaticon.com/icons/svg/149/149220.svg" for="star rating empty">
      </div>
    </li>
  `);
}

// getItemIdFromElement - worked in shopping list, may work here.

const getItemIdFromElement = function(item) {
  return $(item)
    .closest('.js-item-element')
    .data('item-id');
};

