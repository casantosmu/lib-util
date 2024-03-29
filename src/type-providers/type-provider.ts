export interface TypeProvider<T> {
  is(value: unknown): value is T;
}
