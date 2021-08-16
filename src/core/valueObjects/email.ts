import { ValueObject } from '@/core/valueObjects/value-object';

export class Email extends ValueObject {
  constructor(protected value: string) {
    super();
    this.validate();
  }

  getValue(): string {
    return this.value;
  }

  protected validate() {
    const regexp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    this.value.match(regexp);
  }
}
