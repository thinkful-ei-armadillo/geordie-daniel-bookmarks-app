# Bookmarks App Notes

1. Know your requirements
2. Create architecture or wireframe
3. Separate high-level design and low-level design
4. Code small, test early, test often
5. Communicate, communicate, communicate

## User Stories

1. I can add bookmarks to my bookmark list
⋅⋅* title (string)
⋅⋅* url link (string)
⋅⋅* description (string)
⋅⋅* rating (number, 1-5)

2. I can see a list of my bookmarks when I first open the app
  * All bookmarks in the list default to a "condensed" view showing only title and rating

3. I can click on a bookmark to display the "detailed" view
  * Detailed view additionally contains decription and a "visit site" link

4. I can remove bookmarks from my bookmark list

5. I receive appropriate server feedback when I cannot add/update a bookmark
  * See API validations

6. I can select from a dropdown a "minimum rating" to filter the lists by all bookmarks rated equal or above the selected rating


### Using .serializeArray() method

jQuery provides this method to convert form data into an array of objects with name and value keys
* this is not ideal for sending a standard JSON API request body
* we really want an object of key and value pairs that match our named form

solution
* use the native JS FormData API to construct our object
* *extend* jQuery objects with a new method

````js
function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}
````
* extend the above by adding a new method available on any jQuery objects using $.fn.extend:
````js
$.fn.extend({
  serializeJson: function() {
    const formData = new FormData(this[0]);    // 'this' is a jq object; [0] is native element
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }
});

function handleSubmit(e) {
  $(e.target).serializeJson();    
  // => '{"title":"Matrix","length":120,"studio":"WB"}'
}

````

## 2 minute presentation

Our bookmarks app is coming along well - we have achieved successful: 
* Bookmark creation
    * Switches the main view from "add bookmark" and "minimum rating" button/selections to a form to input new bookmark details.
    * Includes title, url, description, and rating fields
    * Switches main view back on submit
* Default condensed view
* API GETs
* API POSTs
* API DELETEs (in two forms, individual delete button and clear all bookmarks)

To Complete Today:
* ~~Fix issue with first JSON object printing twice~~
* Expand/detailed view
   * Originally attempted by using toggleClass( hidden ), but this would only work in one direction. Now attempting by re-rendering the selected item with our template function.
   * Ensure that it switches back to condensed view on re-click
* Filtered view with minimum rating
* Get "Visit Site" button/link working
* ~~Starring dynamically by reading current STORE.list.rating value and rendering appropriate number of stars accordingly.~~
* User-side feedback for error handling
* Beautify with CSS






ADD CORRECT SELECTOR TO HTML THE BOOKMARK

use serializeJson to get better form data handling

use 
const id = $(event.currentTarget).attr('id');
const currentItem = STORE.findById(id);


use button for expanding items?? easier to target for user, more accessible

also, use expanded in store to hold the id of current expanded item - makes it easier to change state and re-render!


for rating - just have different '.rating-view' section templates for each rating value within render














