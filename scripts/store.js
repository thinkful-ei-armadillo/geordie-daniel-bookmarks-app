'use strict';
/* global $ STORE */

const STORE = (function() {

  // list array in STORE contains objects for each bookmark in this format:
  // { id: 1, title:'article on cats', description: 'I like cats', url: 'ilikecats.com', rating: 5, expanded: true  }

  const addItem = function(item) {
    this.list.push(item);
  };

  const adding = function(boolean) {
    return boolean;
  };

  const expanded = function(id, boolean) {
    const selectedItem = STORE.list.findById(id);
    selectedItem.expanded = boolean; //make sure to toggle back at some point
  };

  return {
    list: [],
    addItem,
    adding,
    expanded,
    hidden: false,
  };
}());