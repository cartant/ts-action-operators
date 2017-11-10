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
import { usingPayload } from "../../foobar-spec";
import { observe } from "../../observe-spec";

import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toArray";
import "../../../dist/add/operator/ofType";
import "../../../dist/add/operator/toPayload";

describe("Observable.prototype.toPayload", () => {

    const Bar = usingPayload.Bar;
    const Foo = usingPayload.Foo;

    it("should obtain the payload", observe(() => {
        return Observable.of<Action<string>>(new Foo({ foo: 42 }))
            .ofType(Foo)
            .toPayload()
            .toArray()
            .do(array => expect(array).to.deep.equal([{ foo: 42 }]));
    }));
});
