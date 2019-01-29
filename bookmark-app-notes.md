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
  * All bookmarks in the list default to a "condensed" view showing only title    and rating

3. I can click on a bookmark to display the "detailed" view
  * DEtailed view additionally contains decription and a "visit site" link

4. I can remove bookmarks from my bookmark list

5. I receive appropriate server feedback when I cannot add/update a bookmark
  * See API validations

6. I can select from a dropdown a "minimum rating" to filter the lists by all       bookmarks rated equal or above the selected rating


