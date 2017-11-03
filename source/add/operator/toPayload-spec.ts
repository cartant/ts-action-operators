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
import { Foo } from "../../foobar-spec";
import { observe } from "../../observe-spec";

import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/toArray";
import "./ofType";
import "./toPayload";

describe("Observable.prototype.toPayload", () => {

    it("should obtain the payload", observe(() => {
        return Observable.of<Action>(new Foo())
            .ofType(Foo)
            .toPayload()
            .toArray()
            .do(array => expect(array).to.deep.equal([{ foo: 42 }]));
    }));
});
