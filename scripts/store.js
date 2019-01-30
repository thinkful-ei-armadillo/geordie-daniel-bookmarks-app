'use strict';
/* global $ STORE */

const STORE = (function() {

  // list array in STORE contains objects for each bookmark in this format:
  // { id: 1, title:'article on cats', description: 'I like cats', url: 'ilikecats.com', rating: 5, expanded: true  }

  const addItem = function(item) {
    this.list.push(item);
  };

  const findById = function(id) {
    return function (list) {
      for ( let i = 0; i < STORE.list; i++ ) {
        if ( list[i].id === id ) {
          console.log(list[i]);
          console.log(`find by id has found ${id} at ${list[i]}`);
          return list[i];
        }
      }
    };
  };

  const expanded = function(id) {
    const selectedItem = STORE.findById(id);
    console.log(selectedItem);
    console.log(selectedItem.expand);
    selectedItem.expand = !selectedItem.expand;
    console.log(selectedItem.expand);
  };

  return {
    list: [ ],
    addItem,
    expanded,
    hidden: false,
    findById
  };
}());