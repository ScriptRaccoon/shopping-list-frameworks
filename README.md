# Shopping List made with several JS frameworks

The same shopping list SPA coded with several JavaScript frameworks in order to compare them.

- Vanilla JavaScript (https://shopping-list-made-with-vanilla-js.netlify.app)
- Svelte (https://shopping-list-made-with-svelte.netlify.app)
- React (https://shopping-list-made-with-react.netlify.app)
- Vue (https://shopping-list-made-with-vue.netlify.app)

In each case the app has the following features:

1. component structure: App -> (Header, List -> Item)
2. button to add an item
3. focus on the input field of the new item
4. ability to change name of item
5. showing list of items - when there is at least one, otherwise show text 'add items'
6. button to delete the whole list after confirm - showing when there is at least one item
7. button to delete an item
8. buy button to buy/unbuy an item, which also toggles its icon
9. bought items are greyed out and their name cannot be edited
10. load items from local storage
11. automatic save items to local storage, debounced, when any change happens
12. several CSS styles and aria-labels for a11y