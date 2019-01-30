'use strict';
/* global $ STORE api bookmarks */

$(document).ready( function() {
    
  bookmarks.bindListeners();
  bookmarks.render();
  
  api.getItems()
    .then((items) => {
      items.forEach((item) => {
        STORE.addItem(item);
        bookmarks.render();
      });
    });
  
});