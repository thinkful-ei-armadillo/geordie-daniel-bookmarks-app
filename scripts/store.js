'use strict';
/* global $ STORE */

const STORE = (function() {

  // list array in STORE contains objects for each bookmark in this format:
  // { id: 1, title:'article on cats', description: 'I like cats', url: 'ilikecats.com', rating: 5, expanded: true  }

  const addItem = function(item) {
    this.list.push(item);
  };

  const findById = function(id) {
     
    return this.list.find(list => list.id === id);
  };

  const setExpanded = function(id) {
    this.expanded = id;
  };

  return {
    list: [ ],
    addItem,
    setExpanded,
    expanded: null,
    errorHandling: false,
    findById
  };
}());