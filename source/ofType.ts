/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs/Observable";
import { filter } from "rxjs/operators/filter";
import { Action, ActionCreator } from "ts-action";

export function ofType<T extends string, A extends Action<string>>(creator: ActionCreator<T, A>): (source: Observable<Action<string>>) => Observable<A>;
export function ofType<T extends string>(...creators: ActionCreator<any, any>[]): (source: Observable<Action<string>>) => Observable<Action<string>>;
export function ofType<T extends string>(...creators: ActionCreator<any, any>[]): (source: Observable<Action<string>>) => Observable<Action<string>> {
    return filter<Action<string>>(action => creators.some(creator => action.type === creator.type));
}
