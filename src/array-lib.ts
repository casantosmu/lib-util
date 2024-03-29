import type { Type } from "./types/type.js";

export class ArrayLib<T> extends Array<T> {
  private readonly types: Type<T>[];

  constructor(elements: T[], ...types: [Type<T>, ...Type<T>[]]) {
    super(...elements);
    this.types = types;
  }

  /*
   * Returns the element at a specified index.
   *
   * index - The zero-based index of the element to retrieve. A negative index will count back from the last item.
   * @returns The element at the specified position.
   */
  elementAt(index: number): T {
    const element = this.at(index);
    if (element === undefined && !this.is(element)) {
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
    const first = this.find((element) => this.is(element));
    if (first === undefined && !this.is(first)) {
      throw new Error("The ArrayLib is empty");
    }
    return first;
  }

  protected is(element: unknown): element is T {
    return this.types.some((type) => type.is(element));
  }
}
