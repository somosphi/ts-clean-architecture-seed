import { DependencyContainer } from 'tsyringe';

export interface IBaseContainer {
  loadProviders(): Function[];
  loadConfigs(): any;
  loadContainer(): void;
  getContainer(): DependencyContainer;
}
