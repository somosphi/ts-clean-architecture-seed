import { DependencyContainer } from 'tsyringe';
import { IBaseContainer } from '@/main/container/config/base.interface';

export abstract class BaseContainer implements IBaseContainer {
  abstract loadProviders(): Function[];

  abstract loadConfigs(): any;

  constructor(protected readonly container: DependencyContainer) {
    this.loadContainer();
  }

  loadContainer() {
    this.loadProviders().forEach(providers => {
      this.container.register(providers.name, providers as any);
    });

    const configs = this.loadConfigs();
    for (const key in configs) {
      if (key) {
        this.container.register(key, { useValue: configs[key] });
      }
    }
  }

  getContainer(): DependencyContainer {
    return this.container;
  }
}
