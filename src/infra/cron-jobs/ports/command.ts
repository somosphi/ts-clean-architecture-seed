export interface RunnerArgs {
  readonly uuid: string;
  readonly instance: string;
}

export default interface Command {
  run(args?: RunnerArgs): Promise<void>;
  readonly name: string;
  readonly schedule: string;
}
