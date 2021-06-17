export interface RunnerArgs {
  readonly uuid: string;
  readonly instance: string;
}

interface Command {
  run(args?: RunnerArgs): Promise<void>;
  readonly name: string;
  readonly schedule: string;
}

export default Command;
