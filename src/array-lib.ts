import type { TypeProvider } from "./type-providers/type-provider.js";
import { TypeLib } from "./type-lib.js";

export class ArrayLib<T, E extends T> {
  #elements;
  #typeLib;

  constructor(...args: [TypeProvider<T>, ...TypeProvider<T>[], E[]]) {
    this.#elements = args.pop() as E[];
    this.#typeLib = new TypeLib(
      args.shift() as TypeProvider<T>,
      ...(args as TypeProvider<T>[]),
    );
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
