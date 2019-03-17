"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
            var _this = _super.apply(this, __spread(args)) || this;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBUyxRQUFRO0lBQ2YsT0FBTyxVQUFTLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO1FBQzlFLElBQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUxQixDQUFDLENBQUM7QUFDSixDQUFDO0FBR0QsU0FBUyxRQUFRLENBQXdDLFdBQWM7SUFDckUsSUFBSSxJQUFTLENBQUM7SUFDZCxJQUFNLE1BQU07UUFBaUIsMkJBQVc7UUFDdEM7WUFBWSxjQUFjO2lCQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7Z0JBQWQseUJBQWM7O1lBQTFCLHdDQUNXLElBQUksV0FFZDtZQURDLElBQUksR0FBRyxLQUFJLENBQUM7O1FBQ2QsQ0FBQztRQUNILGNBQUM7SUFBRCxDQUFDLEFBTGMsQ0FBYyxXQUFXLEVBS3ZDLENBQUM7SUFDRixJQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDO0lBQ3BDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1FBQzVDLElBQUksR0FBRyxLQUFLLGFBQWEsRUFBRTtZQUN6QixPQUFPO1NBQ1I7UUFDRCxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQy9ELElBQUksVUFBVSxJQUFJLE9BQU8sVUFBVSxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDeEQsSUFBTSxVQUFRLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUNsQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHO2dCQUFDLFdBQVc7cUJBQVgsVUFBVyxFQUFYLHFCQUFXLEVBQVgsSUFBVztvQkFBWCxzQkFBVzs7Z0JBQUssT0FBQSxVQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFBdkIsQ0FBdUIsQ0FBQztTQUNsRTtJQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUdEO0lBREE7UUFFVSxRQUFHLEdBQUcsS0FBSyxDQUFDO0lBS3RCLENBQUM7SUFIUSx3QkFBSSxHQUFYLFVBQVksT0FBZ0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUM7SUFDbEMsQ0FBQztJQUxHLFNBQVM7UUFEZCxRQUFRO09BQ0gsU0FBUyxDQU1kO0lBQUQsZ0JBQUM7Q0FBQSxBQU5ELElBTUM7QUFFRCxxQ0FBcUM7QUFDckMsZ0RBQWdEO0FBRWhELEVBQUU7QUFDRix1Q0FBdUM7QUFDdkMsNENBQTRDO0FBQzVDLDZCQUE2QjtBQUM3Qix1QkFBdUI7QUFDdkIseUJBQXlCO0FBQ3pCLHVCQUF1QjtBQUN2QiwyQkFBMkI7QUFDM0IseUJBQXlCO0FBQ3pCLG1DQUFtQztBQUNuQywrQkFBK0I7QUFDL0Isa0NBQWtDO0FBQ2xDLGdDQUFnQztBQUNoQyw2Q0FBNkM7QUFDN0MseUNBQXlDO0FBR3pDO0lBREE7UUFFWSxjQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ25CLFVBQUssR0FBRyxPQUFPLENBQUM7SUFPNUIsQ0FBQztJQU5RLDJCQUFZLEdBQW5CO1FBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDTSx5QkFBVSxHQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBUlksSUFBSTtRQURsQixRQUFRO09BQ00sSUFBSSxDQVNsQjtJQUFELFdBQUM7Q0FBQSxBQVRELElBU0M7QUFHRDtJQUFvQix5QkFBSTtJQUR4QjtRQUFBLHFFQU1DO1FBSlcsZUFBUyxHQUFHLEtBQUssQ0FBQzs7SUFJOUIsQ0FBQztJQUhRLDRCQUFZLEdBQW5CO1FBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBSkcsS0FBSztRQURWLFFBQVE7T0FDSCxLQUFLLENBS1Y7SUFBRCxZQUFDO0NBQUEsQUFMRCxDQUFvQixJQUFJLEdBS3ZCO0FBRUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gTG9ja1RoYXQoKSB7XG4gIHJldHVybiBmdW5jdGlvbih0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gICAgY29uc3QgZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gICAgY29uc29sZS5sb2coXCJwcm9wc1wiLCBkKTtcblxuICB9O1xufVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xuZnVuY3Rpb24gTG9ja1RoaXM8VCBleHRlbmRzIEZ1bmN0aW9uPihjb25zdHJ1Y3RvcjogVCk6IFQ7XG5mdW5jdGlvbiBMb2NrVGhpczxUIGV4dGVuZHMgeyBuZXcoLi4uYXJnczogYW55W10pOiB7fSB9Pihjb25zdHJ1Y3RvcjogVCkge1xuICBsZXQgc2VsZjogYW55O1xuICBjb25zdCBsb2NrZXIgPSBjbGFzcyBleHRlbmRzIGNvbnN0cnVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgc3VwZXIoLi4uYXJncyk7XG4gICAgICBzZWxmID0gdGhpcztcbiAgICB9XG4gIH07XG4gIGNvbnN0IHByb3RvID0gY29uc3RydWN0b3IucHJvdG90eXBlO1xuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKGtleSA9PT0gXCJjb25zdHJ1Y3RvclwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBrZXkpO1xuICAgIGlmIChkZXNjcmlwdG9yICYmIHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgICAgIGxvY2tlci5wcm90b3R5cGVba2V5XSA9ICguLi5hOiBhbnlbXSkgPT4gb3JpZ2luYWwuYXBwbHkoc2VsZiwgYSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGxvY2tlcjtcbn1cblxuQExvY2tUaGlzXG5jbGFzcyBTb21ldGhpbmcge1xuICBwcml2YXRlIGZvbyA9IFwiYmFyXCI7XG5cbiAgcHVibGljIGRvSXQoc29tZVZhcj86IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmZvbyArIFwiIFwiICsgc29tZVZhcjtcbiAgfVxufVxuXG4vLyBjb25zdCBzb21ldGhpbmcgPSBuZXcgU29tZXRoaW5nKCk7XG4vLyBjb25zb2xlLmxvZyhzb21ldGhpbmcuZG9JdC5jYWxsKHt9LCAndGVzdCcpKTtcblxuLy9cbi8vIGNvbnNvbGUubG9nKCdTb21ldGhpbmcnLCBTb21ldGhpbmcpO1xuLy8gY29uc29sZS5sb2coJ2NvbnN0IHAgPSBuZXcgU29tZXRoaW5nKCknKTtcbi8vIGNvbnN0IHAgPSBuZXcgU29tZXRoaW5nKCk7XG4vLyBjb25zb2xlLmxvZygncCcsIHApO1xuLy8gY29uc29sZS5sb2coJ3AuZG9JdCcpO1xuLy8gY29uc29sZS5sb2cocC5kb0l0KTtcbi8vIGNvbnNvbGUubG9nKCdwLmRvSXQoKScpO1xuLy8gY29uc29sZS5sb2cocC5kb0l0KCkpO1xuLy8gY29uc29sZS5sb2coJ3AuZG9JdChcXCdwb29wXFwnKScpO1xuLy8gY29uc29sZS5sb2cocC5kb0l0KCdwb29wJykpO1xuLy8gY29uc29sZS5sb2coJ3AuZG9JdC5jYWxsKHt9KScpO1xuLy8gY29uc29sZS5sb2cocC5kb0l0LmNhbGwoe30pKTtcbi8vIGNvbnNvbGUubG9nKCdwLmRvSXQuY2FsbCh7fSwgXFwncG9vcDJcXCcpJyk7XG4vLyBjb25zb2xlLmxvZyhwLmRvSXQuY2FsbCh7fSwgJ3Bvb3AyJykpO1xuXG5ATG9ja1RoaXNcbmFic3RyYWN0IGNsYXNzIEJsYWgge1xuICBwcm90ZWN0ZWQgc29tZXRoaW5nID0gXCJibGFoXCI7XG4gIHByb3RlY3RlZCBvdGhlciA9IFwiaGVsbG9cIjtcbiAgcHVibGljIHNheVNvbWV0aGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5zb21ldGhpbmc7XG4gIH1cbiAgcHVibGljIG90aGVyVGhpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMub3RoZXI7XG4gIH1cbn1cblxuQExvY2tUaGlzXG5jbGFzcyBTcG9vbiBleHRlbmRzIEJsYWgge1xuICBwcm90ZWN0ZWQgc29tZXRoaW5nID0gXCJjb3dcIjtcbiAgcHVibGljIHNheVNvbWV0aGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5zb21ldGhpbmcgKyBcIiBcIiArIHRoaXMub3RoZXJUaGluZy5jYWxsKHt9KTtcbiAgfVxufVxuXG5jb25zdCBpdHMgPSBuZXcgU3Bvb24oKTtcbmNvbnNvbGUubG9nKFwiaXRzXCIsIGl0cy5zYXlTb21ldGhpbmcuY2FsbCh7fSkpO1xuIl19