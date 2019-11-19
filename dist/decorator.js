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
    constructor() {
        this.foo = "bar";
    }
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
    constructor() {
        this.something = "blah";
        this.other = "hello";
    }
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
    constructor() {
        super(...arguments);
        this.something = "cow";
    }
    saySomething() {
        return this.something + " " + this.otherThing.call({});
    }
};
Spoon = __decorate([
    LockThis
], Spoon);
const its = new Spoon();
console.log("its", its.saySomething.call({}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsU0FBUyxRQUFRO0lBQ2YsT0FBTyxVQUFTLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO1FBQzlFLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUxQixDQUFDLENBQUM7QUFDSixDQUFDO0FBSUQsU0FBUyxRQUFRLENBQXNDLFdBQWM7SUFDbkUsSUFBSSxJQUFTLENBQUM7SUFDZCxNQUFNLE1BQU0sR0FBRyxLQUFNLFNBQVEsV0FBVztRQUN0QyxZQUFZLEdBQUcsSUFBVztZQUN4QixLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNmLElBQUksR0FBRyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQ0YsQ0FBQztJQUNGLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7SUFDcEMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2hELElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtZQUN6QixPQUFPO1NBQ1I7UUFDRCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9ELElBQUksVUFBVSxJQUFJLE9BQU8sVUFBVSxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDeEQsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUNsQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBR0QsSUFBTSxTQUFTLEdBQWYsTUFBTSxTQUFTO0lBQWY7UUFDVSxRQUFHLEdBQUcsS0FBSyxDQUFDO0lBS3RCLENBQUM7SUFIUSxJQUFJLENBQUMsT0FBZ0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUM7SUFDbEMsQ0FBQztDQUNGLENBQUE7QUFOSyxTQUFTO0lBRGQsUUFBUTtHQUNILFNBQVMsQ0FNZDtBQUVELHFDQUFxQztBQUNyQyxnREFBZ0Q7QUFFaEQsRUFBRTtBQUNGLHVDQUF1QztBQUN2Qyw0Q0FBNEM7QUFDNUMsNkJBQTZCO0FBQzdCLHVCQUF1QjtBQUN2Qix5QkFBeUI7QUFDekIsdUJBQXVCO0FBQ3ZCLDJCQUEyQjtBQUMzQix5QkFBeUI7QUFDekIsbUNBQW1DO0FBQ25DLCtCQUErQjtBQUMvQixrQ0FBa0M7QUFDbEMsZ0NBQWdDO0FBQ2hDLDZDQUE2QztBQUM3Qyx5Q0FBeUM7QUFHekMsSUFBZSxJQUFJLEdBQW5CLE1BQWUsSUFBSTtJQUFuQjtRQUNZLGNBQVMsR0FBRyxNQUFNLENBQUM7UUFDbkIsVUFBSyxHQUFHLE9BQU8sQ0FBQztJQVM1QixDQUFDO0lBUFEsWUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVNLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztDQUNGLENBQUE7QUFYYyxJQUFJO0lBRGxCLFFBQVE7R0FDTSxJQUFJLENBV2xCO0FBR0QsSUFBTSxLQUFLLEdBQVgsTUFBTSxLQUFNLFNBQVEsSUFBSTtJQUF4Qjs7UUFDWSxjQUFTLEdBQUcsS0FBSyxDQUFDO0lBSzlCLENBQUM7SUFIUSxZQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNGLENBQUE7QUFOSyxLQUFLO0lBRFYsUUFBUTtHQUNILEtBQUssQ0FNVjtBQUVELE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7QUFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIExvY2tUaGF0KCkge1xuICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICAgIGNvbnN0IGQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICAgIGNvbnNvbGUubG9nKFwicHJvcHNcIiwgZCk7XG5cbiAgfTtcbn1cblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xuZnVuY3Rpb24gTG9ja1RoaXM8VCBleHRlbmRzIEZ1bmN0aW9uPihjb25zdHJ1Y3RvcjogVCk6IFQ7XG5mdW5jdGlvbiBMb2NrVGhpczxUIGV4dGVuZHMgbmV3KC4uLmFyZ3M6IGFueVtdKSA9PiB7fT4oY29uc3RydWN0b3I6IFQpIHtcbiAgbGV0IHNlbGY6IGFueTtcbiAgY29uc3QgbG9ja2VyID0gY2xhc3MgZXh0ZW5kcyBjb25zdHJ1Y3RvciB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJnczogYW55W10pIHtcbiAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgICAgc2VsZiA9IHRoaXM7XG4gICAgfVxuICB9O1xuICBjb25zdCBwcm90byA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmIChrZXkgPT09IFwiY29uc3RydWN0b3JcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywga2V5KTtcbiAgICBpZiAoZGVzY3JpcHRvciAmJiB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjb25zdCBvcmlnaW5hbCA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgICBsb2NrZXIucHJvdG90eXBlW2tleV0gPSAoLi4uYTogYW55W10pID0+IG9yaWdpbmFsLmFwcGx5KHNlbGYsIGEpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBsb2NrZXI7XG59XG5cbkBMb2NrVGhpc1xuY2xhc3MgU29tZXRoaW5nIHtcbiAgcHJpdmF0ZSBmb28gPSBcImJhclwiO1xuXG4gIHB1YmxpYyBkb0l0KHNvbWVWYXI/OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5mb28gKyBcIiBcIiArIHNvbWVWYXI7XG4gIH1cbn1cblxuLy8gY29uc3Qgc29tZXRoaW5nID0gbmV3IFNvbWV0aGluZygpO1xuLy8gY29uc29sZS5sb2coc29tZXRoaW5nLmRvSXQuY2FsbCh7fSwgJ3Rlc3QnKSk7XG5cbi8vXG4vLyBjb25zb2xlLmxvZygnU29tZXRoaW5nJywgU29tZXRoaW5nKTtcbi8vIGNvbnNvbGUubG9nKCdjb25zdCBwID0gbmV3IFNvbWV0aGluZygpJyk7XG4vLyBjb25zdCBwID0gbmV3IFNvbWV0aGluZygpO1xuLy8gY29uc29sZS5sb2coJ3AnLCBwKTtcbi8vIGNvbnNvbGUubG9nKCdwLmRvSXQnKTtcbi8vIGNvbnNvbGUubG9nKHAuZG9JdCk7XG4vLyBjb25zb2xlLmxvZygncC5kb0l0KCknKTtcbi8vIGNvbnNvbGUubG9nKHAuZG9JdCgpKTtcbi8vIGNvbnNvbGUubG9nKCdwLmRvSXQoXFwncG9vcFxcJyknKTtcbi8vIGNvbnNvbGUubG9nKHAuZG9JdCgncG9vcCcpKTtcbi8vIGNvbnNvbGUubG9nKCdwLmRvSXQuY2FsbCh7fSknKTtcbi8vIGNvbnNvbGUubG9nKHAuZG9JdC5jYWxsKHt9KSk7XG4vLyBjb25zb2xlLmxvZygncC5kb0l0LmNhbGwoe30sIFxcJ3Bvb3AyXFwnKScpO1xuLy8gY29uc29sZS5sb2cocC5kb0l0LmNhbGwoe30sICdwb29wMicpKTtcblxuQExvY2tUaGlzXG5hYnN0cmFjdCBjbGFzcyBCbGFoIHtcbiAgcHJvdGVjdGVkIHNvbWV0aGluZyA9IFwiYmxhaFwiO1xuICBwcm90ZWN0ZWQgb3RoZXIgPSBcImhlbGxvXCI7XG5cbiAgcHVibGljIHNheVNvbWV0aGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5zb21ldGhpbmc7XG4gIH1cblxuICBwdWJsaWMgb3RoZXJUaGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5vdGhlcjtcbiAgfVxufVxuXG5ATG9ja1RoaXNcbmNsYXNzIFNwb29uIGV4dGVuZHMgQmxhaCB7XG4gIHByb3RlY3RlZCBzb21ldGhpbmcgPSBcImNvd1wiO1xuXG4gIHB1YmxpYyBzYXlTb21ldGhpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuc29tZXRoaW5nICsgXCIgXCIgKyB0aGlzLm90aGVyVGhpbmcuY2FsbCh7fSk7XG4gIH1cbn1cblxuY29uc3QgaXRzID0gbmV3IFNwb29uKCk7XG5jb25zb2xlLmxvZyhcIml0c1wiLCBpdHMuc2F5U29tZXRoaW5nLmNhbGwoe30pKTtcbiJdfQ==