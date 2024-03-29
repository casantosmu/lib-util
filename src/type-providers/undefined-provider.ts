import type { TypeProvider } from "./type-provider.js";

export class UndefinedProvider implements TypeProvider<undefined> {
  is(value: unknown): value is undefined {
    return value === undefined;
  }
}
