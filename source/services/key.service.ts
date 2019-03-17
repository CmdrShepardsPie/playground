import CommandOutput from "./abstract/command-output";

export default class KeyService extends CommandOutput<string> {
  constructor() {
    super();
    const stdin = process.stdin;

    if (stdin) {
      // without this, we would only get streams once enter is pressed
      if (stdin.setRawMode) {
        stdin.setRawMode(true);
      }
      // resume stdin in the parent process (node app won't quit all by itself
      // unless an error or process.exit() happens)
      stdin.resume();

      // i don't want binary, do you?
      stdin.setEncoding("utf8");

      // on any data into stdin
      stdin.on("data", (key) => {
        // ctrl-c ( end of text )
        if (key === "\u0003") {
          process.exit();
        }
        this.emit(key);
      });
    }
  }
}
