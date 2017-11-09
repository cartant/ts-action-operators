/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs/Observable";
import { Action, ActionCreator } from "ts-action";
import { ofType as higherOrder } from "../ofType";

export function ofType<T extends string, A extends Action<string>>(this: Observable<Action<string>>, creator: ActionCreator<T, A>): Observable<A>;
export function ofType(this: Observable<Action<string>>, first: ActionCreator<string, Action<string>>, second: ActionCreator<string, Action<string>>, ...others: ActionCreator<string, Action<string>>[]): Observable<Action<string>>;
export function ofType(this: Observable<Action<string>>, ...creators: ActionCreator<string, Action<string>>[]): Observable<Action<string>> {
    if (creators.length === 1) {
        const [creator] = creators;
        return higherOrder(creator)(this);
    }
    const [first, second, ...others] = creators;
    return higherOrder(first, second, ...others)(this);
}
