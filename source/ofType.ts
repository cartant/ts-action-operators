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
    ActionWithType,
    ActionWithTypeConstructor,
    ActionWithPayload,
    ActionWithPayloadConstructor,
    ActionWithDefaultPayloadConstructor,
    ActionWithPropsConstructor,
    ActionWithDefaultPropsConstructor
} from "ts-action";

export function ofType<T extends string, P>(constructor: ActionWithDefaultPayloadConstructor<T, P>): (source: Observable<Action>) => Observable<ActionWithPayload<T, P>>;
export function ofType<T extends string, P>(constructor: ActionWithPayloadConstructor<T, P>): (source: Observable<Action>) => Observable<ActionWithPayload<T, P>>;
export function ofType<T extends string, P extends object>(constructor: ActionWithDefaultPropsConstructor<T, P>): (source: Observable<Action>) => Observable<ActionWithType<T> & P>;
export function ofType<T extends string, P extends object>(constructor: ActionWithPropsConstructor<T, P>): (source: Observable<Action>) => Observable<ActionWithType<T> & P>;
export function ofType<T extends string>(constructor: ActionWithTypeConstructor<T>): (source: Observable<Action>) => Observable<ActionWithType<T>>;
export function ofType<T extends string>(...constructors: ActionConstructor[]): (source: Observable<Action>) => Observable<Action>;
export function ofType<T extends string>(...constructors: ActionConstructor[]): (source: Observable<Action>) => Observable<Action> {
    return filter<Action>(action => constructors.some(constructor => action.type === constructor.type));
}
