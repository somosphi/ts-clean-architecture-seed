export abstract class ValueObject {
  protected abstract value: string;

  protected abstract getValue(): any;

  protected abstract validate(): void;
}
