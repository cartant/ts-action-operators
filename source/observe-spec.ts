/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs";

export function observe<T>(observableTest: () => Observable<T>): (callbackTest: (error?: Error) => void) => void {
    return (callbackTest: (error?: Error) => void) => observableTest().subscribe(undefined, callbackTest, callbackTest);
}
