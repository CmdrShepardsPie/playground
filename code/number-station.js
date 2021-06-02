"use strict";
let everythingString = '';
let step = 0;
function everything() {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance();
    utterThis.volume = 2;
    // const letters: string = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    function say(text, voice, pitch, rate) {
        console.log('say', text, voice.name, pitch, rate);
        return new Promise((resolve) => {
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
            };
            utterThis.text = text;
            utterThis.voice = voice;
            utterThis.pitch = pitch;
            utterThis.rate = rate;
            synth.speak(utterThis);
        });
    }
    function next(waitFor = Math.random() * 60 * 1000) {
        console.log('next', waitFor);
        setTimeout(async () => {
            const voices = synth.getVoices();
            const voicenum = Math.floor(Math.random() * voices.length);
            const voice = voices[voicenum];
            const pitch = Math.random() + 0.5;
            const rate = Math.random() + 0.5;
            const words = ['activate'];
            const max = 1 + Math.random() * 10;
            for (let i = 0; i <= max; i++) {
                const speakCode = everythingString.charCodeAt(step).toString().split('').join(' ');
                words.push(speakCode);
                step++;
                if (step >= everythingString.length) {
                    step = 0;
                }
            }
            console.log('step', step, '/', everythingString.length - 1);
            if (words.length) {
                await say(words.join(' ... '), voice, pitch, rate);
            }
            next();
        }, waitFor);
    }
    next(1000);
}
everythingString = everything.toString().replace(/[ \r\n]+/g, ' ').replace(/[ \r\n]+/g, ' ');
everything();
// .replace(/-/g, ' negative '));
//# sourceMappingURL=number-station.js.map