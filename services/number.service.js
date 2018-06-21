import CommandLink from "./abstract/command-link";
export default class NumberService extends CommandLink {
    listen(value) {
        this.emit(parseInt(value, 10));
    }
}
//# sourceMappingURL=number.service.js.map