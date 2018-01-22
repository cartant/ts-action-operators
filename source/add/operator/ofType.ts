/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs/Observable";
import { ofType } from "../../operator/ofType";

Observable.prototype.ofType = ofType;

declare module "rxjs/Observable" {
    interface Observable<T> {
        ofType: typeof ofType;
    }
}
