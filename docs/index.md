### Redux action operators with less TypeScript cruft.

Compose NgRx effects and redux-observable epics like this:

```ts
actions
  .ofType(Books.Search)
  .toPayload()
```

Instead of like this:

```ts
actions
  .ofType<Books.Search>(Books.BookActionTypes.SEARCH)
  .map(action => action.payload)
```