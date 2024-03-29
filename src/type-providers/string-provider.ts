import type { TypeProvider } from "./type-provider.js";

export class StringProvider implements TypeProvider<string> {
  is(value: unknown): value is string {
    return typeof value === "string";
  }
}
