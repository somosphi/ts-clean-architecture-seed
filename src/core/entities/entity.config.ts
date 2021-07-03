export abstract class Entity<T> {
  protected abstract validate(props: Partial<T>): void;
}
