/*
 * IMPORTANT! You MUST navigate to your "All activity" timeline for this to work!
 * https://www.facebook.com/[your username]/allactivity
 * You can also get to this by clicking your name to get to your own timeline, then clicking "View Activity Log"
 */

/*
 * WARNING! This will start immediately, and delete *everything* it can!
 * Don't run if you don't want to lose anything and/or haven't backed it up!
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
 * This runs in multiple phases, setting privacy to "No one" or "Only me" if it can,
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

// Main loop of the program, it will scroll up and down and
// look for "Load more" style links to keep expanding the timeline
async function nextPage() {
  console.log(`nextPage`);
  window.scrollTo(0, 0);
  try {
    const years = document.querySelectorAll(`[data-year] a`);
    await clickItem(years);
    const rows = document.querySelectorAll(`.uiList .uiBoxWhite`);
    await processRows(rows);
    const moreItems = document.querySelectorAll(`.uiMorePager a`);
    await clickItem(moreItems);
  } catch (e) { console.log(`nextPage error`, e); }
  window.scrollTo(0, 1000000);
  setTimeout(nextPage, 500 + (Math.random() * 0));
}

// Go down each line of your timeline looking for action buttons
async function processRows(rows) {
  console.log('processRows');
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    try {
      await changeSharing(row);
      await cleanupMenu();
      await changeTimeline(row);
      await cleanupMenu();
      await cleanupElement(row);
    } catch (e) { console.log(`processRows error`, e); }
  }
}

// If the privacy of the timeline item can be changed, set it to Only Me
async function changeSharing(row) {
  console.log('changeSharing', row);
  const sharing = row.querySelector(`[aria-label~="Shared"]`);
  if (sharing) {
    await clickItem(sharing);
    const onlyMe = await getMenuFor(`Only me`);
    return await clickItem(onlyMe);
  }
}

// Look for the the edit item button
async function changeTimeline(row) {
  const edit = row.querySelector(`[aria-label="Edit"]`);
  if (edit) {
    await clickItem(edit);
    const menu = document.querySelector(`[role="menu"]`);
    if (menu) {
      const allMenuItems = [...menu.querySelectorAll(`[role="menu"] [role="presentation"] a`)];
      for (let i = 0; i < allMenuItems.length; i++) {
        const menuItem = allMenuItems[i];
        const text = menuItem.innerText.trim().toLowerCase();
        console.log(`Text: "${text}"`);
        // Look for specific item in the drop down menu and click them
        switch (text) {
          // Hide from timeline
          case 'hidden from timeline':
          {
            await clickItem(menuItem);
            break;
          }
          // Unlike (usually just posts and comments, not pages)
          case 'unlike':
          {
            await clickItem(menuItem);
            const confirm = await getDialogFor(`Close`);
            await clickItem(confirm);
            break;
          }
          // Like unlike but for smiles, hearts, etc.
          case 'remove reaction':
          {
            await clickItem(menuItem);
            const confirm = await getDialogFor(`Close`);
            await clickItem(confirm);
            break;
          }
          // Untag yourself from posts and pictures
          case 'report/remove tag':
          {
            await clickItem(menuItem);
            await untagFromTimeline();
            break;
          }
          // Delete the post altogether
          case 'delete':
          {
            await clickItem(menuItem);
            const confirm = await getDialogFor(`Delete Post`);
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
  const report1 = await getDialogFor(`I think it shouldn't be on Facebook`);
  await clickItem(report1);
  const continue1 = await getDialogFor(`Continue`);
  await clickItem(continue1);

  // "Something else" usually exists
  const report2a = await getDialogFor(`Something else`);
  await clickItem(report2a);
  // Photos have a specific report item
  const report2b = await getDialogFor(`This is a photo of me or my family that I don't want on Facebook`);
  await clickItem(report2b);
  const continue2 = await getDialogFor(`Continue`);
  await clickItem(continue2);

  // "See more options" exists sometimes
  const report3a = await getDialogFor(`See more options`);
  await clickItem(report3a);
  // "I think it's an unauthorized use of my intellectual property" exists sometimes
  const report3b = await getDialogFor(`I think it's an unauthorized use of my intellectual property`);
  await clickItem(report3b);
  const continue3 = await getDialogFor(`Continue`);
  await clickItem(continue3);

  // "It's something else" exists sometimes
  const report4 = await getDialogFor(`It's something else`);
  await clickItem(report4);
  const continue4 = await getDialogFor(`Continue`);
  await clickItem(continue4);

  const report5 = await getDialogFor(`Remove Tag`);
  await clickItem(report5);
  const report6 = await getDialogFor(`Remove Tag`);
  await clickItem(report6);
  const continue5 = await getDialogFor(`Done`);
  return await clickItem(continue5);
}

// Helper to get clickable elements in drop down menus
async function getMenuFor(text) {
  console.log('getMenuFor outer', text);
  return await new Promise(resolve => {
    setTimeout(() => {
      try {
        const menu = document.querySelector(`[role="menu"]`);
        if (menu) {
          console.log('getMenuFor inner', text);
          const allMenuItems = [...menu.querySelectorAll(`*`)];
          const filteredMenuItems = allMenuItems.filter(item => item.innerText === text);
          if (filteredMenuItems.length > 0) {
            return resolve([...filteredMenuItems]);
          } else {
            return resolve(null);
          }
        } else {
          return resolve(null);
        }
      } catch (e) { console.log(`getMenuFor error`, e); return resolve(); }
    }, 500 + (Math.random() * 0));
  });
}

// Helper to get clickable elements in pop up dialogs
async function getDialogFor(text) {
  console.log('getDialogFor outer', text);
  return await new Promise(resolve => {
    setTimeout(() => {
      try {
        const dialogs = document.querySelectorAll(`[role="dialog"]`);
        const dialog = dialogs[dialogs.length - 1];
        if (dialog) {
          console.log('getDialogFor inner', text);
          const allDialogItems = [...dialog.querySelectorAll(`*`)];
          const filteredDialogItems = allDialogItems.filter(item => item.innerText === text);
          if (filteredDialogItems.length > 0) {
            return resolve([...filteredDialogItems]);
          } else {
            return resolve(null);
          }
        } else {
          return resolve(null);
        }
      } catch (e) { console.log(`getDialogFor error`, e); return resolve(); }
    }, 500 + (Math.random() * 0));
  });
}

// Remove drop down menus when we're down with them because Facebook doesn't
//   and the hidden HTML grows significantly if we don't.
async function cleanupMenu() {
  console.log('cleanupMenu');
  const menu = document.querySelector(`[role="menu"]`);
  return await cleanupElement(menu);
}

// Simulate a user clicking an item.
async function clickItem(item) {
  console.log('clickItem outer', item);
  if (!item || item.length === 0) {
    return;
  }
  if (Array.isArray(item)) {
    for (let i = 0; i < item.length; i++) {
      await clickItem(item[i]);
    }
    return;
  } else if (item.length) {
    return await clickItem([...item]);
  }
  return await new Promise(resolve => {
    setTimeout(async () => {
      try {
        console.log('clickItem inner', item);
        item.click();
        resolve();
      } catch (e) { console.log(`clickItem error`, e); return resolve(); }
    }, 500 + (Math.random() * 0));
  });
}

// Remove elements from the page so the processing doesn't slow down as much
async function cleanupElement(item) {
  console.log('cleanupElement outer', item);
  if (!item || item.length === 0) {
    return;
  }
  if (Array.isArray(item)) {
    for (let i = 0; i < item.length; i++) {
      await cleanupElement(item[i]);
    }
    return;
  } else if (item.length) {
    return await cleanupElement([...item]);
  }
  return await new Promise(resolve => {
    setTimeout(async () => {
      try {
        console.log('cleanupElement inner', item);
        item.parentNode.removeChild(item);
        return resolve();
      } catch (e) { console.log(`removeItemFromPage error`, e); return resolve() }
    }, 500 + (Math.random() * 0));
  });
}

// Start by calling nextPage right away
nextPage();
