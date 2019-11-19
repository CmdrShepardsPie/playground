var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./services/caps.service", "./services/key.service", "./services/number.service", "./services/output.service", "./services/string.service"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const caps_service_1 = __importDefault(require("./services/caps.service"));
    const key_service_1 = __importDefault(require("./services/key.service"));
    const number_service_1 = __importDefault(require("./services/number.service"));
    const output_service_1 = __importDefault(require("./services/output.service"));
    const string_service_1 = __importDefault(require("./services/string.service"));
    const keys = new key_service_1.default();
    const outputs = new output_service_1.default();
    outputs.use(keys);
    // outputs.clear();
    const caps = new caps_service_1.default();
    caps.use(keys);
    outputs.use(caps);
    const numbers = new number_service_1.default();
    const strings = new string_service_1.default();
    numbers.use(keys);
    strings.use(numbers);
    outputs.use(strings);
    const map = new Map();
});
// import { Commands, Keys } from './json/enums';
// import * as config  from './json/somefile.json';
//
// const maps: { [s: string]: number } = {};
//
// function addKeymap(keymap: { [s: string]: string }) {
//   Object.entries(keymap).forEach(entry => {
//     const configKey = entry[0];
//     const configCommand = entry[1];
//     const mappedKey = /,/.test(configKey) ?
//       configKey.split(',').map(key => Keys[key]).join(',') :
//       Keys[configKey];
//     const mappedCommand = Commands[configCommand as any] as any as number;
//     console.log(`Key`, configKey, mappedKey, Keys[mappedKey], mappedKey === Keys.O, Keys[mappedKey] === Keys.O);
//     console.log(`Command`, configCommand, mappedCommand, Commands[mappedCommand as any], mappedCommand === Commands.Options as any, Commands[mappedCommand as any] === Commands.Options as any);
//     if (mappedKey !== undefined && mappedCommand !== undefined) {
//       maps[mappedKey] = mappedCommand;
//     }
//   });
// }
// addKeymap(config);
//
// console.log('maps', maps);
//
// console.log(Keys.O, Keys[Keys.O], Keys.O === Keys[Keys.O], Keys[79], Keys.O === Keys[79], Keys['79'], Keys.O === Keys['79'], Keys['O'], Keys.O === Keys['O']);
//
// //
// // const stdin = process.stdin;
// //
// // if (stdin) {
// // // without this, we would only get streams once enter is pressed
// //   if (stdin.setRawMode) {
// //     stdin.setRawMode(true);
// //   }
// // // resume stdin in the parent process (node app won't quit all by itself
// // // unless an error or process.exit() happens)
// //   stdin.resume();
// //
// // // i don't want binary, do you?
// //   stdin.setEncoding('utf8');
// //
// // // on any data into stdin
// //   stdin.on('data', key => {
// //     // ctrl-c ( end of text )
// //     if (key === '\u0003') {
// //       process.exit();
// //     }
// //     // write the key to stdout all normal like
// //     process.stdout.write('key:' + key);
// //   });
// // }
// // import * as _config from './json/somefile.json';
// // import { Command } from './json/enums';
// import * as keys from './json/keycodes.json';
// // import { Keys } from './json/enums';
//
// // import { Key } from 'ts-keycode-enum';
//
// // const blah = Keys.
// // const keys = {};
// // const maps = [
// //   { key: 'key', value: 'keyCode' },
// //   { key: 'code', value: 'keyCode' }
// // ];
// // function addKey(event) {
// //   // event.preventDefault();
// //   // console.log(event);
// //
// //   maps.forEach(map => {
// //     const mapKey = map.key;
// //     const mapValue = map.value;
// //     const eventKey = event[mapKey];
// //     const eventValue = event[mapValue];
// //     if (mapKey === undefined || mapValue === undefined || eventKey === undefined || eventValue === undefined) {
// //       return;
// //     }
// //     if (Array.isArray(keys[eventKey])) {
// //       if (keys[eventKey].indexOf(eventValue) === -1) {
// //         keys[eventKey].push(eventValue);
// //       }
// //     } else if (keys[eventKey] !== undefined && keys[eventKey] !== eventValue) {
// //       const temp = keys[eventKey];
// //       keys[eventKey] = [temp, eventValue];
// //     } else {
// //       keys[eventKey] = eventValue;
// //     }
// //   });
// //   // console.log(JSON.stringify(keys));
// // }
// // Object.entries(Key).forEach(entry => {
// //   // console.log('entry', entry[0], entry[1]);
// //   if (typeof entry[0] === 'string' && typeof entry[1] === 'number') {
// //     addKey({ key: entry[0], keyCode: entry[1] });
// //   }
// // });
// // const blah: any[] = [];
// // Object.entries(keys).forEach(entry => {
// //   const key = entry[0] as string;
// //   const val = entry[1] as number;
// //   if (!blah[val]) {
// //     blah[val] = [];
// //   }
// //   blah[val].push(key);
// //   blah[val].sort((a: number, b: number) => a > b ? 1 : a < b ? -1 : 0);
// // });
// // const moo: { [s: string]: number } = {};
// // blah.forEach((m, i) => {
// //   if (m) {
// //     const names = m as string[];
// //     names.forEach(name => {
// //       moo[name] = i;
// //       console.log(`${name}: ${i}`);
// //     });
// //   }
// // });
// // console.log(moo)
// // const stuff = Object.entries(keys).map(entry => ({ key: entry[0] as string, value: (Array.isArray(entry[1]) ? (entry[1] as any)[0] : entry[1]) as number }));
// // stuff.sort((a, b) => a.key > b.key ? 1 : a.key < b.key ? -1 : 0);
// // stuff.sort((a, b) => a.value - b.value);
// // stuff.sort((a, b) => a.key > b.key ? 1 : a.key < b.key ? -1 : 0);
// // stuff.sort((a, b) => a.value - b.value);
// // const rekeys = stuff.reduce((prev, next) => {
// //   prev[next.key] = next.value;
// //   return prev;
// // }, {} as { [s: string]: any });
// // import * as fs from 'fs';
// //
// // fs.writeFileSync('./stuff.json', JSON.stringify(moo, undefined, 2));
// // document.addEventListener('keydown', addKey);
// //
//
// //
// //
// // const config: { [s: string]: string } = _config;
// //
// // console.log('Key.O', Key.O, Key[Key.O].toString());
// // console.log('Command.Options', Command.Options, Command[Command.Options].toString());
// // console.log('Command', Command);
// // console.log('config', config);
// //
// // const blahA: Command = Command.Back;
// // const blahB: Command = Command['Back'];
// // const blahC: string = Command[blahA];
// // const blahD: string = Command[blahB];
// // const blahE: string = Command[20];
// //
// // console.log('blahA', blahA, 'blahB', blahB, 'blahC', blahC, 'blahD', blahD, 'blahE', blahE)
// //
// // Object.entries(config).forEach((entry, i) => {
// //   const configKey = entry[0];
// //   const configCommand = entry[1];
// //   const mappedKey = /,/.test(configKey) ?
// //     configKey.split(',').map(key => Key[key as any]).join(',') :
// //     Key[configKey as any];
// //   const mappedCommand = Command[configCommand as any];
// //   console.log(`Key`, configKey, mappedKey, Key[mappedKey as any], mappedKey === Key.O as any, Key[mappedKey as any] === Key.O as any);
// //   console.log(`Command`, configCommand, mappedCommand, Command[mappedCommand as any], mappedCommand === Command.Options as any, Command[mappedCommand as any] === Command.Options as any);
// // });
// //
// // const event = 0;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFDQSwyRUFBa0Q7SUFDbEQseUVBQWdEO0lBQ2hELCtFQUFzRDtJQUN0RCwrRUFBc0Q7SUFDdEQsK0VBQXNEO0lBRXRELE1BQU0sSUFBSSxHQUFHLElBQUkscUJBQVUsRUFBRSxDQUFDO0lBQzlCLE1BQU0sT0FBTyxHQUFHLElBQUksd0JBQWEsRUFBRSxDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsbUJBQW1CO0lBRW5CLE1BQU0sSUFBSSxHQUFHLElBQUksc0JBQVcsRUFBRSxDQUFDO0lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWxCLE1BQU0sT0FBTyxHQUFHLElBQUksd0JBQWEsRUFBRSxDQUFDO0lBQ3BDLE1BQU0sT0FBTyxHQUFHLElBQUksd0JBQWEsRUFBRSxDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXJCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDOztBQUN0QyxpREFBaUQ7QUFDakQsbURBQW1EO0FBQ25ELEVBQUU7QUFDRiw0Q0FBNEM7QUFDNUMsRUFBRTtBQUNGLHdEQUF3RDtBQUN4RCw4Q0FBOEM7QUFDOUMsa0NBQWtDO0FBQ2xDLHNDQUFzQztBQUN0Qyw4Q0FBOEM7QUFDOUMsK0RBQStEO0FBQy9ELHlCQUF5QjtBQUN6Qiw2RUFBNkU7QUFDN0UsbUhBQW1IO0FBQ25ILG1NQUFtTTtBQUNuTSxvRUFBb0U7QUFDcEUseUNB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dW1zXCI7XG5pbXBvcnQgQ2Fwc1NlcnZpY2UgZnJvbSBcIi4vc2VydmljZXMvY2Fwcy5zZXJ2aWNlXCI7XG5pbXBvcnQgS2V5U2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlcy9rZXkuc2VydmljZVwiO1xuaW1wb3J0IE51bWJlclNlcnZpY2UgZnJvbSBcIi4vc2VydmljZXMvbnVtYmVyLnNlcnZpY2VcIjtcbmltcG9ydCBPdXRwdXRTZXJ2aWNlIGZyb20gXCIuL3NlcnZpY2VzL291dHB1dC5zZXJ2aWNlXCI7XG5pbXBvcnQgU3RyaW5nU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlcy9zdHJpbmcuc2VydmljZVwiO1xuXG5jb25zdCBrZXlzID0gbmV3IEtleVNlcnZpY2UoKTtcbmNvbnN0IG91dHB1dHMgPSBuZXcgT3V0cHV0U2VydmljZSgpO1xub3V0cHV0cy51c2Uoa2V5cyk7XG4vLyBvdXRwdXRzLmNsZWFyKCk7XG5cbmNvbnN0IGNhcHMgPSBuZXcgQ2Fwc1NlcnZpY2UoKTtcbmNhcHMudXNlKGtleXMpO1xub3V0cHV0cy51c2UoY2Fwcyk7XG5cbmNvbnN0IG51bWJlcnMgPSBuZXcgTnVtYmVyU2VydmljZSgpO1xuY29uc3Qgc3RyaW5ncyA9IG5ldyBTdHJpbmdTZXJ2aWNlKCk7XG5udW1iZXJzLnVzZShrZXlzKTtcbnN0cmluZ3MudXNlKG51bWJlcnMpO1xub3V0cHV0cy51c2Uoc3RyaW5ncyk7XG5cbmNvbnN0IG1hcCA9IG5ldyBNYXA8S2V5cywgQ29tbWFuZHM+KCk7XG4vLyBpbXBvcnQgeyBDb21tYW5kcywgS2V5cyB9IGZyb20gJy4vanNvbi9lbnVtcyc7XG4vLyBpbXBvcnQgKiBhcyBjb25maWcgIGZyb20gJy4vanNvbi9zb21lZmlsZS5qc29uJztcbi8vXG4vLyBjb25zdCBtYXBzOiB7IFtzOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xuLy9cbi8vIGZ1bmN0aW9uIGFkZEtleW1hcChrZXltYXA6IHsgW3M6IHN0cmluZ106IHN0cmluZyB9KSB7XG4vLyAgIE9iamVjdC5lbnRyaWVzKGtleW1hcCkuZm9yRWFjaChlbnRyeSA9PiB7XG4vLyAgICAgY29uc3QgY29uZmlnS2V5ID0gZW50cnlbMF07XG4vLyAgICAgY29uc3QgY29uZmlnQ29tbWFuZCA9IGVudHJ5WzFdO1xuLy8gICAgIGNvbnN0IG1hcHBlZEtleSA9IC8sLy50ZXN0KGNvbmZpZ0tleSkgP1xuLy8gICAgICAgY29uZmlnS2V5LnNwbGl0KCcsJykubWFwKGtleSA9PiBLZXlzW2tleV0pLmpvaW4oJywnKSA6XG4vLyAgICAgICBLZXlzW2NvbmZpZ0tleV07XG4vLyAgICAgY29uc3QgbWFwcGVkQ29tbWFuZCA9IENvbW1hbmRzW2NvbmZpZ0NvbW1hbmQgYXMgYW55XSBhcyBhbnkgYXMgbnVtYmVyO1xuLy8gICAgIGNvbnNvbGUubG9nKGBLZXlgLCBjb25maWdLZXksIG1hcHBlZEtleSwgS2V5c1ttYXBwZWRLZXldLCBtYXBwZWRLZXkgPT09IEtleXMuTywgS2V5c1ttYXBwZWRLZXldID09PSBLZXlzLk8pO1xuLy8gICAgIGNvbnNvbGUubG9nKGBDb21tYW5kYCwgY29uZmlnQ29tbWFuZCwgbWFwcGVkQ29tbWFuZCwgQ29tbWFuZHNbbWFwcGVkQ29tbWFuZCBhcyBhbnldLCBtYXBwZWRDb21tYW5kID09PSBDb21tYW5kcy5PcHRpb25zIGFzIGFueSwgQ29tbWFuZHNbbWFwcGVkQ29tbWFuZCBhcyBhbnldID09PSBDb21tYW5kcy5PcHRpb25zIGFzIGFueSk7XG4vLyAgICAgaWYgKG1hcHBlZEtleSAhPT0gdW5kZWZpbmVkICYmIG1hcHBlZENvbW1hbmQgIT09IHVuZGVmaW5lZCkge1xuLy8gICAgICAgbWFwc1ttYXBwZWRLZXldID0gbWFwcGVkQ29tbWFuZDtcbi8vICAgICB9XG4vLyAgIH0pO1xuLy8gfVxuLy8gYWRkS2V5bWFwKGNvbmZpZyk7XG4vL1xuLy8gY29uc29sZS5sb2coJ21hcHMnLCBtYXBzKTtcbi8vXG4vLyBjb25zb2xlLmxvZyhLZXlzLk8sIEtleXNbS2V5cy5PXSwgS2V5cy5PID09PSBLZXlzW0tleXMuT10sIEtleXNbNzldLCBLZXlzLk8gPT09IEtleXNbNzldLCBLZXlzWyc3OSddLCBLZXlzLk8gPT09IEtleXNbJzc5J10sIEtleXNbJ08nXSwgS2V5cy5PID09PSBLZXlzWydPJ10pO1xuLy9cbi8vIC8vXG4vLyAvLyBjb25zdCBzdGRpbiA9IHByb2Nlc3Muc3RkaW47XG4vLyAvL1xuLy8gLy8gaWYgKHN0ZGluKSB7XG4vLyAvLyAvLyB3aXRob3V0IHRoaXMsIHdlIHdvdWxkIG9ubHkgZ2V0IHN0cmVhbXMgb25jZSBlbnRlciBpcyBwcmVzc2VkXG4vLyAvLyAgIGlmIChzdGRpbi5zZXRSYXdNb2RlKSB7XG4vLyAvLyAgICAgc3RkaW4uc2V0UmF3TW9kZSh0cnVlKTtcbi8vIC8vICAgfVxuLy8gLy8gLy8gcmVzdW1lIHN0ZGluIGluIHRoZSBwYXJlbnQgcHJvY2VzcyAobm9kZSBhcHAgd29uJ3QgcXVpdCBhbGwgYnkgaXRzZWxmXG4vLyAvLyAvLyB1bmxlc3MgYW4gZXJyb3Igb3IgcHJvY2Vzcy5leGl0KCkgaGFwcGVucylcbi8vIC8vICAgc3RkaW4ucmVzdW1lKCk7XG4vLyAvL1xuLy8gLy8gLy8gaSBkb24ndCB3YW50IGJpbmFyeSwgZG8geW91P1xuLy8gLy8gICBzdGRpbi5zZXRFbmNvZGluZygndXRmOCcpO1xuLy8gLy9cbi8vIC8vIC8vIG9uIGFueSBkYXRhIGludG8gc3RkaW5cbi8vIC8vICAgc3RkaW4ub24oJ2RhdGEnLCBrZXkgPT4ge1xuLy8gLy8gICAgIC8vIGN0cmwtYyAoIGVuZCBvZiB0ZXh0IClcbi8vIC8vICAgICBpZiAoa2V5ID09PSAnXFx1MDAwMycpIHtcbi8vIC8vICAgICAgIHByb2Nlc3MuZXhpdCgpO1xuLy8gLy8gICAgIH1cbi8vIC8vICAgICAvLyB3cml0ZSB0aGUga2V5IHRvIHN0ZG91dCBhbGwgbm9ybWFsIGxpa2Vcbi8vIC8vICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgna2V5OicgKyBrZXkpO1xuLy8gLy8gICB9KTtcbi8vIC8vIH1cbi8vIC8vIGltcG9ydCAqIGFzIF9jb25maWcgZnJvbSAnLi9qc29uL3NvbWVmaWxlLmpzb24nO1xuLy8gLy8gaW1wb3J0IHsgQ29tbWFuZCB9IGZyb20gJy4vanNvbi9lbnVtcyc7XG4vLyBpbXBvcnQgKiBhcyBrZXlzIGZyb20gJy4vanNvbi9rZXljb2Rlcy5qc29uJztcbi8vIC8vIGltcG9ydCB7IEtleXMgfSBmcm9tICcuL2pzb24vZW51bXMnO1xuLy9cbi8vIC8vIGltcG9ydCB7IEtleSB9IGZyb20gJ3RzLWtleWNvZGUtZW51bSc7XG4vL1xuLy8gLy8gY29uc3QgYmxhaCA9IEtleXMuXG4vLyAvLyBjb25zdCBrZXlzID0ge307XG4vLyAvLyBjb25zdCBtYXBzID0gW1xuLy8gLy8gICB7IGtleTogJ2tleScsIHZhbHVlOiAna2V5Q29kZScgfSxcbi8vIC8vICAgeyBrZXk6ICdjb2RlJywgdmFsdWU6ICdrZXlDb2RlJyB9XG4vLyAvLyBdO1xuLy8gLy8gZnVuY3Rpb24gYWRkS2V5KGV2ZW50KSB7XG4vLyAvLyAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4vLyAvLyAgIC8vIGNvbnNvbGUubG9nKGV2ZW50KTtcbi8vIC8vXG4vLyAvLyAgIG1hcHMuZm9yRWFjaChtYXAgPT4ge1xuLy8gLy8gICAgIGNvbnN0IG1hcEtleSA9IG1hcC5rZXk7XG4vLyAvLyAgICAgY29uc3QgbWFwVmFsdWUgPSBtYXAudmFsdWU7XG4vLyAvLyAgICAgY29uc3QgZXZlbnRLZXkgPSBldmVudFttYXBLZXldO1xuLy8gLy8gICAgIGNvbnN0IGV2ZW50VmFsdWUgPSBldmVudFttYXBWYWx1ZV07XG4vLyAvLyAgICAgaWYgKG1hcEtleSA9PT0gdW5kZWZpbmVkIHx8IG1hcFZhbHVlID09PSB1bmRlZmluZWQgfHwgZXZlbnRLZXkgPT09IHVuZGVmaW5lZCB8fCBldmVudFZhbHVlID09PSB1bmRlZmluZWQpIHtcbi8vIC8vICAgICAgIHJldHVybjtcbi8vIC8vICAgICB9XG4vLyAvLyAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5c1tldmVudEtleV0pKSB7XG4vLyAvLyAgICAgICBpZiAoa2V5c1tldmVudEtleV0uaW5kZXhPZihldmVudFZhbHVlKSA9PT0gLTEpIHtcbi8vIC8vICAgICAgICAga2V5c1tldmVudEtleV0ucHVzaChldmVudFZhbHVlKTtcbi8vIC8vICAgICAgIH1cbi8vIC8vICAgICB9IGVsc2UgaWYgKGtleXNbZXZlbnRLZXldICE9PSB1bmRlZmluZWQgJiYga2V5c1tldmVudEtleV0gIT09IGV2ZW50VmFsdWUpIHtcbi8vIC8vICAgICAgIGNvbnN0IHRlbXAgPSBrZXlzW2V2ZW50S2V5XTtcbi8vIC8vICAgICAgIGtleXNbZXZlbnRLZXldID0gW3RlbXAsIGV2ZW50VmFsdWVdO1xuLy8gLy8gICAgIH0gZWxzZSB7XG4vLyAvLyAgICAgICBrZXlzW2V2ZW50S2V5XSA9IGV2ZW50VmFsdWU7XG4vLyAvLyAgICAgfVxuLy8gLy8gICB9KTtcbi8vIC8vICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoa2V5cykpO1xuLy8gLy8gfVxuLy8gLy8gT2JqZWN0LmVudHJpZXMoS2V5KS5mb3JFYWNoKGVudHJ5ID0+IHtcbi8vIC8vICAgLy8gY29uc29sZS5sb2coJ2VudHJ5JywgZW50cnlbMF0sIGVudHJ5WzFdKTtcbi8vIC8vICAgaWYgKHR5cGVvZiBlbnRyeVswXSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGVudHJ5WzFdID09PSAnbnVtYmVyJykge1xuLy8gLy8gICAgIGFkZEtleSh7IGtleTogZW50cnlbMF0sIGtleUNvZGU6IGVudHJ5WzFdIH0pO1xuLy8gLy8gICB9XG4vLyAvLyB9KTtcbi8vIC8vIGNvbnN0IGJsYWg6IGFueVtdID0gW107XG4vLyAvLyBPYmplY3QuZW50cmllcyhrZXlzKS5mb3JFYWNoKGVudHJ5ID0+IHtcbi8vIC8vICAgY29uc3Qga2V5ID0gZW50cnlbMF0gYXMgc3RyaW5nO1xuLy8gLy8gICBjb25zdCB2YWwgPSBlbnRyeVsxXSBhcyBudW1iZXI7XG4vLyAvLyAgIGlmICghYmxhaFt2YWxdKSB7XG4vLyAvLyAgICAgYmxhaFt2YWxdID0gW107XG4vLyAvLyAgIH1cbi8vIC8vICAgYmxhaFt2YWxdLnB1c2goa2V5KTtcbi8vIC8vICAgYmxhaFt2YWxdLnNvcnQoKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiBhID4gYiA/IDEgOiBhIDwgYiA/IC0xIDogMCk7XG4vLyAvLyB9KTtcbi8vIC8vIGNvbnN0IG1vbzogeyBbczogc3RyaW5nXTogbnVtYmVyIH0gPSB7fTtcbi8vIC8vIGJsYWguZm9yRWFjaCgobSwgaSkgPT4ge1xuLy8gLy8gICBpZiAobSkge1xuLy8gLy8gICAgIGNvbnN0IG5hbWVzID0gbSBhcyBzdHJpbmdbXTtcbi8vIC8vICAgICBuYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuLy8gLy8gICAgICAgbW9vW25hbWVdID0gaTtcbi8vIC8vICAgICAgIGNvbnNvbGUubG9nKGAke25hbWV9OiAke2l9YCk7XG4vLyAvLyAgICAgfSk7XG4vLyAvLyAgIH1cbi8vIC8vIH0pO1xuLy8gLy8gY29uc29sZS5sb2cobW9vKVxuLy8gLy8gY29uc3Qgc3R1ZmYgPSBPYmplY3QuZW50cmllcyhrZXlzKS5tYXAoZW50cnkgPT4gKHsga2V5OiBlbnRyeVswXSBhcyBzdHJpbmcsIHZhbHVlOiAoQXJyYXkuaXNBcnJheShlbnRyeVsxXSkgPyAoZW50cnlbMV0gYXMgYW55KVswXSA6IGVudHJ5WzFdKSBhcyBudW1iZXIgfSkpO1xuLy8gLy8gc3R1ZmYuc29ydCgoYSwgYikgPT4gYS5rZXkgPiBiLmtleSA/IDEgOiBhLmtleSA8IGIua2V5ID8gLTEgOiAwKTtcbi8vIC8vIHN0dWZmLnNvcnQoKGEsIGIpID0+IGEudmFsdWUgLSBiLnZhbHVlKTtcbi8vIC8vIHN0dWZmLnNvcnQoKGEsIGIpID0+IGEua2V5ID4gYi5rZXkgPyAxIDogYS5rZXkgPCBiLmtleSA/IC0xIDogMCk7XG4vLyAvLyBzdHVmZi5zb3J0KChhLCBiKSA9PiBhLnZhbHVlIC0gYi52YWx1ZSk7XG4vLyAvLyBjb25zdCByZWtleXMgPSBzdHVmZi5yZWR1Y2UoKHByZXYsIG5leHQpID0+IHtcbi8vIC8vICAgcHJldltuZXh0LmtleV0gPSBuZXh0LnZhbHVlO1xuLy8gLy8gICByZXR1cm4gcHJldjtcbi8vIC8vIH0sIHt9IGFzIHsgW3M6IHN0cmluZ106IGFueSB9KTtcbi8vIC8vIGltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbi8vIC8vXG4vLyAvLyBmcy53cml0ZUZpbGVTeW5jKCcuL3N0dWZmLmpzb24nLCBKU09OLnN0cmluZ2lmeShtb28sIHVuZGVmaW5lZCwgMikpO1xuLy8gLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGFkZEtleSk7XG4vLyAvL1xuLy9cbi8vIC8vXG4vLyAvL1xuLy8gLy8gY29uc3QgY29uZmlnOiB7IFtzOiBzdHJpbmddOiBzdHJpbmcgfSA9IF9jb25maWc7XG4vLyAvL1xuLy8gLy8gY29uc29sZS5sb2coJ0tleS5PJywgS2V5Lk8sIEtleVtLZXkuT10udG9TdHJpbmcoKSk7XG4vLyAvLyBjb25zb2xlLmxvZygnQ29tbWFuZC5PcHRpb25zJywgQ29tbWFuZC5PcHRpb25zLCBDb21tYW5kW0NvbW1hbmQuT3B0aW9uc10udG9TdHJpbmcoKSk7XG4vLyAvLyBjb25zb2xlLmxvZygnQ29tbWFuZCcsIENvbW1hbmQpO1xuLy8gLy8gY29uc29sZS5sb2coJ2NvbmZpZycsIGNvbmZpZyk7XG4vLyAvL1xuLy8gLy8gY29uc3QgYmxhaEE6IENvbW1hbmQgPSBDb21tYW5kLkJhY2s7XG4vLyAvLyBjb25zdCBibGFoQjogQ29tbWFuZCA9IENvbW1hbmRbJ0JhY2snXTtcbi8vIC8vIGNvbnN0IGJsYWhDOiBzdHJpbmcgPSBDb21tYW5kW2JsYWhBXTtcbi8vIC8vIGNvbnN0IGJsYWhEOiBzdHJpbmcgPSBDb21tYW5kW2JsYWhCXTtcbi8vIC8vIGNvbnN0IGJsYWhFOiBzdHJpbmcgPSBDb21tYW5kWzIwXTtcbi8vIC8vXG4vLyAvLyBjb25zb2xlLmxvZygnYmxhaEEnLCBibGFoQSwgJ2JsYWhCJywgYmxhaEIsICdibGFoQycsIGJsYWhDLCAnYmxhaEQnLCBibGFoRCwgJ2JsYWhFJywgYmxhaEUpXG4vLyAvL1xuLy8gLy8gT2JqZWN0LmVudHJpZXMoY29uZmlnKS5mb3JFYWNoKChlbnRyeSwgaSkgPT4ge1xuLy8gLy8gICBjb25zdCBjb25maWdLZXkgPSBlbnRyeVswXTtcbi8vIC8vICAgY29uc3QgY29uZmlnQ29tbWFuZCA9IGVudHJ5WzFdO1xuLy8gLy8gICBjb25zdCBtYXBwZWRLZXkgPSAvLC8udGVzdChjb25maWdLZXkpID9cbi8vIC8vICAgICBjb25maWdLZXkuc3BsaXQoJywnKS5tYXAoa2V5ID0+IEtleVtrZXkgYXMgYW55XSkuam9pbignLCcpIDpcbi8vIC8vICAgICBLZXlbY29uZmlnS2V5IGFzIGFueV07XG4vLyAvLyAgIGNvbnN0IG1hcHBlZENvbW1hbmQgPSBDb21tYW5kW2NvbmZpZ0NvbW1hbmQgYXMgYW55XTtcbi8vIC8vICAgY29uc29sZS5sb2coYEtleWAsIGNvbmZpZ0tleSwgbWFwcGVkS2V5LCBLZXlbbWFwcGVkS2V5IGFzIGFueV0sIG1hcHBlZEtleSA9PT0gS2V5Lk8gYXMgYW55LCBLZXlbbWFwcGVkS2V5IGFzIGFueV0gPT09IEtleS5PIGFzIGFueSk7XG4vLyAvLyAgIGNvbnNvbGUubG9nKGBDb21tYW5kYCwgY29uZmlnQ29tbWFuZCwgbWFwcGVkQ29tbWFuZCwgQ29tbWFuZFttYXBwZWRDb21tYW5kIGFzIGFueV0sIG1hcHBlZENvbW1hbmQgPT09IENvbW1hbmQuT3B0aW9ucyBhcyBhbnksIENvbW1hbmRbbWFwcGVkQ29tbWFuZCBhcyBhbnldID09PSBDb21tYW5kLk9wdGlvbnMgYXMgYW55KTtcbi8vIC8vIH0pO1xuLy8gLy9cbi8vIC8vIGNvbnN0IGV2ZW50ID0gMDtcbiJdfQ==