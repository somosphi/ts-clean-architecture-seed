import { DependencyContainer } from 'tsyringe';
import commander from 'commander';

export abstract class BaseCli {
  protected program: commander.Command;

  constructor(protected container: DependencyContainer) {
    this.program = new commander.Command();
  }

  protected getOptions(): commander.OptionValues {
    this.program.parse(process.argv);
    return this.program.opts();
  }
}
