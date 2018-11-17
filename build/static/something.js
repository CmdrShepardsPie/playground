"use strict";
const thing = document.querySelector("#thing");
const text = document.querySelector("#text");
const fps = 30;
const fpsMs = 1000 / fps;
const maxValue = 100;
const seconds = 300;
const incrementPerFrame = maxValue / fps / seconds;
console.log("fps", fps, "fps_ms", fpsMs, "seconds", seconds, "incrementPerFrame", incrementPerFrame);
let last = 0;
let currentTime = 0;
const int = setInterval(() => {
    currentTime += incrementPerFrame;
    if (Math.round(Math.random() * (seconds / 10)) === 0) {
        doAnimation();
    }
    if (Math.round(currentTime) >= maxValue) {
        clearInterval(int);
        last = maxValue;
        doAnimation();
        console.log("done");
    }
}, fpsMs);
function doAnimation() {
    if (thing && text) {
        const stuff = Math.min((Math.random() * (currentTime - last)) + last, 100);
        last = stuff;
        thing.style.width = `${Math.round(last) * 10}px`;
        text.innerText = `${Math.round(last)}%`;
    }
}
