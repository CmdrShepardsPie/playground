import "module-alias/register";

import {makeDirs, writeFileAsync} from "./fs-helpers";

// const base = 2551;

async function start() {
  const frequency = 44100;
  const duration = 10; // seconds
  const tone = 1000;

  await makeDirs("audio-output");
  // let i = 15 * 2;
  // while (i > 1) {
  //   await generate(frequency, duration, tone, i, 15);
  //   i = Math.round(i / 2);
  // }
  await generate(frequency, duration, tone, 32);
  await generate(frequency, duration, tone, 16);
  await generate(frequency, duration, tone, 8);
  await generate(frequency, duration, tone, 4);
  await generate(frequency, duration, tone, 2);
}

async function generate(frequency: number, duration: number, tone: number, outBits: number) {
  const outLevel = (Math.pow(2, outBits - 1) / 2);

  const samples = frequency * duration;

  let buffer;
  if (outBits > 16) {
    buffer = new Buffer(samples * 4);
  } else if (outBits > 8) {
    buffer = new Buffer(samples * 2);
  } else {
    buffer = new Buffer(samples);
  }

  const arr: number[] = [];
  const base = frequency / (Math.PI * 2);

  // generate
  for (let i = 0; i < samples; i++) {
    // tone = (i / duration) / 2;
    const val = Math.sin(i * ((tone) / base));
    arr.push(val);
  }

  // const dither = [
  //   7 / 16,
  //   3 / 16, 5 / 16, 1 / 16,
  // ];
  // const dither = [
  //   7 / 48, 5 / 48,
  //   3 / 48, 5 / 48, 7 / 48, 5 / 48, 3 / 48,
  //   1 / 48, 3 / 48, 5 / 48, 3 / 48, 1 / 48,
  // ];
  const dither: number[] = [];
  const ditherLength = 4;
  const ditherPeak = 32 / outBits;
  console.log("Dither Length", ditherLength, "Dither Peak", ditherPeak);
  for (let x = 0; x < ditherLength; x++) {
    const top = ditherPeak * ((x + 1) / ditherLength);
    const bottom = (ditherLength * 4);
    dither.push(top / bottom);
    console.log(`${top} / ${bottom}`);
  }
  dither.sort((a, b) => b - a);
  console.log("Dithering", outBits, "bits to", dither);
  // mix
  for (let i = 0; i < samples; i++) {
    const oldVal = arr[i];
    const newVal = oldVal * outLevel;
    const rounded = Math.round(newVal);
    const error = newVal - rounded;

    arr[i] = rounded;
    for (let x = 0; x < dither.length; x++) {
      const index = i + x + 1;
      const dith = dither[x];
      if (arr[index] !== undefined) {
        arr[index] += error * dith;
      }
    }

    if (outBits > 16) {
      buffer.writeInt32LE(rounded, i * 4);
    } else if (outBits > 8) {
      buffer.writeInt16LE(rounded, i * 2);
    } else {
      buffer.writeInt8(rounded, i);
    }
  }

  await writeFileAsync(`./audio-output/tone-${frequency}-${tone}-${outBits}.pcm`, buffer);
}

export default start();
