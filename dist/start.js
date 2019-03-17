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
    exports.__esModule = true;
    var caps_service_1 = require("./services/caps.service");
    var key_service_1 = require("./services/key.service");
    var number_service_1 = require("./services/number.service");
    var output_service_1 = require("./services/output.service");
    var string_service_1 = require("./services/string.service");
    var keys = new key_service_1["default"]();
    var outputs = new output_service_1["default"]();
    outputs.use(keys);
    // outputs.clear();
    var caps = new caps_service_1["default"]();
    caps.use(keys);
    outputs.use(caps);
    var numbers = new number_service_1["default"]();
    var strings = new string_service_1["default"]();
    numbers.use(keys);
    strings.use(numbers);
    outputs.use(strings);
    var map = new Map();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFDQSx3REFBa0Q7SUFDbEQsc0RBQWdEO0lBQ2hELDREQUFzRDtJQUN0RCw0REFBc0Q7SUFDdEQsNERBQXNEO0lBRXRELElBQU0sSUFBSSxHQUFHLElBQUksd0JBQVUsRUFBRSxDQUFDO0lBQzlCLElBQU0sT0FBTyxHQUFHLElBQUksMkJBQWEsRUFBRSxDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsbUJBQW1CO0lBRW5CLElBQU0sSUFBSSxHQUFHLElBQUkseUJBQVcsRUFBRSxDQUFDO0lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWxCLElBQU0sT0FBTyxHQUFHLElBQUksMkJBQWEsRUFBRSxDQUFDO0lBQ3BDLElBQU0sT0FBTyxHQUFHLElBQUksMkJBQWEsRUFBRSxDQUFDO0lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXJCLElBQU0sR0FBRyxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDOztBQUN0QyxpREFBaUQ7QUFDakQsbURBQW1EO0FBQ25ELEVBQUU7QUFDRiw0Q0FBNEM7QUFDNUMsRUFBRTtBQUNGLHdEQUF3RDtBQUN4RCw4Q0FBOEM7QUFDOUMsa0NBQWtDO0FBQ2xDLHNDQUFzQztBQUN0Qyw4Q0FBOEM7QUFDOUMsK0RBQStEO0FBQy9ELHlCQUF5QjtBQUN6Qiw2RUFBNkU7QUFDN0UsbUhBQW1IO0FBQ25ILG1NQUFtTTtBQUNuTSxvRUFBb0U7QUFDcEUseUNBQXlD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bXNcIjtcbmltcG9ydCBDYXBzU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlcy9jYXBzLnNlcnZpY2VcIjtcbmltcG9ydCBLZXlTZXJ2aWNlIGZyb20gXCIuL3NlcnZpY2VzL2tleS5zZXJ2aWNlXCI7XG5pbXBvcnQgTnVtYmVyU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlcy9udW1iZXIuc2VydmljZVwiO1xuaW1wb3J0IE91dHB1dFNlcnZpY2UgZnJvbSBcIi4vc2VydmljZXMvb3V0cHV0LnNlcnZpY2VcIjtcbmltcG9ydCBTdHJpbmdTZXJ2aWNlIGZyb20gXCIuL3NlcnZpY2VzL3N0cmluZy5zZXJ2aWNlXCI7XG5cbmNvbnN0IGtleXMgPSBuZXcgS2V5U2VydmljZSgpO1xuY29uc3Qgb3V0cHV0cyA9IG5ldyBPdXRwdXRTZXJ2aWNlKCk7XG5vdXRwdXRzLnVzZShrZXlzKTtcbi8vIG91dHB1dHMuY2xlYXIoKTtcblxuY29uc3QgY2FwcyA9IG5ldyBDYXBzU2VydmljZSgpO1xuY2Fwcy51c2Uoa2V5cyk7XG5vdXRwdXRzLnVzZShjYXBzKTtcblxuY29uc3QgbnVtYmVycyA9IG5ldyBOdW1iZXJTZXJ2aWNlKCk7XG5jb25zdCBzdHJpbmdzID0gbmV3IFN0cmluZ1NlcnZpY2UoKTtcbm51bWJlcnMudXNlKGtleXMpO1xuc3RyaW5ncy51c2UobnVtYmVycyk7XG5vdXRwdXRzLnVzZShzdHJpbmdzKTtcblxuY29uc3QgbWFwID0gbmV3IE1hcDxLZXlzLCBDb21tYW5kcz4oKTtcbi8vIGltcG9ydCB7IENvbW1hbmRzLCBLZXlzIH0gZnJvbSAnLi9qc29uL2VudW1zJztcbi8vIGltcG9ydCAqIGFzIGNvbmZpZyAgZnJvbSAnLi9qc29uL3NvbWVmaWxlLmpzb24nO1xuLy9cbi8vIGNvbnN0IG1hcHM6IHsgW3M6IHN0cmluZ106IG51bWJlciB9ID0ge307XG4vL1xuLy8gZnVuY3Rpb24gYWRkS2V5bWFwKGtleW1hcDogeyBbczogc3RyaW5nXTogc3RyaW5nIH0pIHtcbi8vICAgT2JqZWN0LmVudHJpZXMoa2V5bWFwKS5mb3JFYWNoKGVudHJ5ID0+IHtcbi8vICAgICBjb25zdCBjb25maWdLZXkgPSBlbnRyeVswXTtcbi8vICAgICBjb25zdCBjb25maWdDb21tYW5kID0gZW50cnlbMV07XG4vLyAgICAgY29uc3QgbWFwcGVkS2V5ID0gLywvLnRlc3QoY29uZmlnS2V5KSA/XG4vLyAgICAgICBjb25maWdLZXkuc3BsaXQoJywnKS5tYXAoa2V5ID0+IEtleXNba2V5XSkuam9pbignLCcpIDpcbi8vICAgICAgIEtleXNbY29uZmlnS2V5XTtcbi8vICAgICBjb25zdCBtYXBwZWRDb21tYW5kID0gQ29tbWFuZHNbY29uZmlnQ29tbWFuZCBhcyBhbnldIGFzIGFueSBhcyBudW1iZXI7XG4vLyAgICAgY29uc29sZS5sb2coYEtleWAsIGNvbmZpZ0tleSwgbWFwcGVkS2V5LCBLZXlzW21hcHBlZEtleV0sIG1hcHBlZEtleSA9PT0gS2V5cy5PLCBLZXlzW21hcHBlZEtleV0gPT09IEtleXMuTyk7XG4vLyAgICAgY29uc29sZS5sb2coYENvbW1hbmRgLCBjb25maWdDb21tYW5kLCBtYXBwZWRDb21tYW5kLCBDb21tYW5kc1ttYXBwZWRDb21tYW5kIGFzIGFueV0sIG1hcHBlZENvbW1hbmQgPT09IENvbW1hbmRzLk9wdGlvbnMgYXMgYW55LCBDb21tYW5kc1ttYXBwZWRDb21tYW5kIGFzIGFueV0gPT09IENvbW1hbmRzLk9wdGlvbnMgYXMgYW55KTtcbi8vICAgICBpZiAobWFwcGVkS2V5ICE9PSB1bmRlZmluZWQgJiYgbWFwcGVkQ29tbWFuZCAhPT0gdW5kZWZpbmVkKSB7XG4vLyAgICAgICBtYXBzW21hcHBlZEtleV0gPSBtYXBwZWRDb21tYW5kO1xuLy8gICAgIH1cbi8vICAgfSk7XG4vLyB9XG4vLyBhZGRLZXltYXAoY29uZmlnKTtcbi8vXG4vLyBjb25zb2xlLmxvZygnbWFwcycsIG1hcHMpO1xuLy9cbi8vIGNvbnNvbGUubG9nKEtleXMuTywgS2V5c1tLZXlzLk9dLCBLZXlzLk8gPT09IEtleXNbS2V5cy5PXSwgS2V5c1s3OV0sIEtleXMuTyA9PT0gS2V5c1s3OV0sIEtleXNbJzc5J10sIEtleXMuTyA9PT0gS2V5c1snNzknXSwgS2V5c1snTyddLCBLZXlzLk8gPT09IEtleXNbJ08nXSk7XG4vL1xuLy8gLy9cbi8vIC8vIGNvbnN0IHN0ZGluID0gcHJvY2Vzcy5zdGRpbjtcbi8vIC8vXG4vLyAvLyBpZiAoc3RkaW4pIHtcbi8vIC8vIC8vIHdpdGhvdXQgdGhpcywgd2Ugd291bGQgb25seSBnZXQgc3RyZWFtcyBvbmNlIGVudGVyIGlzIHByZXNzZWRcbi8vIC8vICAgaWYgKHN0ZGluLnNldFJhd01vZGUpIHtcbi8vIC8vICAgICBzdGRpbi5zZXRSYXdNb2RlKHRydWUpO1xuLy8gLy8gICB9XG4vLyAvLyAvLyByZXN1bWUgc3RkaW4gaW4gdGhlIHBhcmVudCBwcm9jZXNzIChub2RlIGFwcCB3b24ndCBxdWl0IGFsbCBieSBpdHNlbGZcbi8vIC8vIC8vIHVubGVzcyBhbiBlcnJvciBvciBwcm9jZXNzLmV4aXQoKSBoYXBwZW5zKVxuLy8gLy8gICBzdGRpbi5yZXN1bWUoKTtcbi8vIC8vXG4vLyAvLyAvLyBpIGRvbid0IHdhbnQgYmluYXJ5LCBkbyB5b3U/XG4vLyAvLyAgIHN0ZGluLnNldEVuY29kaW5nKCd1dGY4Jyk7XG4vLyAvL1xuLy8gLy8gLy8gb24gYW55IGRhdGEgaW50byBzdGRpblxuLy8gLy8gICBzdGRpbi5vbignZGF0YScsIGtleSA9PiB7XG4vLyAvLyAgICAgLy8gY3RybC1jICggZW5kIG9mIHRleHQgKVxuLy8gLy8gICAgIGlmIChrZXkgPT09ICdcXHUwMDAzJykge1xuLy8gLy8gICAgICAgcHJvY2Vzcy5leGl0KCk7XG4vLyAvLyAgICAgfVxuLy8gLy8gICAgIC8vIHdyaXRlIHRoZSBrZXkgdG8gc3Rkb3V0IGFsbCBub3JtYWwgbGlrZVxuLy8gLy8gICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdrZXk6JyArIGtleSk7XG4vLyAvLyAgIH0pO1xuLy8gLy8gfVxuLy8gLy8gaW1wb3J0ICogYXMgX2NvbmZpZyBmcm9tICcuL2pzb24vc29tZWZpbGUuanNvbic7XG4vLyAvLyBpbXBvcnQgeyBDb21tYW5kIH0gZnJvbSAnLi9qc29uL2VudW1zJztcbi8vIGltcG9ydCAqIGFzIGtleXMgZnJvbSAnLi9qc29uL2tleWNvZGVzLmpzb24nO1xuLy8gLy8gaW1wb3J0IHsgS2V5cyB9IGZyb20gJy4vanNvbi9lbnVtcyc7XG4vL1xuLy8gLy8gaW1wb3J0IHsgS2V5IH0gZnJvbSAndHMta2V5Y29kZS1lbnVtJztcbi8vXG4vLyAvLyBjb25zdCBibGFoID0gS2V5cy5cbi8vIC8vIGNvbnN0IGtleXMgPSB7fTtcbi8vIC8vIGNvbnN0IG1hcHMgPSBbXG4vLyAvLyAgIHsga2V5OiAna2V5JywgdmFsdWU6ICdrZXlDb2RlJyB9LFxuLy8gLy8gICB7IGtleTogJ2NvZGUnLCB2YWx1ZTogJ2tleUNvZGUnIH1cbi8vIC8vIF07XG4vLyAvLyBmdW5jdGlvbiBhZGRLZXkoZXZlbnQpIHtcbi8vIC8vICAgLy8gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbi8vIC8vICAgLy8gY29uc29sZS5sb2coZXZlbnQpO1xuLy8gLy9cbi8vIC8vICAgbWFwcy5mb3JFYWNoKG1hcCA9PiB7XG4vLyAvLyAgICAgY29uc3QgbWFwS2V5ID0gbWFwLmtleTtcbi8vIC8vICAgICBjb25zdCBtYXBWYWx1ZSA9IG1hcC52YWx1ZTtcbi8vIC8vICAgICBjb25zdCBldmVudEtleSA9IGV2ZW50W21hcEtleV07XG4vLyAvLyAgICAgY29uc3QgZXZlbnRWYWx1ZSA9IGV2ZW50W21hcFZhbHVlXTtcbi8vIC8vICAgICBpZiAobWFwS2V5ID09PSB1bmRlZmluZWQgfHwgbWFwVmFsdWUgPT09IHVuZGVmaW5lZCB8fCBldmVudEtleSA9PT0gdW5kZWZpbmVkIHx8IGV2ZW50VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuLy8gLy8gICAgICAgcmV0dXJuO1xuLy8gLy8gICAgIH1cbi8vIC8vICAgICBpZiAoQXJyYXkuaXNBcnJheShrZXlzW2V2ZW50S2V5XSkpIHtcbi8vIC8vICAgICAgIGlmIChrZXlzW2V2ZW50S2V5XS5pbmRleE9mKGV2ZW50VmFsdWUpID09PSAtMSkge1xuLy8gLy8gICAgICAgICBrZXlzW2V2ZW50S2V5XS5wdXNoKGV2ZW50VmFsdWUpO1xuLy8gLy8gICAgICAgfVxuLy8gLy8gICAgIH0gZWxzZSBpZiAoa2V5c1tldmVudEtleV0gIT09IHVuZGVmaW5lZCAmJiBrZXlzW2V2ZW50S2V5XSAhPT0gZXZlbnRWYWx1ZSkge1xuLy8gLy8gICAgICAgY29uc3QgdGVtcCA9IGtleXNbZXZlbnRLZXldO1xuLy8gLy8gICAgICAga2V5c1tldmVudEtleV0gPSBbdGVtcCwgZXZlbnRWYWx1ZV07XG4vLyAvLyAgICAgfSBlbHNlIHtcbi8vIC8vICAgICAgIGtleXNbZXZlbnRLZXldID0gZXZlbnRWYWx1ZTtcbi8vIC8vICAgICB9XG4vLyAvLyAgIH0pO1xuLy8gLy8gICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShrZXlzKSk7XG4vLyAvLyB9XG4vLyAvLyBPYmplY3QuZW50cmllcyhLZXkpLmZvckVhY2goZW50cnkgPT4ge1xuLy8gLy8gICAvLyBjb25zb2xlLmxvZygnZW50cnknLCBlbnRyeVswXSwgZW50cnlbMV0pO1xuLy8gLy8gICBpZiAodHlwZW9mIGVudHJ5WzBdID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgZW50cnlbMV0gPT09ICdudW1iZXInKSB7XG4vLyAvLyAgICAgYWRkS2V5KHsga2V5OiBlbnRyeVswXSwga2V5Q29kZTogZW50cnlbMV0gfSk7XG4vLyAvLyAgIH1cbi8vIC8vIH0pO1xuLy8gLy8gY29uc3QgYmxhaDogYW55W10gPSBbXTtcbi8vIC8vIE9iamVjdC5lbnRyaWVzKGtleXMpLmZvckVhY2goZW50cnkgPT4ge1xuLy8gLy8gICBjb25zdCBrZXkgPSBlbnRyeVswXSBhcyBzdHJpbmc7XG4vLyAvLyAgIGNvbnN0IHZhbCA9IGVudHJ5WzFdIGFzIG51bWJlcjtcbi8vIC8vICAgaWYgKCFibGFoW3ZhbF0pIHtcbi8vIC8vICAgICBibGFoW3ZhbF0gPSBbXTtcbi8vIC8vICAgfVxuLy8gLy8gICBibGFoW3ZhbF0ucHVzaChrZXkpO1xuLy8gLy8gICBibGFoW3ZhbF0uc29ydCgoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IGEgPiBiID8gMSA6IGEgPCBiID8gLTEgOiAwKTtcbi8vIC8vIH0pO1xuLy8gLy8gY29uc3QgbW9vOiB7IFtzOiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xuLy8gLy8gYmxhaC5mb3JFYWNoKChtLCBpKSA9PiB7XG4vLyAvLyAgIGlmIChtKSB7XG4vLyAvLyAgICAgY29uc3QgbmFtZXMgPSBtIGFzIHN0cmluZ1tdO1xuLy8gLy8gICAgIG5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG4vLyAvLyAgICAgICBtb29bbmFtZV0gPSBpO1xuLy8gLy8gICAgICAgY29uc29sZS5sb2coYCR7bmFtZX06ICR7aX1gKTtcbi8vIC8vICAgICB9KTtcbi8vIC8vICAgfVxuLy8gLy8gfSk7XG4vLyAvLyBjb25zb2xlLmxvZyhtb28pXG4vLyAvLyBjb25zdCBzdHVmZiA9IE9iamVjdC5lbnRyaWVzKGtleXMpLm1hcChlbnRyeSA9PiAoeyBrZXk6IGVudHJ5WzBdIGFzIHN0cmluZywgdmFsdWU6IChBcnJheS5pc0FycmF5KGVudHJ5WzFdKSA/IChlbnRyeVsxXSBhcyBhbnkpWzBdIDogZW50cnlbMV0pIGFzIG51bWJlciB9KSk7XG4vLyAvLyBzdHVmZi5zb3J0KChhLCBiKSA9PiBhLmtleSA+IGIua2V5ID8gMSA6IGEua2V5IDwgYi5rZXkgPyAtMSA6IDApO1xuLy8gLy8gc3R1ZmYuc29ydCgoYSwgYikgPT4gYS52YWx1ZSAtIGIudmFsdWUpO1xuLy8gLy8gc3R1ZmYuc29ydCgoYSwgYikgPT4gYS5rZXkgPiBiLmtleSA/IDEgOiBhLmtleSA8IGIua2V5ID8gLTEgOiAwKTtcbi8vIC8vIHN0dWZmLnNvcnQoKGEsIGIpID0+IGEudmFsdWUgLSBiLnZhbHVlKTtcbi8vIC8vIGNvbnN0IHJla2V5cyA9IHN0dWZmLnJlZHVjZSgocHJldiwgbmV4dCkgPT4ge1xuLy8gLy8gICBwcmV2W25leHQua2V5XSA9IG5leHQudmFsdWU7XG4vLyAvLyAgIHJldHVybiBwcmV2O1xuLy8gLy8gfSwge30gYXMgeyBbczogc3RyaW5nXTogYW55IH0pO1xuLy8gLy8gaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuLy8gLy9cbi8vIC8vIGZzLndyaXRlRmlsZVN5bmMoJy4vc3R1ZmYuanNvbicsIEpTT04uc3RyaW5naWZ5KG1vbywgdW5kZWZpbmVkLCAyKSk7XG4vLyAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYWRkS2V5KTtcbi8vIC8vXG4vL1xuLy8gLy9cbi8vIC8vXG4vLyAvLyBjb25zdCBjb25maWc6IHsgW3M6IHN0cmluZ106IHN0cmluZyB9ID0gX2NvbmZpZztcbi8vIC8vXG4vLyAvLyBjb25zb2xlLmxvZygnS2V5Lk8nLCBLZXkuTywgS2V5W0tleS5PXS50b1N0cmluZygpKTtcbi8vIC8vIGNvbnNvbGUubG9nKCdDb21tYW5kLk9wdGlvbnMnLCBDb21tYW5kLk9wdGlvbnMsIENvbW1hbmRbQ29tbWFuZC5PcHRpb25zXS50b1N0cmluZygpKTtcbi8vIC8vIGNvbnNvbGUubG9nKCdDb21tYW5kJywgQ29tbWFuZCk7XG4vLyAvLyBjb25zb2xlLmxvZygnY29uZmlnJywgY29uZmlnKTtcbi8vIC8vXG4vLyAvLyBjb25zdCBibGFoQTogQ29tbWFuZCA9IENvbW1hbmQuQmFjaztcbi8vIC8vIGNvbnN0IGJsYWhCOiBDb21tYW5kID0gQ29tbWFuZFsnQmFjayddO1xuLy8gLy8gY29uc3QgYmxhaEM6IHN0cmluZyA9IENvbW1hbmRbYmxhaEFdO1xuLy8gLy8gY29uc3QgYmxhaEQ6IHN0cmluZyA9IENvbW1hbmRbYmxhaEJdO1xuLy8gLy8gY29uc3QgYmxhaEU6IHN0cmluZyA9IENvbW1hbmRbMjBdO1xuLy8gLy9cbi8vIC8vIGNvbnNvbGUubG9nKCdibGFoQScsIGJsYWhBLCAnYmxhaEInLCBibGFoQiwgJ2JsYWhDJywgYmxhaEMsICdibGFoRCcsIGJsYWhELCAnYmxhaEUnLCBibGFoRSlcbi8vIC8vXG4vLyAvLyBPYmplY3QuZW50cmllcyhjb25maWcpLmZvckVhY2goKGVudHJ5LCBpKSA9PiB7XG4vLyAvLyAgIGNvbnN0IGNvbmZpZ0tleSA9IGVudHJ5WzBdO1xuLy8gLy8gICBjb25zdCBjb25maWdDb21tYW5kID0gZW50cnlbMV07XG4vLyAvLyAgIGNvbnN0IG1hcHBlZEtleSA9IC8sLy50ZXN0KGNvbmZpZ0tleSkgP1xuLy8gLy8gICAgIGNvbmZpZ0tleS5zcGxpdCgnLCcpLm1hcChrZXkgPT4gS2V5W2tleSBhcyBhbnldKS5qb2luKCcsJykgOlxuLy8gLy8gICAgIEtleVtjb25maWdLZXkgYXMgYW55XTtcbi8vIC8vICAgY29uc3QgbWFwcGVkQ29tbWFuZCA9IENvbW1hbmRbY29uZmlnQ29tbWFuZCBhcyBhbnldO1xuLy8gLy8gICBjb25zb2xlLmxvZyhgS2V5YCwgY29uZmlnS2V5LCBtYXBwZWRLZXksIEtleVttYXBwZWRLZXkgYXMgYW55XSwgbWFwcGVkS2V5ID09PSBLZXkuTyBhcyBhbnksIEtleVttYXBwZWRLZXkgYXMgYW55XSA9PT0gS2V5Lk8gYXMgYW55KTtcbi8vIC8vICAgY29uc29sZS5sb2coYENvbW1hbmRgLCBjb25maWdDb21tYW5kLCBtYXBwZWRDb21tYW5kLCBDb21tYW5kW21hcHBlZENvbW1hbmQgYXMgYW55XSwgbWFwcGVkQ29tbWFuZCA9PT0gQ29tbWFuZC5PcHRpb25zIGFzIGFueSwgQ29tbWFuZFttYXBwZWRDb21tYW5kIGFzIGFueV0gPT09IENvbW1hbmQuT3B0aW9ucyBhcyBhbnkpO1xuLy8gLy8gfSk7XG4vLyAvL1xuLy8gLy8gY29uc3QgZXZlbnQgPSAwO1xuIl19