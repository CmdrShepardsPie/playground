"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function LockThat() {
    return function (target, propertyKey, descriptor) {
        const d = Object.getOwnPropertyNames(target);
        console.log("props", d);
    };
}
function LockThis(constructor) {
    let self;
    const locker = class extends constructor {
        constructor(...args) {
            super(...args);
            self = this;
        }
    };
    const proto = constructor.prototype;
    Object.getOwnPropertyNames(proto).forEach((key) => {
        if (key === "constructor") {
            return;
        }
        const descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor && typeof descriptor.value === "function") {
            const original = descriptor.value;
            locker.prototype[key] = (...a) => original.apply(self, a);
        }
    });
    return locker;
}
let Something = class Something {
    foo = "bar";
    doIt(someVar) {
        return this.foo + " " + someVar;
    }
};
Something = __decorate([
    LockThis
], Something);
// const something = new Something();
// console.log(something.doIt.call({}, 'test'));
//
// console.log('Something', Something);
// console.log('const p = new Something()');
// const p = new Something();
// console.log('p', p);
// console.log('p.doIt');
// console.log(p.doIt);
// console.log('p.doIt()');
// console.log(p.doIt());
// console.log('p.doIt(\'poop\')');
// console.log(p.doIt('poop'));
// console.log('p.doIt.call({})');
// console.log(p.doIt.call({}));
// console.log('p.doIt.call({}, \'poop2\')');
// console.log(p.doIt.call({}, 'poop2'));
let Blah = class Blah {
    something = "blah";
    other = "hello";
    saySomething() {
        return this.something;
    }
    otherThing() {
        return this.other;
    }
};
Blah = __decorate([
    LockThis
], Blah);
let Spoon = class Spoon extends Blah {
    something = "cow";
    saySomething() {
        return this.something + " " + this.otherThing.call({});
    }
};
Spoon = __decorate([
    LockThis
], Spoon);
const its = new Spoon();
console.log("its", its.saySomething.call({}));
//# sourceMappingURL=decorator.js.map