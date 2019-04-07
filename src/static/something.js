var thing = document.querySelector("#thing");
var text = document.querySelector("#text");
var fps = 30;
var fpsMs = 1000 / fps;
var maxValue = 100;
var seconds = 300;
var incrementPerFrame = maxValue / fps / seconds;
console.log("fps", fps, "fps_ms", fpsMs, "seconds", seconds, "incrementPerFrame", incrementPerFrame);
var last = 0;
var currentTime = 0;
var int = setInterval(function () {
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
        var stuff = Math.min((Math.random() * (currentTime - last)) + last, 100);
        last = stuff;
        thing.style.width = Math.round(last) * 10 + "px";
        text.innerText = Math.round(last) + "%";
        // console.log('currentTime', currentTime);
        // console.log('last', last);
    }
}
