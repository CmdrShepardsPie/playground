import CommandLink from "./abstract/command-link";

export default class CapsService extends CommandLink<string> {
  protected listen(value: string): void {
    this.emit(value.toUpperCase());
  }
}
