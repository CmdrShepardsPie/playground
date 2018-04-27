function LockThat() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const d = Object.getOwnPropertyNames(target);
    console.log('props', d);

  };
}
// tslint:disable-next-line:ban-types
function LockThis<T extends Function>(constructor: T): T;
function LockThis<T extends { new(...args: any[]): {} }>(constructor: T) {
  let self: any;
  const locker = class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      self = this;
    }
  };
  const proto = constructor.prototype;
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key === 'constructor') {
      return;
    }
    const descriptor = Object.getOwnPropertyDescriptor(proto, key);
    if (descriptor && typeof descriptor.value === 'function') {
      const original = descriptor.value;
      locker.prototype[key] = (...a: any[]) => original.apply(self, a);
    }
  });
  return locker;
}

@LockThis
class Something {
  private foo = 'bar';

  public doIt(someVar?: string) {
    return this.foo + ' ' + someVar;
  }
}

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

@LockThis
abstract class Blah {
  protected something = 'blah';
  protected other = 'hello';
  public saySomething() {
    return this.something;
  }
  public otherThing() {
    return this.other;
  }
}

@LockThis
class Spoon extends Blah {
  protected something = 'cow';
  public saySomething() {
    return this.something + ' ' + this.otherThing.call({});
  }
}

const its = new Spoon();
console.log('its', its.saySomething.call({}));
