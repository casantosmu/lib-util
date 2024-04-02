import type { TypeProvider } from "./type-providers/type-provider.js";
import { StringProvider } from "./type-providers/string-provider.js";
import { UndefinedProvider } from "./type-providers/undefined-provider.js";

export class TypeLib<T> {
  #providers;

  static String = new StringProvider();
  static Undefined = new UndefinedProvider();

  constructor(...providers: [TypeProvider<T>, ...TypeProvider<T>[]]) {
    if (providers.length === 0) {
      throw new TypeError(
        `TypeLib constructor requires at least one argument, but received none.`,
      );
    }

    for (const provider of providers) {
      if (
        typeof provider !== "object" ||
        typeof provider.matches !== "function"
      ) {
        throw new TypeError(
          `Expected a TypeProvider object, but received a value of type '${typeof provider}'.`,
        );
      }
    }

    this.#providers = Object.freeze(providers);
  }

  /**
   * Checks if the provided element matches any of the types defined by the type providers.
   *
   * @param element - The element to be checked.
   * @returns True if the element matches any type, false otherwise.
   */
  matches(element: unknown): element is T {
    return this.#providers.some((type) => type.matches(element));
  }

  /**
   * Ensures that all elements in the provided array match at least one of the TypeProviders.
   * Throws TypeError if there are any non-matching elements.
   *
   * @param elements - An array of elements to be validated.
   */
  assertAllMatch(elements: unknown[]): asserts elements is T[] {
    if (!Array.isArray(elements)) {
      throw new TypeError("Provided argument is not an array.");
    }
    for (const element of elements) {
      if (!this.matches(element)) {
        throw new TypeError(
          `${JSON.stringify(element)} does not match any of the provided types.`,
        );
      }
    }
  }
}
