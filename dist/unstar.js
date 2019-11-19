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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Vuc3Rhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQTBCO0FBQzFCLDhDQUE4QztBQUM5QywrQkFBK0I7QUFDL0IsY0FBYztBQUNkLHVDQUF1QztBQUN2QyxzQkFBc0I7QUFDdEIscUJBQXFCO0FBQ3JCLFVBQVU7QUFDVixjQUFjO0FBQ2QsUUFBUTtBQUNSLElBQUk7QUFFSixLQUFLLFVBQVUsSUFBSTtJQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQy9CLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN2RCxNQUFNO1NBQ1A7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3pCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNsQjtJQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDL0IsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1IsTUFBTTtTQUNQO1FBQ0QsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQzNELElBQUksSUFBSSxFQUFFO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2Q7UUFDRCxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqQztBQUNILENBQUM7QUFFRCxLQUFLLFVBQVUsTUFBTTtJQUNuQixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEUsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUUvQixLQUFLLE1BQU0sT0FBTyxJQUFJLFFBQVEsRUFBRTtZQUM5QixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyRSxPQUFPLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRS9DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9CLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzVELElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7b0JBQy9CLE1BQU07aUJBQ1A7YUFDRjtZQUVELE1BQU0sSUFBSSxFQUFFLENBQUM7WUFFYixPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6QztRQUNELElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDbEI7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZnVuY3Rpb24gd2FpdChtcywgZm4pIHtcclxuLy8gICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4vLyAgICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbi8vICAgICAgIHRyeSB7XHJcbi8vICAgICAgICAgcmVzb2x2ZShmbiAmJiAoYXdhaXQgZm4oKSkpO1xyXG4vLyAgICAgICB9IGNhdGNoIChlKSB7XHJcbi8vICAgICAgICAgcmVqZWN0KGUpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9LCBtcyk7XHJcbi8vICAgfSk7XHJcbi8vIH1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGRvaXQoKSB7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwMDA7IGkrKykge1xyXG4gICAgYXdhaXQgd2FpdCgxMDApO1xyXG4gICAgY29uc3Qgc2hvd01vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNob3dfbW9yZVwiKTtcclxuICAgIGlmICghc2hvd01vcmUgfHwgc2hvd01vcmUuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmctaGlkZVwiKSkge1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwiU2hvdyBtb3JlXCIpO1xyXG4gICAgc2hvd01vcmUuY2xpY2soKTtcclxuICB9XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwMDAwOyBpKyspIHtcclxuICAgIGF3YWl0IHdhaXQoMTAwKTtcclxuICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXBpc29kZV9yb3dcIik7XHJcbiAgICBpZiAoIXJvdykge1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICAgIGNvbnN0IHN0YXIgPSByb3cucXVlcnlTZWxlY3RvcihcIi5lcGlzb2RlX3N0YXIuaXNfc3RhcnJlZFwiKTtcclxuICAgIGlmIChzdGFyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiU3RhcjogXCIsIHJvdy5pbm5lclRleHQucmVwbGFjZSgvW1xcblxccl0vZywgXCIgIFwiKSk7XHJcbiAgICAgIHN0YXIuY2xpY2soKTtcclxuICAgIH1cclxuICAgIHJvdy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJvdyk7XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiB1bnN0YXIoKSB7XHJcbiAgY29uc3QgcG9kY2FzdHMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wb2RjYXN0XCIpXS5yZXZlcnNlKCk7XHJcbiAgaWYgKHBvZGNhc3RzICYmIHBvZGNhc3RzLmxlbmd0aCkge1xyXG5cclxuICAgIGZvciAoY29uc3QgcG9kY2FzdCBvZiBwb2RjYXN0cykge1xyXG4gICAgICBhd2FpdCB3YWl0KDEwMCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiUG9kY2FzdDogXCIsIHBvZGNhc3QuaW5uZXJUZXh0LnJlcGxhY2UoL1tcXG5cXHJdL2csIFwiICBcIikpO1xyXG4gICAgICBwb2RjYXN0LnF1ZXJ5U2VsZWN0b3IoXCIucG9kY2FzdF90ZXh0XCIpLmNsaWNrKCk7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDAwMDsgaSsrKSB7XHJcbiAgICAgICAgYXdhaXQgd2FpdCgxMDApO1xyXG4gICAgICAgIGNvbnN0IG5vbnN0YXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lcGlzb2RlX3N0YXJcIik7XHJcbiAgICAgICAgaWYgKG5vbnN0YXJzICYmIG5vbnN0YXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBhd2FpdCBkb2l0KCk7XHJcblxyXG4gICAgICBwb2RjYXN0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocG9kY2FzdCk7XHJcbiAgICB9XHJcbiAgICB3YWl0KDEwLCB1bnN0YXIpO1xyXG4gIH1cclxufVxyXG4iXX0=