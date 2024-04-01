export interface TypeProvider<T> {
  matches(value: unknown): value is T;
}
