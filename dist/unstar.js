"use strict";
// function wait(ms, fn) {
//   return new Promise((resolve, reject) => {
//     setTimeout(async () => {
//       try {
//         resolve(fn && (await fn()));
//       } catch (e) {
//         reject(e);
//       }
//     }, ms);
//   });
// }
async function doit() {
    for (let i = 0; i < 100000; i++) {
        await wait(100);
        const showMore = document.querySelector(".show_more");
        if (!showMore || showMore.classList.contains("ng-hide")) {
            break;
        }
        console.log("Show more");
        showMore.click();
    }
    for (let i = 0; i < 100000; i++) {
        await wait(100);
        const row = document.querySelector(".episode_row");
        if (!row) {
            break;
        }
        const star = row.querySelector(".episode_star.is_starred");
        if (star) {
            console.log("Star: ", row.innerText.replace(/[\n\r]/g, "  "));
            star.click();
        }
        row.parentNode.removeChild(row);
    }
}
async function unstar() {
    const podcasts = [...document.querySelectorAll(".podcast")].reverse();
    if (podcasts && podcasts.length) {
        for (const podcast of podcasts) {
            await wait(100);
            console.log("Podcast: ", podcast.innerText.replace(/[\n\r]/g, "  "));
            podcast.querySelector(".podcast_text").click();
            for (let i = 0; i < 100000; i++) {
                await wait(100);
                const nonstars = document.querySelectorAll(".episode_star");
                if (nonstars && nonstars.length) {
                    break;
                }
            }
            await doit();
            podcast.parentNode.removeChild(podcast);
        }
        wait(10, unstar);
    }
}
