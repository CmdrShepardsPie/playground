import CommandLink from "./abstract/command-link";
export default class CapsService extends CommandLink {
    listen(value) {
        this.emit(value.toUpperCase());
    }
}
//# sourceMappingURL=caps.service.js.map