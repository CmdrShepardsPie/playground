import CommandInput from "./abstract/command-input";

export default class OutputService extends CommandInput<string> {
  protected listen(value: string) {
    process.stdout.write(value);
  }
}
