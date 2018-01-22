/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs/Observable";
import { toPayload as higherOrder } from "../toPayload";

export function toPayload<A extends { payload: {} }>(this: Observable<A>): Observable<A["payload"]> {
    return higherOrder<A>()(this);
}
