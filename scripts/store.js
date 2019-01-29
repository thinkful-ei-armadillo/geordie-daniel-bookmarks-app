'use strict';
/* global $ STORE */

const STORE = function() {

  // list array in STORE contains objects for each bookmark in this format:
  // { id: 1, title:'article on cats', description: 'I like cats', url: 'ilikecats.com', rating: 5, expanded: true  }

  const list = [  ];

  const adding = function(boolean) {
    return boolean;
  };

  const expanded = function(id, boolean) {
    const selectedItem = list.findById(id);
    selectedItem.expanded = boolean;
  };

  return {
    list,
    adding,
    expanded
  };
};