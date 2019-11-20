let everythingString: string = '';
let step: number = 0;
function everything(): void {
  const synth: SpeechSynthesis = window.speechSynthesis;
  const utterThis: SpeechSynthesisUtterance = new SpeechSynthesisUtterance();
  utterThis.volume = 2;
  // const letters: string = 'QWERTYUIOPASDFGHJKLZXCVBNM';

  function say(text: string, voice: SpeechSynthesisVoice, pitch: number, rate: number): Promise<void> {
    console.log('say', text, voice.name, pitch, rate);
    return new Promise((resolve: (value?: (PromiseLike<void> | void)) => void): void => {
      utterThis.onend = (): void => {
        console.log('say end');
        resolve();
      };
      utterThis.onpause = (): void => {
        console.log('say pause');
        resolve();
      };
      utterThis.onerror = (): void => {
        console.log('say error');
        resolve();
      };
      utterThis.onboundary = (): void => {
        console.log('say boundary');
      };
      utterThis.text = text;
      utterThis.voice = voice;
      utterThis.pitch = pitch;
      utterThis.rate = rate;
      synth.speak(utterThis);
    });
  }

  function next(waitFor: number = Math.random() * 60 * 1000): void {
    console.log('next', waitFor);
    setTimeout(async () => {
      const voices: SpeechSynthesisVoice[] = synth.getVoices();
      const voicenum: number = Math.floor(Math.random() * voices.length);
      const voice: SpeechSynthesisVoice = voices[voicenum];
      const pitch: number = Math.random() + 0.5;
      const rate: number = Math.random() + 0.5;
      const words: string[] = ['activate'];
      const max: number = 1 + Math.random() * 10;
      for (let i: number = 0; i <= max; i++) {
        const speakCode: string = everythingString.charCodeAt(step).toString().split('').join(' ');
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
