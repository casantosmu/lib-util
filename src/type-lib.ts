import type { TypeProvider } from "./type-providers/type-provider.js";
import { StringProvider } from "./type-providers/string-provider.js";
import { UndefinedProvider } from "./type-providers/undefined-provider.js";

export class TypeLib<T> {
  #providers;

  static String = new StringProvider();
  static Undefined = new UndefinedProvider();

  constructor(...providers: [TypeProvider<T>, ...TypeProvider<T>[]]) {
    this.#providers = Object.freeze(providers);
  }

  is(element: unknown): element is T {
    return this.#providers.some((type) => type.is(element));
  }
}
