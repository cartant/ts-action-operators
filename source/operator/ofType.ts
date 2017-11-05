/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs/Observable";
import {
    Action,
    ActionConstructor,
    ActionWithPayload,
    ActionWithPayloadConstructor,
    ActionWithPropsConstructor,
    ActionWithParamsConstructor,
    AnyAction,
    AnyActionConstructor
} from "ts-action";
import { ofType as higherOrder } from "../ofType";

export function ofType<T extends string, P>(this: Observable<AnyAction>, constructor: ActionWithPayloadConstructor<T, P>): Observable<ActionWithPayload<T, P>>;
export function ofType<T extends string, P extends object>(this: Observable<AnyAction>, constructor: ActionWithPropsConstructor<T, P>): Observable<Action<T> & P>;
export function ofType<T extends string, P extends object, V>(this: Observable<AnyAction>, constructor: ActionWithParamsConstructor<T, P, V>): Observable<Action<T> & P>;
export function ofType<T extends string>(this: Observable<AnyAction>, constructor: ActionConstructor<T>): Observable<Action<T>>;
export function ofType<T extends string>(this: Observable<AnyAction>, ...constructors: AnyActionConstructor[]): Observable<AnyAction>;
export function ofType<T extends string>(this: Observable<AnyAction>, ...constructors: AnyActionConstructor[]): Observable<AnyAction> {
    return higherOrder<T>(...constructors)(this);
}
