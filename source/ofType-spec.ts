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
import { AnyAction, isType } from "ts-action";
import { Foo, Bar, Baz, Daz } from "./foobar-spec";
import { observe } from "./observe-spec";
import { ofType } from "./ofType";

describe("ofType", () => {

    describe("actions with payloads", () => {

        it("should filter actions matching a single type", observe(() => {
            return of<AnyAction>(new Foo(), new Bar({ bar: 56 })).pipe(
                ofType(Foo),
                map(action => action.payload.foo),
                toArray(),
                tap(array => expect(array).to.deep.equal([42]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<AnyAction>(new Foo(), new Bar({ bar: 56 })).pipe(
                ofType(Foo, Bar),
                map(action => isType(action, Foo) ? action.payload.foo : isType(action, Bar) ? action.payload.bar : null),
                toArray(),
                tap(array => expect(array).to.deep.equal([42, 56]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<AnyAction>(new Foo()).pipe(
                ofType(Bar),
                map(action => action.payload.bar),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });

    describe("actions with props", () => {

        it("should filter actions matching a single type", observe(() => {
            return of<AnyAction>(new Baz(), new Daz({ daz: 56 })).pipe(
                ofType(Baz),
                map(action => action.baz),
                toArray(),
                tap(array => expect(array).to.deep.equal([42]))
            );
        }));

        it("should filter actions matching multiple types", observe(() => {
            return of<AnyAction>(new Baz(), new Daz({ daz: 56 })).pipe(
                ofType(Baz, Daz),
                map(action => isType(action, Baz) ? action.baz : isType(action, Daz) ? action.daz : null),
                toArray(),
                tap(array => expect(array).to.deep.equal([42, 56]))
            );
        }));

        it("should filter actions not matching a type", observe(() => {
            return of<AnyAction>(new Baz()).pipe(
                ofType(Daz),
                map(action => action.daz),
                toArray(),
                tap(array => expect(array).to.deep.equal([]))
            );
        }));
    });
});
