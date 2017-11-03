### Redux action operators with less TypeScript cruft

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

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/jZB4ja6SvwGUN4ibgYVgUVYV/cartant/ts-action-operators'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/jZB4ja6SvwGUN4ibgYVgUVYV/cartant/ts-action-operators.svg' />
</a>