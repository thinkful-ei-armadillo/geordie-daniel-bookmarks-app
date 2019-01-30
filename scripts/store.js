'use strict';
/* global $ STORE */

const STORE = (function() {

  // list array in STORE contains objects for each bookmark in this format:
  // { id: 1, title:'article on cats', description: 'I like cats', url: 'ilikecats.com', rating: 5, expanded: true  }

  const addItem = function(item) {
    this.list.push(item);
  };

  const findById = function(id) {
    console.log(`find by id has found ${id}`);
    return STORE.list.find(list => list.id === id);
  };

  const expanded = function(id) {
    const selectedItem = STORE.findById(id);
    selectedItem.expand = !selectedItem.expand;
  };

  return {
    list: [ ],
    addItem,
    expanded,
    hidden: false,
    findById
  };
}());