import type { Type } from "./type.js";

export class TypeUndefined implements Type<undefined> {
  is(value: unknown): value is undefined {
    return value === undefined;
  }
}
