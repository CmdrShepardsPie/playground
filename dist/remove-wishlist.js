"use strict";
// function wait(ms) {
//   return new Promise((resolve) => {
//     window.setTimeout(resolve, ms);
//   });
// }
async function doIt() {
    const d = document.querySelector(".delete");
    if (d) {
        d.click();
        await wait(100);
        const b = document.querySelector(".btn_green_white_innerfade.btn_medium");
        if (b) {
            b.click();
        }
        setTimeout(doIt, 100);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLXdpc2hsaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JlbW92ZS13aXNobGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQXNCO0FBQ3RCLHNDQUFzQztBQUN0QyxzQ0FBc0M7QUFDdEMsUUFBUTtBQUNSLElBQUk7QUFFSixLQUFLLFVBQVUsSUFBSTtJQUNqQixNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxFQUFFO1FBQ0wsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ1YsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxFQUFFO1lBQ0wsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ1g7UUFDRCxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQ3ZCO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGZ1bmN0aW9uIHdhaXQobXMpIHtcclxuLy8gICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuLy8gICAgIHdpbmRvdy5zZXRUaW1lb3V0KHJlc29sdmUsIG1zKTtcclxuLy8gICB9KTtcclxuLy8gfVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZG9JdCgpIHtcclxuICBjb25zdCBkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZWxldGVcIik7XHJcbiAgaWYgKGQpIHtcclxuICAgIGQuY2xpY2soKTtcclxuICAgIGF3YWl0IHdhaXQoMTAwKTtcclxuICAgIGNvbnN0IGIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bl9ncmVlbl93aGl0ZV9pbm5lcmZhZGUuYnRuX21lZGl1bVwiKTtcclxuICAgIGlmIChiKSB7XHJcbiAgICAgIGIuY2xpY2soKTtcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoZG9JdCwgMTAwKTtcclxuICB9XHJcbn1cclxuIl19