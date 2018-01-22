/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs/Observable";
import { toPayload } from "../../operator/toPayload";

Observable.prototype.toPayload = toPayload;

declare module "rxjs/Observable" {
    interface Observable<T> {
        toPayload: typeof toPayload;
    }
}
