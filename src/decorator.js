var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function LockThat() {
    return function (target, propertyKey, descriptor) {
        var d = Object.getOwnPropertyNames(target);
        console.log("props", d);
    };
}
function LockThis(constructor) {
    var self;
    var locker = /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            self = _this;
            return _this;
        }
        return class_1;
    }(constructor));
    var proto = constructor.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === "constructor") {
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor && typeof descriptor.value === "function") {
            var original_1 = descriptor.value;
            locker.prototype[key] = function () {
                var a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    a[_i] = arguments[_i];
                }
                return original_1.apply(self, a);
            };
        }
    });
    return locker;
}
var Something = /** @class */ (function () {
    function Something() {
        this.foo = "bar";
    }
    Something.prototype.doIt = function (someVar) {
        return this.foo + " " + someVar;
    };
    Something = __decorate([
        LockThis
    ], Something);
    return Something;
}());
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
var Blah = /** @class */ (function () {
    function Blah() {
        this.something = "blah";
        this.other = "hello";
    }
    Blah.prototype.saySomething = function () {
        return this.something;
    };
    Blah.prototype.otherThing = function () {
        return this.other;
    };
    Blah = __decorate([
        LockThis
    ], Blah);
    return Blah;
}());
var Spoon = /** @class */ (function (_super) {
    __extends(Spoon, _super);
    function Spoon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.something = "cow";
        return _this;
    }
    Spoon.prototype.saySomething = function () {
        return this.something + " " + this.otherThing.call({});
    };
    Spoon = __decorate([
        LockThis
    ], Spoon);
    return Spoon;
}(Blah));
var its = new Spoon();
console.log("its", its.saySomething.call({}));
