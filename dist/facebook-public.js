"use strict";
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
* This runs in multiple phases, setting privacy to "Public" or "Public" if it can,
*   then setting post visibility to "allowed on timeline",
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
const timeout = () => 1000;
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
        await processRows([...document.querySelectorAll(`.uiList .uiBoxWhite`)]);
        await clickItem([...document.querySelectorAll(`.uiMorePager a`)]);
    }
    catch (e) {
        console.log(`nextPage error`, e);
    }
    // window.scrollTo(0, 0);
    setTimeout(nextPage, timeout());
}
// Go down each line of your timeline looking for action buttons
async function processRows(rows) {
    // console.log("processRows");
    for (const row of rows) {
        try {
            await changeSharing(row);
            await cleanupMenu();
            await changeTimeline(row);
            await cleanupMenu();
            await clickItem(await getDialogFor(`Close`));
            await cleanupElement(row);
        }
        catch (e) {
            console.log(`processRows error`, e);
        }
    }
}
// If the privacy of the timeline item can be changed, set it to Public
async function changeSharing(row) {
    // console.log("changeSharing", row);
    const sharing = row.querySelector(`[aria-label~="Shared"]`);
    if (sharing) {
        await clickItem(sharing);
        await clickItem(await getMenuFor(`Public`));
        await clickItem(sharing);
        await clickItem(await getMenuFor(`Public (+)`));
    }
}
// Look for the edit item button
async function changeTimeline(row) {
    const edit = row.querySelector(`[aria-label="Edit"]`);
    if (edit) {
        await clickItem(edit);
        const menu = document.querySelector(`[role="menu"]`);
        if (menu) {
            const allMenuItems = [...menu.querySelectorAll(`[role="menu"] [role="presentation"] a`)];
            for (const menuItem of allMenuItems) {
                // const menuItem = allMenuItems[i];
                const text = menuItem.innerText.trim().toLowerCase();
                // console.log(`Text: "${text}"`);
                // Look for specific item in the drop down menu and click them
                switch (text) {
                    // Hide from timeline
                    case "allowed on timeline": {
                        await clickItem(menuItem);
                        break;
                    }
                }
            }
        }
    }
}
// Helper to get clickable elements in drop down menus
async function getMenuFor(text) {
    // console.log("getMenuFor outer", text);
    return await new Promise((resolve) => {
        setTimeout(() => {
            try {
                const menu = document.querySelector(`[role="menu"]`);
                if (menu) {
                    // console.log("getMenuFor inner", text);
                    const allMenuItems = [...menu.querySelectorAll(`*`)];
                    const filteredMenuItems = allMenuItems.filter((item) => item.innerText.toLowerCase() === text.toLowerCase());
                    if (filteredMenuItems.length > 0) {
                        return resolve([...filteredMenuItems]);
                    }
                    else {
                        return resolve();
                    }
                }
                else {
                    return resolve();
                }
            }
            catch (e) {
                console.log(`getMenuFor error`, e);
                return resolve();
            }
        }, timeout());
    });
}
// Helper to get clickable elements in pop up dialogs
async function getDialogFor(text) {
    // console.log("getDialogFor outer", text);
    return await new Promise((resolve) => {
        setTimeout(() => {
            try {
                const dialogs = [...document.querySelectorAll(`[role="dialog"]`)];
                const dialog = dialogs[dialogs.length - 1];
                if (dialog) {
                    // console.log("getDialogFor inner", text);
                    const allDialogItems = [...dialog.querySelectorAll(`*`)];
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
                    }
                    else {
                        return resolve();
                    }
                }
                else {
                    return resolve();
                }
            }
            catch (e) {
                console.log(`getDialogFor error`, e);
                return resolve();
            }
        }, timeout());
    });
}
// Remove drop down menus when we"re down with them because Facebook doesn"t
//   and the hidden HTML grows significantly if we don't.
async function cleanupMenu() {
    // console.log("cleanupMenu");
    const menu = document.querySelector(`[role="menu"]`);
    return await cleanupElement(menu);
}
// Simulate a user clicking an item.
async function clickItem(item) {
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
            }
            catch (e) {
                console.log(`clickItem error`, e);
                return resolve();
            }
        }, timeout());
    });
}
// Remove elements from the page so the processing doesn"t slow down as much
async function cleanupElement(item) {
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
            }
            catch (e) {
                console.log(`removeItemFromPage error`, e);
                return resolve();
            }
        }, timeout());
    });
}
// Start by calling nextPage right away
nextPage().then((r) => console.log("DONE?", r));
//# sourceMappingURL=facebook-public.js.map