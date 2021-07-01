import { EventEmitter as CoreEventEmmiter } from 'events';

export class EventEmmiter extends CoreEventEmmiter {
  private static instance: EventEmmiter;

  constructor() {
    super();
    if (EventEmmiter.instance) {
      throw new Error(
        'Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.'
      );
    }
    EventEmmiter.instance = this;
  }

  static getInstance(): EventEmmiter {
    return EventEmmiter.instance || new EventEmmiter();
  }
}
