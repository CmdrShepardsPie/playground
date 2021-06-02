import {Commands, Keys} from "./json/enums";
import CapsService from "./services/caps.service";
import KeyService from "./services/key.service";
import NumberService from "./services/number.service";
import OutputService from "./services/output.service";
import StringService from "./services/string.service";

const keys = new KeyService();
const outputs = new OutputService();
outputs.use(keys);
// outputs.clear();

const caps = new CapsService();
caps.use(keys);
outputs.use(caps);

const numbers = new NumberService();
const strings = new StringService();
numbers.use(keys);
strings.use(numbers);
outputs.use(strings);

const map = new Map<Keys, Commands>();
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
