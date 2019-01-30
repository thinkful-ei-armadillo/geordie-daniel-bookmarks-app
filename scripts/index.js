'use strict';
/* global $ STORE api bookmarks */

$.fn.extend({
  serializeJson: function() {
    const formData = new FormData(this[0]);
    console.log(formData);
    const o = {};
    formData.forEach((val, name) => (o[name] = val));
    return JSON.stringify(o);
  }
});


$(document).ready( function() {

  console.log(bookmarks);
  
  bookmarks.bindListeners();
  bookmarks.render();
  
  api.getItems()
    .then((items) => {
      items.forEach((item) => {
        // console.log(item);
        STORE.addItem(item);
        // console.log(STORE.list);
        bookmarks.render();
      });
    });
  
});