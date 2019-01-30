'use strict';
/* global $ STORE api */

// list array in API contains objects for each bookmark in this format:
// { id: 1, title:'article on cats', description: 'I like cats', url: 'ilikecats.com', rating: 5  }
// expanded state gets added in STORE

const api = (function() {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/geordie-daniel';

  const listApiFetch =  function(...args) {
    return fetch( ...args )
      .then(res => {
        if (!res.ok) STORE.errorHandling = true;
        return res.json();
      })
      .then(data => {
        if (STORE.errorHandling) throw new Error(data.message);
        return data;
      })
      .catch( err => alert(err.message));
  };
  
  
  const getItems = function(){
    return listApiFetch( `${BASE_URL}/bookmarks` );
  };

  const createItem = function(title, url, desc, rating) {
    const newItem = JSON.stringify({
      id: STORE.id,
      title: title,
      url: url,
      desc: desc,
      rating: rating
    });
    console.log(newItem);
    return listApiFetch( `${BASE_URL}/bookmarks`, { 
      method: 'POST', 
      headers: new Headers({ 'Content-Type': 'application/json' }), 
      body: newItem } );
  };

  // saving this for later - may need for extension goal

  // const updateItem = function( id, updateData ) {
  //   return listApiFetch( `${BASE_URL}/bookmarks/${id}`, {
  //     method: 'PATCH',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify( updateData )
  //   } );
  // };
  
  const deleteItem = function (id){
    return listApiFetch( `${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE',
    });
  };
  return {
    getItems: getItems,
    createItem: createItem,
    // updateItem: updateItem,
    deleteItem: deleteItem
  };

}());