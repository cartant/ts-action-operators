/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs/Observable";
import { ActionWithPayload } from "ts-action";
import { toPayload as higherOrder } from "../toPayload";

export function toPayload<T extends string, P>(this: Observable<ActionWithPayload<T, P>>): Observable<P> {
    return higherOrder<T, P>()(this);
}
