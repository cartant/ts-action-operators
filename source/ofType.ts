/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { Observable } from "rxjs/Observable";
import { filter } from "rxjs/operators/filter";
import { Action, ActionCtor, Ctor } from "ts-action";

export function ofType<T extends { [key: string]: ActionCtor<string, {}, Ctor<{}>> }>(creators: T): (source: Observable<Action<string>>) => Observable<T[keyof T]["action"]>;
export function ofType<T extends ActionCtor<string, {}, Ctor<{}>>>(creator: T): (source: Observable<Action<string>>) => Observable<T["action"]>;
export function ofType(arg: any): (source: Observable<Action<string>>) => Observable<Action<string>> {
    if (arg.type !== undefined) {
        return filter<Action<string>>(action => action.type === arg.type);
    }
    const types = Object.keys(arg).map(key => arg[key].type);
    return filter<Action<string>>(action => types.some(type => action.type === type));
}
