/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */
/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
import { of } from "rxjs/observable/of";
import { tap } from "rxjs/operators/tap";
import { toArray } from "rxjs/operators/toArray";
import { Action } from "ts-action";
import { usingPayload } from "./foobar-spec";
import { observe } from "./observe-spec";
import { ofType } from "./ofType";
import { toPayload } from "./toPayload";

describe("toPayload", () => {

    const Bar = usingPayload.Bar;
    const Foo = usingPayload.Foo;

    it("should obtain the payload", observe(() => {
        return of<Action<string>>(new Foo({ foo: 42 })).pipe(
            ofType(Foo),
            toPayload(),
            toArray(),
            tap(array => expect(array).to.deep.equal([{ foo: 42 }]))
        );
    }));
});
