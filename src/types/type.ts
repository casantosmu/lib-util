export interface Type<T> {
  is(value: unknown): value is T;
}
