import type { TypeProvider } from "./type-providers/type-provider.js";
import { TypeLib } from "./type-lib.js";

export class ArrayLib<T, E extends T> {
  #elements;
  #typeLib: TypeLib<T>;

  constructor(...args: [TypeProvider<T>, ...TypeProvider<T>[], E[]]) {
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
    this.#typeLib = new TypeLib(...args);
    this.#typeLib.assertAllMatch(this.#elements);
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
   * @returns The first element.
   */
  first(): T {
    const first = this.#elements.find((element) =>
      this.#typeLib.matches(element),
    );
    if (first === undefined && !this.#typeLib.matches(first)) {
      throw new TypeError("The ArrayLib is empty");
    }
    return first;
  }
}
