/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */
/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
import { of } from "rxjs/observable/of";
import { map } from "rxjs/operators/map";
import { tap } from "rxjs/operators/tap";
import { toArray } from "rxjs/operators/toArray";
import { Action, isType } from "ts-action";
import { Foo, Bar, Baz, Daz, Par, Rar, Woo, Zoo } from "./foobar-spec";
import { observe } from "./observe-spec";
import { ofType } from "./ofType";

describe("ofType", () => {

    describe("declared actions", () => {

        it("should filter actions matching a single type", observe(() => {
            return of<Action>(new Woo({ woo: 42 }), new Zoo()).pipe(
                ofType(Woo),
                map(action => action.payload.woo),
                toArray(),
                tap(array => expect(array).to.deep.equal([42]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<Action>(new Woo({ woo: 42 }), new Zoo()).pipe(
                ofType(Woo, Zoo),
                map(action => isType(action, Woo) ? action.payload.woo : null),
                toArray(),
                tap(array => expect(array).to.deep.equal([42, null]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<Action>(new Woo({ woo: 42 })).pipe(
                ofType(Zoo),
                map(action => null),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });

    describe("generated actions with payloads", () => {

        it("should filter actions matching a single type", observe(() => {
            return of<Action>(new Foo(), new Bar({ bar: 56 })).pipe(
                ofType(Foo),
                map(action => action.payload.foo),
                toArray(),
                tap(array => expect(array).to.deep.equal([42]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<Action>(new Foo(), new Bar({ bar: 56 })).pipe(
                ofType(Foo, Bar),
                map(action => isType(action, Foo) ? action.payload.foo : isType(action, Bar) ? action.payload.bar : null),
                toArray(),
                tap(array => expect(array).to.deep.equal([42, 56]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<Action>(new Foo()).pipe(
                ofType(Bar),
                map(action => action.payload.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });

    describe("generated actions with props", () => {

        it("should filter actions matching a single type", observe(() => {
            return of<Action>(new Baz(), new Daz({ daz: 56 })).pipe(
                ofType(Baz),
                map(action => action.baz),
                toArray(),
                tap(array => expect(array).to.deep.equal([42]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<Action>(new Baz(), new Daz({ daz: 56 })).pipe(
                ofType(Baz, Daz),
                map(action => isType(action, Baz) ? action.baz : isType(action, Daz) ? action.daz : null),
                toArray(),
                tap(array => expect(array).to.deep.equal([42, 56]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<Action>(new Baz()).pipe(
                ofType(Daz),
                map(action => action.daz),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });

    describe("generated actions with props using params", () => {

        it("should filter actions matching a single type", observe(() => {
            return of<Action>(new Par(42), new Rar(56)).pipe(
                ofType(Par),
                map(action => action.par),
                toArray(),
                tap(array => expect(array).to.deep.equal([42]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<Action>(new Par(42), new Rar(56)).pipe(
                ofType(Par, Rar),
                map(action => isType(action, Par) ? action.par : isType(action, Rar) ? action.rar : null),
                toArray(),
                tap(array => expect(array).to.deep.equal([42, 56]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<Action>(new Par(42)).pipe(
                ofType(Rar),
                map(action => action.rar),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });
});
