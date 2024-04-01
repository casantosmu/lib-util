import type { TypeProvider } from "./type-provider.js";

export class StringProvider implements TypeProvider<string> {
  matches(value: unknown): value is string {
    return typeof value === "string";
  }
}
