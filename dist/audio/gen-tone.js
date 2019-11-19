(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "module-alias/register", "./fs-helpers"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("module-alias/register");
    const fs_helpers_1 = require("./fs-helpers");
    // const base = 2551;
    async function start() {
        const frequency = 44100;
        const duration = 10; // seconds
        const tone = 1000;
        await fs_helpers_1.makeDirs("audio-output");
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
    async function generate(frequency, duration, tone, outBits) {
        const outLevel = (Math.pow(2, outBits - 1) / 2);
        const samples = frequency * duration;
        let buffer;
        if (outBits > 16) {
            buffer = new Buffer(samples * 4);
        }
        else if (outBits > 8) {
            buffer = new Buffer(samples * 2);
        }
        else {
            buffer = new Buffer(samples);
        }
        const arr = [];
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
        const dither = [];
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
            }
            else if (outBits > 8) {
                buffer.writeInt16LE(rounded, i * 2);
            }
            else {
                buffer.writeInt8(rounded, i);
            }
        }
        await fs_helpers_1.writeFileAsync(`./audio-output/tone-${frequency}-${tone}-${outBits}.pcm`, buffer);
    }
    exports.default = start();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuLXRvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXVkaW8vZ2VuLXRvbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSxpQ0FBK0I7SUFFL0IsNkNBQXNEO0lBRXRELHFCQUFxQjtJQUVyQixLQUFLLFVBQVUsS0FBSztRQUNsQixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDeEIsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsVUFBVTtRQUMvQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFFbEIsTUFBTSxxQkFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9CLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIsc0RBQXNEO1FBQ3RELDJCQUEyQjtRQUMzQixJQUFJO1FBQ0osTUFBTSxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsTUFBTSxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsTUFBTSxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0MsTUFBTSxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0MsTUFBTSxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELEtBQUssVUFBVSxRQUFRLENBQUMsU0FBaUIsRUFBRSxRQUFnQixFQUFFLElBQVksRUFBRSxPQUFlO1FBQ3hGLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWhELE1BQU0sT0FB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RyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQkFDNUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7aUJBQzVCO2FBQ0Y7WUFFRCxJQUFJLE9BQU8sR0FBRyxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNyQztpQkFBTSxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUU7Z0JBQ3RCLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNyQztpQkFBTTtnQkFDTCxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM5QjtTQUNGO1FBRUQsTUFBTSwyQkFBYyxDQUFDLHVCQUF1QixTQUFTLElBQUksSUFBSSxJQUFJLE9BQU8sTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFGLENBQUM7SUFFRCxrQkFBZSxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIm1vZHVsZS1hbGlhcy9yZWdpc3RlclwiO1xuXG5pbXBvcnQge21ha2VEaXJzLCB3cml0ZUZpbGVBc3luY30gZnJvbSBcIi4vZnMtaGVscGVyc1wiO1xuXG4vLyBjb25zdCBiYXNlID0gMjU1MTtcblxuYXN5bmMgZnVuY3Rpb24gc3RhcnQoKSB7XG4gIGNvbnN0IGZyZXF1ZW5jeSA9IDQ0MTAwO1xuICBjb25zdCBkdXJhdGlvbiA9IDEwOyAvLyBzZWNvbmRzXG4gIGNvbnN0IHRvbmUgPSAxMDAwO1xuXG4gIGF3YWl0IG1ha2VEaXJzKFwiYXVkaW8tb3V0cHV0XCIpO1xuICAvLyBsZXQgaSA9IDE1ICogMjtcbiAgLy8gd2hpbGUgKGkgPiAxKSB7XG4gIC8vICAgYXdhaXQgZ2VuZXJhdGUoZnJlcXVlbmN5LCBkdXJhdGlvbiwgdG9uZSwgaSwgMTUpO1xuICAvLyAgIGkgPSBNYXRoLnJvdW5kKGkgLyAyKTtcbiAgLy8gfVxuICBhd2FpdCBnZW5lcmF0ZShmcmVxdWVuY3ksIGR1cmF0aW9uLCB0b25lLCAzMik7XG4gIGF3YWl0IGdlbmVyYXRlKGZyZXF1ZW5jeSwgZHVyYXRpb24sIHRvbmUsIDE2KTtcbiAgYXdhaXQgZ2VuZXJhdGUoZnJlcXVlbmN5LCBkdXJhdGlvbiwgdG9uZSwgOCk7XG4gIGF3YWl0IGdlbmVyYXRlKGZyZXF1ZW5jeSwgZHVyYXRpb24sIHRvbmUsIDQpO1xuICBhd2FpdCBnZW5lcmF0ZShmcmVxdWVuY3ksIGR1cmF0aW9uLCB0b25lLCAyKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGUoZnJlcXVlbmN5OiBudW1iZXIsIGR1cmF0aW9uOiBudW1iZXIsIHRvbmU6IG51bWJlciwgb3V0Qml0czogbnVtYmVyKSB7XG4gIGNvbnN0IG91dExldmVsID0gKE1hdGgucG93KDIsIG91dEJpdHMgLSAxKSAvIDIpO1xuXG4gIGNvbnN0IHNhbXBsZXMgPSBmcmVxdWVuY3kgKiBkdXJhdGlvbjtcblxuICBsZXQgYnVmZmVyO1xuICBpZiAob3V0Qml0cyA+IDE2KSB7XG4gICAgYnVmZmVyID0gbmV3IEJ1ZmZlcihzYW1wbGVzICogNCk7XG4gIH0gZWxzZSBpZiAob3V0Qml0cyA+IDgpIHtcbiAgICBidWZmZXIgPSBuZXcgQnVmZmVyKHNhbXBsZXMgKiAyKTtcbiAgfSBlbHNlIHtcbiAgICBidWZmZXIgPSBuZXcgQnVmZmVyKHNhbXBsZXMpO1xuICB9XG5cbiAgY29uc3QgYXJyOiBudW1iZXJbXSA9IFtdO1xuICBjb25zdCBiYXNlID0gZnJlcXVlbmN5IC8gKE1hdGguUEkgKiAyKTtcblxuICAvLyBnZW5lcmF0ZVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNhbXBsZXM7IGkrKykge1xuICAgIC8vIHRvbmUgPSAoaSAvIGR1cmF0aW9uKSAvIDI7XG4gICAgY29uc3QgdmFsID0gTWF0aC5zaW4oaSAqICgodG9uZSkgLyBiYXNlKSk7XG4gICAgYXJyLnB1c2godmFsKTtcbiAgfVxuXG4gIC8vIGNvbnN0IGRpdGhlciA9IFtcbiAgLy8gICA3IC8gMTYsXG4gIC8vICAgMyAvIDE2LCA1IC8gMTYsIDEgLyAxNixcbiAgLy8gXTtcbiAgLy8gY29uc3QgZGl0aGVyID0gW1xuICAvLyAgIDcgLyA0OCwgNSAvIDQ4LFxuICAvLyAgIDMgLyA0OCwgNSAvIDQ4LCA3IC8gNDgsIDUgLyA0OCwgMyAvIDQ4LFxuICAvLyAgIDEgLyA0OCwgMyAvIDQ4LCA1IC8gNDgsIDMgLyA0OCwgMSAvIDQ4LFxuICAvLyBdO1xuICBjb25zdCBkaXRoZXI6IG51bWJlcltdID0gW107XG4gIGNvbnN0IGRpdGhlckxlbmd0aCA9IDQ7XG4gIGNvbnN0IGRpdGhlclBlYWsgPSAzMiAvIG91dEJpdHM7XG4gIGNvbnNvbGUubG9nKFwiRGl0aGVyIExlbmd0aFwiLCBkaXRoZXJMZW5ndGgsIFwiRGl0aGVyIFBlYWtcIiwgZGl0aGVyUGVhayk7XG4gIGZvciAobGV0IHggPSAwOyB4IDwgZGl0aGVyTGVuZ3RoOyB4KyspIHtcbiAgICBjb25zdCB0b3AgPSBkaXRoZXJQZWFrICogKCh4ICsgMSkgLyBkaXRoZXJMZW5ndGgpO1xuICAgIGNvbnN0IGJvdHRvbSA9IChkaXRoZXJMZW5ndGggKiA0KTtcbiAgICBkaXRoZXIucHVzaCh0b3AgLyBib3R0b20pO1xuICAgIGNvbnNvbGUubG9nKGAke3RvcH0gLyAke2JvdHRvbX1gKTtcbiAgfVxuICBkaXRoZXIuc29ydCgoYSwgYikgPT4gYiAtIGEpO1xuICBjb25zb2xlLmxvZyhcIkRpdGhlcmluZ1wiLCBvdXRCaXRzLCBcImJpdHMgdG9cIiwgZGl0aGVyKTtcbiAgLy8gbWl4XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2FtcGxlczsgaSsrKSB7XG4gICAgY29uc3Qgb2xkVmFsID0gYXJyW2ldO1xuICAgIGNvbnN0IG5ld1ZhbCA9IG9sZFZhbCAqIG91dExldmVsO1xuICAgIGNvbnN0IHJvdW5kZWQgPSBNYXRoLnJvdW5kKG5ld1ZhbCk7XG4gICAgY29uc3QgZXJyb3IgPSBuZXdWYWwgLSByb3VuZGVkO1xuXG4gICAgYXJyW2ldID0gcm91bmRlZDtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGRpdGhlci5sZW5ndGg7IHgrKykge1xuICAgICAgY29uc3QgaW5kZXggPSBpICsgeCArIDE7XG4gICAgICBjb25zdCBkaXRoID0gZGl0aGVyW3hdO1xuICAgICAgaWYgKGFycltpbmRleF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBhcnJbaW5kZXhdICs9IGVycm9yICogZGl0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3V0Qml0cyA+IDE2KSB7XG4gICAgICBidWZmZXIud3JpdGVJbnQzMkxFKHJvdW5kZWQsIGkgKiA0KTtcbiAgICB9IGVsc2UgaWYgKG91dEJpdHMgPiA4KSB7XG4gICAgICBidWZmZXIud3JpdGVJbnQxNkxFKHJvdW5kZWQsIGkgKiAyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVyLndyaXRlSW50OChyb3VuZGVkLCBpKTtcbiAgICB9XG4gIH1cblxuICBhd2FpdCB3cml0ZUZpbGVBc3luYyhgLi9hdWRpby1vdXRwdXQvdG9uZS0ke2ZyZXF1ZW5jeX0tJHt0b25lfS0ke291dEJpdHN9LnBjbWAsIGJ1ZmZlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YXJ0KCk7XG4iXX0=