# ts-action-operators

[![NPM version](https://img.shields.io/npm/v/ts-action-operators.svg)](https://www.npmjs.com/package/ts-action-operators)
[![Build status](https://img.shields.io/travis/cartant/ts-action-operators.svg)](http://travis-ci.org/cartant/ts-action-operators)
[![dependency status](https://img.shields.io/david/cartant/ts-action-operators.svg)](https://david-dm.org/cartant/ts-action-operators)
[![devDependency Status](https://img.shields.io/david/dev/cartant/ts-action-operators.svg)](https://david-dm.org/cartant/ts-action-operators#info=devDependencies)
[![peerDependency Status](https://img.shields.io/david/peer/cartant/ts-action-operators.svg)](https://david-dm.org/cartant/ts-action-operators#info=peerDependencies)

### What is it?

The `ts-action-operators` package contains RxJS operators for action observables.

### Why might you need it?

I created the [`ts-action`](https://github.com/cartant/ts-action) package because I wanted a mechanism for declaring and consuming actions that involved writing as little boilerplate as possible. And I created this package so that I could apply the TypeScript narrowing mechanisms in `ts-action` to the composition of NgRx effects and redux-observable epics.

If you, too, want less cruft in your effects or epics, you might find this package useful.

## Install

Install the package using npm:

```
npm install ts-action-operators --save-dev
```

## Usage

The package includes operators for filtering and narrowing actions and for selecting strongly typed payloads. The operators can be used in NgRx effects or redux-observable epics, like this:

```ts
import { ofType, toPayload } from "ts-action-operators";
const epic = actions => actions.pipe(
  ofType(Foo),
  toPayload(),
  tap(payload => console.log(payload.foo)),
  ...
);
```

The lettable/pipeable operators are recommended, but the package also includes prototype-patching versions that can be imported and used like this:

```ts
import "ts-action-operators/add/operator/ofType";
import "ts-action-operators/add/operator/toPayload";
const epic = actions => actions
  .ofType(Foo)
  .toPayload()
  .do(payload => console.log(payload.foo))
  ...
```

## API

* [ofType](#ofType)
* [toPayload](#toPayload)

<a name="ofType"></a>

### ofType

The `ofType` operator can be passed `ts-action`-declared action creators. The operator will remove unwanted actions from the observable stream.

If only a single action creator is specified, the action's type will be narrowed. For example:

```ts
.pipe(
  ofType(Foo),
  tap(action => {
    // Here, TypeScript has narrowed the type, so the action is strongly typed
    // and individual properties can be accessed in a type-safe manner.
  })
)
```

```ts
.pipe(
  ofType(Foo, Bar),
  tap(action => {
    // Here, the action has not been narrowed, so isType needs to be used to
    // narrow the action.
    if (isType(action, Foo)) {
      // Here, the action has been narrowed to a FOO action.
    } else if (isType(action, Bar)) {
      // Here, the action has been narrowed to a BAR action.
    }
  })
)
```

<a name="toPayload"></a>

### toPayload

The `toPayload` operator takes no parameters. It can be applied to an obserable stream that emits narrowed actions that contain payloads. For example:

```ts
.pipe(
  ofType(Foo),
  toPayload()
  tap(payload => {
    // Here, TypeScript has narrowed the type, so the payload is strongly typed
    // and individual properties can be accessed in a type-safe manner.
  })
)
```