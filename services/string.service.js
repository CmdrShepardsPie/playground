import CommandLink from "./abstract/command-link";
export default class StringService extends CommandLink {
    listen(value) {
        this.emit(value.toString());
    }
}
//# sourceMappingURL=string.service.js.map