/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs/Observable";
import { filter } from "rxjs/operators/filter";
import {
    Action,
    ActionConstructor,
    ActionWithPayload,
    ActionWithPayloadConstructor,
    ActionWithPropsConstructor,
    ActionWithParamsConstructor,
    AnyActionConstructor
} from "ts-action";

export function ofType<T extends string, P>(constructor: ActionWithPayloadConstructor<T, P>): (source: Observable<Action>) => Observable<ActionWithPayload<T, P>>;
export function ofType<T extends string, P extends object>(constructor: ActionWithPropsConstructor<T, P>): (source: Observable<Action>) => Observable<Action<T> & P>;
export function ofType<T extends string, P extends object, V>(constructor: ActionWithParamsConstructor<T, P, V>): (source: Observable<Action>) => Observable<Action<T> & P>;
export function ofType<T extends string>(constructor: ActionConstructor<T>): (source: Observable<Action>) => Observable<Action<T>>;
export function ofType<T extends string>(...constructors: AnyActionConstructor[]): (source: Observable<Action>) => Observable<Action>;
export function ofType<T extends string>(...constructors: AnyActionConstructor[]): (source: Observable<Action>) => Observable<Action> {
    return filter<Action>(action => constructors.some(constructor => action.type === constructor.type));
}
