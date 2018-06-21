export default class CommandInput {
    constructor() {
        this.subscriptions = [];
    }
    use(input) {
        const subscriber = input.output.subscribe(this.listen && this.listen.bind(this));
        this.subscriptions.push(subscriber);
        return subscriber;
    }
    clear() {
        while (this.subscriptions.length) {
            const sub = this.subscriptions.pop();
            sub && sub.unsubscribe();
        }
    }
    remove(subscription) {
        const index = this.subscriptions.indexOf(subscription);
        if (index > -1) {
            subscription.unsubscribe();
            this.subscriptions.splice(index, 1);
        }
    }
}
//# sourceMappingURL=command-input.js.map