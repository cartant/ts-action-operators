/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */
/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
import { of } from "rxjs/observable/of";
import { map } from "rxjs/operators/map";
import { tap } from "rxjs/operators/tap";
import { toArray } from "rxjs/operators/toArray";
import { action, Action, props, isType } from "ts-action";
import { usingBase, usingEmpty, usingPayload, usingProps } from "./foobar-spec";
import { observe } from "./observe-spec";
import { ofType } from "../dist/ofType";

describe("ofType", () => {

    describe("base", () => {

        const Bar = usingBase.Bar;
        const Foo = usingBase.Foo;

        it("should filter actions matching a single type", observe(() => {
            return of<Action<string>>(new Foo(42), new Bar(56)).pipe(
                ofType(Foo),
                map(action => action.foo),
                toArray(),
                tap(array => expect(array).to.deep.equal([42]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<Action<string>>(new Foo(42), new Bar(56)).pipe(
                ofType({ Foo, Bar }),
                map(action => (action.type === Foo.type) ? action.foo : action.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([42, 56]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<Action<string>>(new Foo(42)).pipe(
                ofType(Bar),
                map(action => action.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });

    describe("empty", () => {

        const Bar = usingEmpty.Bar;
        const Foo = usingEmpty.Foo;

        it("should filter actions matching a single type", observe(() => {
            return of<Action<string>>(new Foo(), new Bar()).pipe(
                ofType(Foo),
                map(action => action.type),
                toArray(),
                tap(array => expect(array).to.deep.equal(["[foobar] FOO"]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<Action<string>>(new Foo(), new Bar()).pipe(
                ofType({ Foo, Bar }),
                map(action => action.type),
                toArray(),
                tap(array => expect(array).to.deep.equal(["[foobar] FOO", "[foobar] BAR"]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<Action<string>>(new Foo()).pipe(
                ofType(Bar),
                map(action => action.type),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });

    describe("payload", () => {

        const Bar = usingPayload.Bar;
        const Foo = usingPayload.Foo;

        it("should filter actions matching a single type", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 }), new Bar({ bar: 56 })).pipe(
                ofType(Foo),
                map(action => action.payload.foo),
                toArray(),
                tap(array => expect(array).to.deep.equal([42]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 }), new Bar({ bar: 56 })).pipe(
                ofType({ Foo, Bar }),
                map(action => (action.type === Foo.type) ? action.payload.foo : action.payload.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([42, 56]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 })).pipe(
                ofType(Bar),
                map(action => action.payload.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });

    describe("props", () => {

        const Bar = usingProps.Bar;
        const Foo = usingProps.Foo;

        it("should filter actions matching a single type", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 }), new Bar({ bar: 56 })).pipe(
                ofType(Foo),
                map(action => action.foo),
                toArray(),
                tap(array => expect(array).to.deep.equal([42]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 }), new Bar({ bar: 56 })).pipe(
                ofType({ Foo, Bar }),
                map(action => (action.type === Foo.type) ? action.foo : action.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([42, 56]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<Action<string>>(new Foo({ foo: 42 })).pipe(
                ofType(Bar),
                map(action => action.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });
});
