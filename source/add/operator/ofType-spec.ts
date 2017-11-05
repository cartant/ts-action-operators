/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */
/*tslint:disable:no-unused-expression*/
/*tslint:disable:rxjs-no-add*/
/*tslint:disable:rxjs-no-patched*/

import { expect } from "chai";
import { Observable } from "rxjs/Observable";
import { AnyAction } from "ts-action";
import { Foo, Bar, Baz, Daz } from "../../foobar-spec";
import { observe } from "../../observe-spec";

import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toArray";
import "./ofType";

describe("Observable.prototype.ofType", () => {

    describe("actions with payloads", () => {

        it("should filter actions matching a single type", observe(() => {
            return Observable.of<AnyAction>(new Foo(), new Bar({ bar: 56 }))
                .ofType(Foo)
                .map(action => action.payload.foo)
                .toArray()
                .do(array => expect(array).to.deep.equal([42]));
        }));
    });

    describe("actions with props", () => {

        it("should filter actions matching a single type", observe(() => {
            return Observable.of<AnyAction>(new Baz(), new Daz({ daz: 56 }))
                .ofType(Baz)
                .map(action => action.baz)
                .toArray()
                .do(array => expect(array).to.deep.equal([42]));
        }));
    });
});
