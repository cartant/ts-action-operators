/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs/Observable";
import { filter } from "rxjs/operators/filter";
import { Action, ActionCreator } from "ts-action";

export function ofType<T1 extends string, A1 extends Action<string>>(creator1: ActionCreator<T1, A1>): (source: Observable<Action<string>>) => Observable<A1>;
export function ofType<T1 extends string, A1 extends Action<string>, T2 extends string, A2 extends Action<string>>(creator1: ActionCreator<T1, A1>, creator2: ActionCreator<T2, A2>): (source: Observable<Action<string>>) => Observable<A1 | A2>;
export function ofType<T1 extends string, A1 extends Action<string>, T2 extends string, A2 extends Action<string>, T3 extends string, A3 extends Action<string>>(creator1: ActionCreator<T1, A1>, creator2: ActionCreator<T2, A2>, creator3: ActionCreator<T3, A3>): (source: Observable<Action<string>>) => Observable<A1 | A2 | A3>;
export function ofType(creator1: ActionCreator<string, Action<string>>, creator2: ActionCreator<string, Action<string>>, creator3: ActionCreator<string, Action<string>>, creator4: ActionCreator<string, Action<string>>, ...others: ActionCreator<string, Action<string>>[]): (source: Observable<Action<string>>) => Observable<Action<string>>;
export function ofType(...creators: ActionCreator<string, Action<string>>[]): (source: Observable<Action<string>>) => Observable<Action<string>> {
    return filter<Action<string>>(action => creators.some(creator => action.type === creator.type));
}
