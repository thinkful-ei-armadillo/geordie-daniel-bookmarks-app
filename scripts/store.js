'use strict';
/* global $ STORE */

const STORE = (function() {

  // list array in STORE contains objects for each bookmark in this format:
  // { id: 1, title:'article on cats', description: 'I like cats', url: 'ilikecats.com', rating: 5, expanded: true  }

  const addItem = function(item) {
    this.list.push(item);
  };

  const findById = function(id) {
    console.log(id); 
    return this.list.find(list => list.id === id);
  };

  const setExpanded = function(id) {
    // const selectedItem = STORE.findById(id);

    this.expanded = id;

    console.log(this.expanded);
    // bookmarks.render();
  };

  return {
    list: [ ],
    addItem,
    setExpanded,
    expanded: null,
    hidden: false,
    findById
  };
}());