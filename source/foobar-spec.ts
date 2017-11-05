/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/ts-action-operators
 */

import { action, payload, props } from "ts-action";

export const Foo = action({ type: "[foobar] FOO", ...payload<{ foo: number }>() });
export const Bar = action({ type: "[foobar] BAR", ...payload<{ bar: number }>() });
export const Goo = action({ type: "[foobar] GOO" });

export const Baz = action({ type: "[foobar] BAZ", ...props<{ baz: number }>() });
export const Daz = action({ type: "[foobar] DAZ", ...props<{ daz: number }>() });
