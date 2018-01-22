/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";

export function toPayload<A extends { payload: {} }>(): (source: Observable<A>) => Observable<A["payload"]> {
    return map(action => action.payload);
}
