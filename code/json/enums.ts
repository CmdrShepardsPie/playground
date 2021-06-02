export enum Commands {
  Question,
  Left,
  Right,
  Up,
  Down,
  ChannelUp,
  ChannelDown,
  LastChannel,
  VolumeUp,
  VolumeDown,
  Safe,
  Grid,
  Player,
  Mute,
  Menu,
  Guide,
  Options,
  Record,
  Info,
  Select,
  Back,
  Exit,
  Reset,
}

type Keys = number;
import * as Keys from "./keycodes.json";
// "Invert" the key/val pair so we can do a reverse lookup
Object.entries(Keys).forEach((entry) => {
  const key = entry[0].toString();
  const val = entry[1].toString();
  if (!Keys[val] || (typeof Keys[val] === "string" && Keys[val].length > key.length)) {
    Keys[val] = key;
  }
});
export {Keys};
