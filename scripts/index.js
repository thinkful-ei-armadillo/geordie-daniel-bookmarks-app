'use strict';
/* global $ STORE api bookmarks */

$(document).ready( function(event) {
  console.log(bookmarks);
  bookmarks.bindListeners();
  api.getItems()
    .then((items) => {
      items.forEach((item) => STORE.addItem(item));
      
      bookmarks.bindListeners();
      
    });
  

});