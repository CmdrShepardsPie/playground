import CommandInput from "./abstract/command-input";
export default class OutputService extends CommandInput {
    listen(value) {
        process.stdout.write(value);
    }
}
//# sourceMappingURL=output.service.js.map