export class ArrayLib<T> extends Array<T> {
  constructor(...args: [T[]]) {
    super(...args[0]);
  }

  /*
   * Returns the element at a specified index.
   *
   * index - The zero-based index of the element to retrieve. A negative index will count back from the last item.
   * @returns The element at the specified position.
   */
  elementAt(index: number): T {
    const element = this.at(index);
    if (!element) {
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
    const first = this[0];
    if (!first) {
      throw new Error("The ArrayLib is empty");
    }
    return first;
  }
}
