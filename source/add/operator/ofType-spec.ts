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
import { Action } from "ts-action";
import { usingBase, usingEmpty, usingPayload, usingProps } from "../../foobar-spec";
import { observe } from "../../observe-spec";

import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toArray";
import "./ofType";

describe("Observable.prototype.ofType", () => {

    describe("base", () => {

        const Bar = usingBase.Bar;
        const Foo = usingBase.Foo;

        it("should filter actions matching a single type", observe(() => {
            return Observable.of<Action<string>>(new Foo(42), new Bar(56))
                .ofType(Foo)
                .map(action => action.foo)
                .toArray()
                .do(array => expect(array).to.deep.equal([42]));
        }));
    });

    describe("empty", () => {

        const Bar = usingEmpty.Bar;
        const Foo = usingEmpty.Foo;

        it("should filter actions matching a single type", observe(() => {
            return Observable.of<Action<string>>(new Foo(), new Bar())
                .ofType(Foo)
                .map(action => action.type)
                .toArray()
                .do(array => expect(array).to.deep.equal(["[foobar] FOO"]));
        }));
    });

    describe("payload", () => {

        const Bar = usingPayload.Bar;
        const Foo = usingPayload.Foo;

        it("should filter actions matching a single type", observe(() => {
            return Observable.of<Action<string>>(new Foo({ foo: 42 }), new Bar({ bar: 56 }))
                .ofType(Foo)
                .map(action => action.payload.foo)
                .toArray()
                .do(array => expect(array).to.deep.equal([42]));
        }));
    });

    describe("props", () => {

        const Bar = usingProps.Bar;
        const Foo = usingProps.Foo;

        it("should filter actions matching a single type", observe(() => {
            return Observable.of<Action<string>>(new Foo({ foo: 42 }), new Bar({ bar: 56 }))
                .ofType(Foo)
                .map(action => action.foo)
                .toArray()
                .do(array => expect(array).to.deep.equal([42]));
        }));
    });
});
