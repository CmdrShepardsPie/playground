const synth = window.speechSynthesis;
const utterThis = new SpeechSynthesisUtterance();
utterThis.volume = 2;
const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';

function say(text, voice, pitch, rate) {
  console.log('say', text, voice, pitch, rate);
  return new Promise(resolve => {
    utterThis.onend = () => {
      console.log('say end');
      resolve();
    };
    utterThis.onpause = () => {
      console.log('say pause');
      resolve();
    };
    utterThis.onerror = () => {
      console.log('say error');
      resolve();
    };
    utterThis.onboundary = () => {
      console.log('say boundary');
      // resolve();
    };
    utterThis.text = text;
    utterThis.voice = voice;
    utterThis.pitch = pitch;
    utterThis.rate = rate;
    // console.log('speak start');
    synth.speak(utterThis);
    // console.log('speak end');
  })
}
//
// function wait(ms, fn) {
//   console.log('wait', ms);
//   return new Promise((resolve, reject) => {
//     window.setTimeout(async () => {
//       try {
//         resolve(fn && await fn());
//       } catch (e) {
//         reject(e);
//       }
//     }, ms);
//   });
// }

function next(number) {
  const waitFor = number || Math.random() * 60 * 60 * 1000;
  console.log('next', waitFor);
  setTimeout(async () => {
    const voices = synth.getVoices();
    const voicenum = Math.floor(Math.random() * voices.length);
    const voice = voices[voicenum];
    // const pitch = 0.1;
    // const rate = 0.5;
    const pitch = Math.random();
    const rate = Math.random();
    // console.log('voice', voicenum, voice, pitch, rate);
    const words = [];
    const max = Math.round((Math.random() * Math.random() * Math.random() * 20));
    for (let i = 0; i < max; i++) {
      let number = Math.floor(Math.random() * Math.random() * Math.random() * 126);
      if (number >= 100) {
        number = letters[number - 100];
        console.log('Using letter', number);
      }
      if (typeof number === 'number' && Math.floor(Math.random() * 10) === 0) {
        number = number * -1;
        console.log('Using negative', number);
      }
      if (Math.floor(Math.random() * 10) === 0) {
        number = number + Math.random();
        if (typeof number === 'number') {
          number = number.toFixed(Math.floor(Math.random() * 10));
        }
        console.log('Using decimal', number);
      }
      if (i === 0 && Math.floor(Math.random() * 10) === 0) {
        number = `Repeat after me`;
      }
      if (i === max - 1 && Math.floor(Math.random() * 10) === 0) {
        number = `That's number wang`;
      }
      words.push(number);
    }
    if (words.length) {
      await say(words.join('. '), voice, pitch, rate);
    }
    // await wait(400);
    next();
  }, waitFor);
}

next(1000);
