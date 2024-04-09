import type { TypeProvider } from "./type-providers/type-provider.js";
import { TypeLib } from "./type-lib.js";

export class ArrayLib<T, E extends T> {
  #elements;
  #typeLib: TypeLib<T>;

  constructor(
    ...args: [TypeProvider<T>, ...TypeProvider<T>[], E[]] | [TypeLib<T>, E[]]
  ) {
    if (args.length < 2) {
      throw new TypeError(
        `ArrayLib constructor requires at least two arguments, but received ${args.length.toString()}.`,
      );
    }

    const elements = args.pop();
    if (!Array.isArray(elements)) {
      throw new TypeError(
        `The last argument to the ArrayLib constructor must be an array, but received type '${typeof elements}'.`,
      );
    }
    this.#elements = elements;

    // @ts-expect-error TypeLib validates its arguments
    this.#typeLib = args instanceof TypeLib ? args : new TypeLib(...args);
    this.#typeLib.assertAllMatch(this.#elements);
  }

  /*
   * Determines whether any element exists or satisfies a condition.
   *
   * @param predicate - A function to test each element for a condition.
   * @returns true if contains any element; otherwise, false. If a predicate is provided, returns true if is not empty and at least one of the elements passes the test in the specified predicate; otherwise, false.
   */
  any(predicate?: (element: E) => boolean): boolean {
    return predicate
      ? this.#elements.some((element) => predicate(element))
      : this.#elements.length > 0;
  }

  /*
   * Returns the number of elements.
   *
   * @param predicate - A function to test each element for a condition.
   * @returns The number of elements if no predicate is provided, otherwise returns a number that represents how many elements satisfy the condition in the predicate function.
   */
  count(predicate?: (element: E) => boolean): number {
    if (!predicate) {
      return this.#elements.length;
    }

    let count = 0;
    for (const element of this.#elements) {
      if (predicate(element)) {
        count++;
      }
    }
    return count;
  }

  /*
   * Returns the element at a specified index.
   *
   * index - The zero-based index of the element to retrieve. A negative index will count back from the last item.
   * @returns The element at the specified position.
   */
  elementAt(index: number): T {
    const element = this.#elements.at(index);
    if (element === undefined && !this.#typeLib.matches(element)) {
      throw new RangeError(`index is outside the bounds.`);
    }
    return element;
  }

  /*
   * Returns the first element
   *
   * predicate - A function to test each element for a condition.
   * @returns The first element if no predicate is provided, otherwise returns the first element that passes the test in the specified predicate function.
   */
  first(predicate?: (element: E) => boolean): T {
    if (this.#elements.length === 0) {
      throw new TypeError("The ArrayLib is empty.");
    }

    if (!predicate) {
      return this.elementAt(0);
    }

    for (const element of this.#elements) {
      if (predicate(element)) {
        return element;
      }
    }
    throw new TypeError("No element satisfies the condition in predicate.");
  }
}
