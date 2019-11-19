/*
* IMPORTANT! You MUST navigate to your "All activity" timeline for this to work!
* https://www.facebook.com/[your username]/allactivity
* You can also get to this by clicking your name to get to your own timeline, then clicking "View Activity Log"
*/

/*
* WARNING! This will start immediately, and delete *everything* it can!
* Don't run if you don't want to lose anything and/or havent backed it up!
*/

/*
* This script will attempt to hide and/or delete everything from your Facebook timeline.
*
* You will open the browser developer tools and copy-paste this whole script into the "console".
* (Usually press and hold Mac: Cmd-(Alt/Option)-I or Window: Ctrl-Shift-I)
*
* Facebook shows a message in the developer tool console warning you about pasting scripts,
*   and they're absolutely right, be very careful about pasting things here,
*   as it will have full access to your browser and anything you can do or see.
*
* This runs in multiple phases, setting privacy to "Only me" or "Only me" if it can,
*   then setting post visibility to "Hidden from timeline",
*   then attempts to unlike or untag, and finally delete it, if possible.
*
* It can take a very long time to run depending on how much it will delete.
* The longer it runs, the more it deletes. It can take hours or days.
*
* This process is permanent and cannot be reversed or undone, so do a Facebook backup first!
*
* Also consider going through the various privacy settings on your About page and account settings and
*   locking those settings down too, if you want to be extra sure. You will have to delete any personal
*   details from your account and "About" section yourself.
*   Check out https://fieldguide.gizmodo.com/heres-how-to-share-as-little-data-as-possible-without-d-1823915628
*
* This comes with absolutely no warranty, guarantees, or support. You run this at your own risk!
*/
const timeout = () => 500;

// Main loop of the program, it will scroll up and down and
// look for "Load more" style links to keep expanding the timeline
async function nextPage() {
// console.log(`nextPage`);
  try {
    // window.scrollTo(0, 1000000);
    // await clickItem(document.querySelectorAll<HTMLElement>(`[data-year] a`));
    // await clickItem(document.querySelectorAll<HTMLElement>(`.uiMorePager a`));
    // await clickItem(document.querySelectorAll<HTMLElement>(`[data-year] a`));
    // await clickItem(document.querySelectorAll<HTMLElement>(`.uiMorePager a`));
    // await clickItem(document.querySelectorAll<HTMLElement>(`[data-year] a`));
    // await clickItem(document.querySelectorAll<HTMLElement>(`.uiMorePager a`));
    await processRows([...document.querySelectorAll<HTMLElement>(`.uiList .uiBoxWhite`)]);
    await clickItem([...document.querySelectorAll<HTMLElement>(`.uiMorePager a`)]);
  } catch (e) { console.log(`nextPage error`, e); }
  // window.scrollTo(0, 0);
  setTimeout(nextPage, timeout());
}

// Go down each line of your timeline looking for action buttons
async function processRows(rows: HTMLElement[]) {
// console.log("processRows");
  for (const row of rows) try {
    await changeSharing(row);
    await cleanupMenu();
    await changeTimeline(row);
    await cleanupMenu();
    await clickItem(await getDialogFor(`Close`));
    await cleanupElement(row);
  } catch (e) {
    console.log(`processRows error`, e);
  }
}

// If the privacy of the timeline item can be changed, set it to Only me
async function changeSharing(row: HTMLElement) {
// console.log("changeSharing", row);
  const sharing = row.querySelector<HTMLElement>(`[aria-label~="Shared"]`);
  if (sharing) {
    await clickItem(sharing);
    await clickItem(await getMenuFor(`Only me (+)`));
    await clickItem(sharing);
    return await clickItem(await getMenuFor(`Only me`));
  }
}

// Look for the edit item button
async function changeTimeline(row: HTMLElement) {
  const edit = row.querySelector<HTMLElement>(`[aria-label="Edit"]`);
  if (edit) {
    await clickItem(edit);
    const menu = document.querySelector<HTMLElement>(`[role="menu"]`);
    if (menu) {
      const allMenuItems = [...menu.querySelectorAll<HTMLElement>(`[role="menu"] [role="presentation"] a`)];
      for (const menuItem of allMenuItems) {
        // const menuItem = allMenuItems[i];
        const text = menuItem.innerText.trim().toLowerCase();
        // console.log(`Text: "${text}"`);
        // Look for specific item in the drop down menu and click them
        switch (text) {
          // Hide from timeline
          case "hidden from timeline": {
            await clickItem(menuItem);
            break;
          }
          // Unlike (usually just posts and comments, not pages)
          case "unlike": {
            await clickItem(menuItem);
            const confirm = await getDialogFor(`Close`);
            await clickItem(confirm);
            break;
          }
          // Unvote (New: polls)
          case "unvote": {
            await clickItem(menuItem);
            break;
          }
          // Like unlike but for smiles, hearts, etc.
          case "remove reaction": {
            await clickItem(menuItem);
            const confirm = await getDialogFor(`Close`);
            await clickItem(confirm);
            break;
          }
          // Untag yourself from posts and pictures
          case "report/remove tag": {
            await clickItem(menuItem);
            await untagFromTimeline();
            break;
          }
          // Delete the post altogether
          case "delete": {
            await clickItem(menuItem);
            const confirm = await getDialogFor(`Delete`);
            await clickItem(confirm);
            break;
          }
        }
      }
    }
  }
}

// The untag process has a multi-dialog process that must be navigated to remove yourself,
//   so this should navigate it and click all the necessary things to remove the tag.
async function untagFromTimeline() {
  const stringsToTry = [
    `I'm in this photo and I don't like it`,
    `This is a photo of me or my family that I don't want on Facebook`,
    `I think it's an unauthorized use of my intellectual property`,
    `I think it shouldn't be on Facebook`,
    `It's a bad photo of me`,
    `It's inappropriate`,
    `It makes me sad`,
    `It's embarrassing`,
    `Other`,
    `Something else`,
    `It's something else`,
    `See more options`,
    `Remove Tag`,
  ];
  for (let loopCount = 0; loopCount < 5; loopCount++) {
    for (const tryString of stringsToTry) {
      // console.log(`Trying "${tryString}"`);
      const report = await getDialogFor(tryString);
      if (report) {
        // console.log(`Found "${tryString}"`);
        await clickItem(report);
        const cont = await getDialogFor(`Continue`);
        await clickItem(cont);
        break;
      }
    }
  }

  const foundDone = await getDialogFor(`Done`);
  await clickItem(foundDone);
}
// Helper to get clickable elements in drop down menus
async function getMenuFor(text: string) {
// console.log("getMenuFor outer", text);
  return await new Promise((resolve) => {
    setTimeout(() => {
      try {
        const menu = document.querySelector<HTMLElement>(`[role="menu"]`);
        if (menu) {
          // console.log("getMenuFor inner", text);
          const allMenuItems = [...menu.querySelectorAll<HTMLElement>(`*`)];
          const filteredMenuItems = allMenuItems.filter((item) => item.innerText.toLowerCase() === text.toLowerCase());
          if (filteredMenuItems.length > 0) {
            return resolve([...filteredMenuItems]);
          } else {
            return resolve();
          }
        } else {
          return resolve();
        }
      } catch (e) { console.log(`getMenuFor error`, e); return resolve(); }
    }, timeout());
  });
}

// Helper to get clickable elements in pop up dialogs
async function getDialogFor(text: string) {
// console.log("getDialogFor outer", text);
  return await new Promise((resolve) => {
    setTimeout(() => {
      try {
        const dialogs = [...document.querySelectorAll<HTMLElement>(`[role="dialog"]`)];
        const dialog = dialogs[dialogs.length - 1];
        if (dialog) {
          // console.log("getDialogFor inner", text);
          const allDialogItems = [...dialog.querySelectorAll<HTMLElement>(`*`)];
          const filteredDialogItems = allDialogItems.filter((item) => {
            return item.innerText.toLowerCase() === text.toLowerCase() &&
              // @ts-ignore
              !item.attributes.disabled &&
              !item.classList.contains("hidden_elem") &&
              // @ts-ignore
              (!item.computedStyleMap || item.computedStyleMap().get("display").value !== "none");
          });
          if (filteredDialogItems.length > 0) {
            return resolve([...filteredDialogItems]);
          } else {
            return resolve();
          }
        } else {
          return resolve();
        }
      } catch (e) { console.log(`getDialogFor error`, e); return resolve(); }
    }, timeout());
  });
}

// Remove drop down menus when we"re down with them because Facebook doesn"t
//   and the hidden HTML grows significantly if we don't.
async function cleanupMenu() {
// console.log("cleanupMenu");
  const menu = document.querySelector<HTMLElement>(`[role="menu"]`);
  return await cleanupElement(menu);
}

// Simulate a user clicking an item.
async function clickItem(item: HTMLElement | HTMLElement[]) {
// console.log("clickItem outer", item);
  if (!item) {
    return;
  }
  if (Array.isArray(item)) {
    for (const i of item) {
      await clickItem(i);
    }
    return;
  }
  return await new Promise((resolve) => {
    setTimeout(async () => {
      try {
        // console.log("clickItem inner", item);
        item.click();
        resolve();
      } catch (e) { console.log(`clickItem error`, e); return resolve(); }
    }, timeout());
  });
}

// Remove elements from the page so the processing doesn"t slow down as much
async function cleanupElement(item: HTMLElement) {
// console.log("cleanupElement outer", item);
  if (!item) {
    return;
  }
  if (Array.isArray(item)) {
    for (const i of item) {
      await cleanupElement(i);
    }
    return;
  }
  return await new Promise((resolve) => {
    setTimeout(async () => {
      try {
        // console.log("cleanupElement inner", item);
        if (item.parentNode) {
          item.parentNode.removeChild(item);
        }
        return resolve();
      } catch (e) { console.log(`removeItemFromPage error`, e); return resolve(); }
    }, timeout());
  });
}

// Start by calling nextPage right away
nextPage().then(r => console.log("DONE?", r));
