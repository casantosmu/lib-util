import type { Type } from "./type.js";

export class TypeString implements Type<string> {
  is(value: unknown): value is string {
    return typeof value === "string";
  }
}
