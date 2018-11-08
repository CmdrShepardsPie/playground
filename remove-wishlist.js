function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

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
