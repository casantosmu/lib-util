import type { TypeProvider } from "./type-providers/type-provider.js";
import { TypeLib } from "./type-lib.js";

export class ArrayLib<T, E extends T> extends Array<T> {
  #typeLib;

  constructor(...args: [TypeProvider<T>, ...TypeProvider<T>[], E[]]) {
    super(...(args.pop() as E[]));
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
    const element = this.at(index);
    if (element === undefined && !this.#typeLib.is(element)) {
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
    const first = this.find((element) => this.#typeLib.is(element));
    if (first === undefined && !this.#typeLib.is(first)) {
      throw new TypeError("The ArrayLib is empty");
    }
    return first;
  }
}
