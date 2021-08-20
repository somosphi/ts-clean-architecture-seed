import { DependencyContainer } from 'tsyringe';
import { IBaseContainer } from '@/main/container/config/base.interface';
import { EventEmmiter } from '@/main/event';
import { ContainerEvent } from '@/main/enum';

export abstract class BaseContainer implements IBaseContainer {
  abstract loadProviders(): Function[];

  abstract loadConfigs(): any;

  isLoaded: boolean;

  constructor(protected readonly container: DependencyContainer) {}

  loadContainer(): void {
    if (!this.isLoaded) {
      const event = EventEmmiter.getInstance();
      this.loadProviders().forEach(providers => {
        this.container.register(providers.name, providers as any);
      });

      const configs = this.loadConfigs();
      for (const key in configs) {
        if (key) {
          this.container.register(key, { useValue: configs[key] });
        }
      }

      event.emit(ContainerEvent.Loaded);
      this.isLoaded = true;
    }
  }

  getContainer(): DependencyContainer {
    return this.container;
  }
}
