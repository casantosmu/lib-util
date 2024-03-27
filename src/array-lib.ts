export class ArrayLib<T> extends Array<T> {
  constructor(...args: [T[]]) {
    super(...args[0]);
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
