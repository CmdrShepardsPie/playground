import CommandLink from "./abstract/command-link";

export default class StringService extends CommandLink<number, string> {
  protected listen(value: number): void {
    this.emit(value.toString());
  }
}
