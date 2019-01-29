'use strict';
/* global $ STORE api */

$(document).ready( function(event) {
  console.log(bookmarks);
  bookmarks.bindListeners();
  api.getItems()
    .then((items) => {
      items.forEach((item) => STORE.list.addItem(item));
      
      bookmarks.bindListeners();
      
    });
  

});