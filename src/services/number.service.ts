import CommandLink from "./abstract/command-link";

export default class NumberService extends CommandLink<string, number> {
  protected listen(value: string): void {
    this.emit(parseInt(value, 10));
  }
}
