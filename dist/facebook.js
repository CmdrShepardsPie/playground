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
// @ts-ignore
const timeout = () => 1000;
// Main loop of the program, it will scroll up and down and
// look for "Load more" style links to keep expanding the timeline
async function nextPage() {
    // console.log(`nextPage`);
    window.scrollTo(0, 1000000);
    try {
        await processRows([...document.querySelectorAll(`.uiList .uiBoxWhite`)]);
        await clickItem([...document.querySelectorAll(`.uiMorePager a`)]);
    }
    catch (e) {
        console.error(`nextPage error`, e);
    }
    window.scrollTo(0, 0);
    setTimeout(nextPage, timeout());
}
// Go down each line of your timeline looking for action buttons
async function processRows(rows) {
    // console.log("processRows");
    for (const row of rows) {
        try {
            await changeSharing(row);
            cleanupMenu();
            await changeTimeline(row);
            cleanupMenu();
            const closeDialog = await getDialogFor(`Close`);
            if (closeDialog) {
                await clickItem(closeDialog);
            }
            cleanupElement(row);
        }
        catch (e) {
            console.error(`processRows error`, e);
        }
    }
}
// If the privacy of the timeline item can be changed, set it to Only me
async function changeSharing(row) {
    // console.log("changeSharing", row);
    const sharing = row.querySelector(`[aria-label~="Shared"]`);
    if (sharing) {
        await clickItem(sharing);
        const onlyMePlus = await getMenuFor(`Only me (+)`);
        if (onlyMePlus) {
            await clickItem(onlyMePlus);
        }
        await clickItem(sharing);
        const onlyMe = await getMenuFor(`Only me`);
        if (onlyMe) {
            await clickItem(onlyMe);
        }
    }
}
// Look for the edit item button
async function changeTimeline(row) {
    const edit = row.querySelector(`[aria-label="Edit"]`);
    if (!edit) {
        return;
    }
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
                case "hidden from timeline": {
                    await clickItem(menuItem);
                    break;
                }
                // Unlike (usually just posts and comments, not pages)
                case "unlike": {
                    await clickItem(menuItem);
                    const confirm = await getDialogFor(`Close`);
                    if (confirm) {
                        await clickItem(confirm);
                    }
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
                    if (confirm) {
                        await clickItem(confirm);
                    }
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
                    if (confirm) {
                        await clickItem(confirm);
                    }
                    break;
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
    let loopCount;
    for (loopCount = 0; loopCount < 5; loopCount++) {
        for (const tryString of stringsToTry) {
            // console.log(`Trying "${tryString}"`);
            const report = await getDialogFor(tryString);
            if (report) {
                // console.log(`Found "${tryString}"`);
                await clickItem(report);
                const cont = await getDialogFor(`Continue`);
                if (cont) {
                    await clickItem(cont);
                }
                break;
            }
        }
    }
    const foundDone = await getDialogFor(`Done`);
    if (foundDone) {
        await clickItem(foundDone);
    }
}
// Helper to get clickable elements in drop down menus
function getMenuFor(text) {
    // console.log("getMenuFor outer", text);
    return new Promise((resolve) => {
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
                console.error(`getMenuFor error`, e);
                return resolve();
            }
        }, timeout());
    });
}
// Helper to get clickable elements in pop up dialogs
function getDialogFor(text) {
    // console.log("getDialogFor outer", text);
    return new Promise((resolve) => {
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
                console.error(`getDialogFor error`, e);
                return resolve();
            }
        }, timeout());
    });
}
// Remove drop down menus when we"re down with them because Facebook doesn't
//   and the hidden HTML grows significantly if we don't.
function cleanupMenu() {
    // console.log("cleanupMenu");
    const menu = document.querySelector(`[role="menu"]`);
    if (menu) {
        return cleanupElement(menu);
    }
}
// Simulate a user clicking an item.
async function clickItem(item) {
    // console.log("clickItem outer", item);
    if (Array.isArray(item)) {
        for (const i of item) {
            await clickItem(i);
        }
        return;
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            try {
                // console.log("clickItem inner", item);
                item.click();
                resolve();
            }
            catch (e) {
                console.error(`clickItem error`, e);
                return resolve();
            }
        }, timeout());
    });
}
// Remove elements from the page so the processing doesn't slow down as much
function cleanupElement(item) {
    // console.log("cleanupElement", item);
    if (Array.isArray(item)) {
        for (const i of item) {
            cleanupElement(i);
        }
        return;
    }
    try {
        if (item.parentNode) {
            item.parentNode.removeChild(item);
        }
    }
    catch (e) {
        console.error(`cleanupElement error`, e);
    }
}
// Start by calling nextPage right away
nextPage().then((r) => console.log(r));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZmFjZWJvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0VBSUU7QUFFRjs7O0VBR0U7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXlCRTtBQUNGLGFBQWE7QUFDYixNQUFNLE9BQU8sR0FBaUIsR0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDO0FBRWpELDJEQUEyRDtBQUMzRCxrRUFBa0U7QUFDbEUsS0FBSyxVQUFVLFFBQVE7SUFDckIsMkJBQTJCO0lBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzVCLElBQUk7UUFDRixNQUFNLFdBQVcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFjLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sU0FBUyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQWMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEY7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDcEM7SUFDRCxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0QixVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUVELGdFQUFnRTtBQUNoRSxLQUFLLFVBQVUsV0FBVyxDQUFDLElBQW1CO0lBQzVDLDhCQUE4QjtJQUM5QixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksRUFBRTtRQUN0QixJQUFJO1lBQ0YsTUFBTSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekIsV0FBVyxFQUFFLENBQUM7WUFDZCxNQUFNLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixXQUFX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T0FBTyxFQUFFLENBQUM7YUFDWDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE9BQU8sT0FBTyxFQUFFLENBQUM7YUFDbEI7UUFDSCxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNoQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCw0RUFBNEU7QUFDNUUsU0FBUyxjQUFjLENBQUMsSUFBaUI7SUFDdkMsdUNBQXVDO0lBQ3ZDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QixLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNwQixjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkI7UUFDRCxPQUFPO0tBQ1I7SUFDRCxJQUFJO1FBQ0YsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DO0tBQ0Y7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDMUM7QUFDSCxDQUFDO0FBRUQsdUNBQXVDO0FBQ3ZDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiogSU1QT1JUQU5UISBZb3UgTVVTVCBuYXZpZ2F0ZSB0byB5b3VyIFwiQWxsIGFjdGl2aXR5XCIgdGltZWxpbmUgZm9yIHRoaXMgdG8gd29yayFcbiogaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL1t5b3VyIHVzZXJuYW1lXS9hbGxhY3Rpdml0eVxuKiBZb3UgY2FuIGFsc28gZ2V0IHRvIHRoaXMgYnkgY2xpY2tpbmcgeW91ciBuYW1lIHRvIGdldCB0byB5b3VyIG93biB0aW1lbGluZSwgdGhlbiBjbGlja2luZyBcIlZpZXcgQWN0aXZpdHkgTG9nXCJcbiovXG5cbi8qXG4qIFdBUk5JTkchIFRoaXMgd2lsbCBzdGFydCBpbW1lZGlhdGVseSwgYW5kIGRlbGV0ZSAqZXZlcnl0aGluZyogaXQgY2FuIVxuKiBEb24ndCBydW4gaWYgeW91IGRvbid0IHdhbnQgdG8gbG9zZSBhbnl0aGluZyBhbmQvb3IgaGF2ZW50IGJhY2tlZCBpdCB1cCFcbiovXG5cbi8qXG4qIFRoaXMgc2NyaXB0IHdpbGwgYXR0ZW1wdCB0byBoaWRlIGFuZC9vciBkZWxldGUgZXZlcnl0aGluZyBmcm9tIHlvdXIgRmFjZWJvb2sgdGltZWxpbmUuXG4qXG4qIFlvdSB3aWxsIG9wZW4gdGhlIGJyb3dzZXIgZGV2ZWxvcGVyIHRvb2xzIGFuZCBjb3B5LXBhc3RlIHRoaXMgd2hvbGUgc2NyaXB0IGludG8gdGhlIFwiY29uc29sZVwiLlxuKiAoVXN1YWxseSBwcmVzcyBhbmQgaG9sZCBNYWM6IENtZC0oQWx0L09wdGlvbiktSSBvciBXaW5kb3c6IEN0cmwtU2hpZnQtSSlcbipcbiogRmFjZWJvb2sgc2hvd3MgYSBtZXNzYWdlIGluIHRoZSBkZXZlbG9wZXIgdG9vbCBjb25zb2xlIHdhcm5pbmcgeW91IGFib3V0IHBhc3Rpbmcgc2NyaXB0cyxcbiogICBhbmQgdGhleSdyZSBhYnNvbHV0ZWx5IHJpZ2h0LCBiZSB2ZXJ5IGNhcmVmdWwgYWJvdXQgcGFzdGluZyB0aGluZ3MgaGVyZSxcbiogICBhcyBpdCB3aWxsIGhhdmUgZnVsbCBhY2Nlc3MgdG8geW91ciBicm93c2VyIGFuZCBhbnl0aGluZyB5b3UgY2FuIGRvIG9yIHNlZS5cbipcbiogVGhpcyBydW5zIGluIG11bHRpcGxlIHBoYXNlcywgc2V0dGluZyBwcml2YWN5IHRvIFwiT25seSBtZVwiIG9yIFwiT25seSBtZVwiIGlmIGl0IGNhbixcbiogICB0aGVuIHNldHRpbmcgcG9zdCB2aXNpYmlsaXR5IHRvIFwiSGlkZGVuIGZyb20gdGltZWxpbmVcIixcbiogICB0aGVuIGF0dGVtcHRzIHRvIHVubGlrZSBvciB1bnRhZywgYW5kIGZpbmFsbHkgZGVsZXRlIGl0LCBpZiBwb3NzaWJsZS5cbipcbiogSXQgY2FuIHRha2UgYSB2ZXJ5IGxvbmcgdGltZSB0byBydW4gZGVwZW5kaW5nIG9uIGhvdyBtdWNoIGl0IHdpbGwgZGVsZXRlLlxuKiBUaGUgbG9uZ2VyIGl0IHJ1bnMsIHRoZSBtb3JlIGl0IGRlbGV0ZXMuIEl0IGNhbiB0YWtlIGhvdXJzIG9yIGRheXMuXG4qXG4qIFRoaXMgcHJvY2VzcyBpcyBwZXJtYW5lbnQgYW5kIGNhbm5vdCBiZSByZXZlcnNlZCBvciB1bmRvbmUsIHNvIGRvIGEgRmFjZWJvb2sgYmFja3VwIGZpcnN0IVxuKlxuKiBBbHNvIGNvbnNpZGVyIGdvaW5nIHRocm91Z2ggdGhlIHZhcmlvdXMgcHJpdmFjeSBzZXR0aW5ncyBvbiB5b3VyIEFib3V0IHBhZ2UgYW5kIGFjY291bnQgc2V0dGluZ3MgYW5kXG4qICAgbG9ja2luZyB0aG9zZSBzZXR0aW5ncyBkb3duIHRvbywgaWYgeW91IHdhbnQgdG8gYmUgZXh0cmEgc3VyZS4gWW91IHdpbGwgaGF2ZSB0byBkZWxldGUgYW55IHBlcnNvbmFsXG4qICAgZGV0YWlscyBmcm9tIHlvdXIgYWNjb3VudCBhbmQgXCJBYm91dFwiIHNlY3Rpb24geW91cnNlbGYuXG4qICAgQ2hlY2sgb3V0IGh0dHBzOi8vZmllbGRndWlkZS5naXptb2RvLmNvbS9oZXJlcy1ob3ctdG8tc2hhcmUtYXMtbGl0dGxlLWRhdGEtYXMtcG9zc2libGUtd2l0aG91dC1kLTE4MjM5MTU2MjhcbipcbiogVGhpcyBjb21lcyB3aXRoIGFic29sdXRlbHkgbm8gd2FycmFudHksIGd1YXJhbnRlZXMsIG9yIHN1cHBvcnQuIFlvdSBydW4gdGhpcyBhdCB5b3VyIG93biByaXNrIVxuKi9cbi8vIEB0cy1pZ25vcmVcbmNvbnN0IHRpbWVvdXQ6ICgpID0+IG51bWJlciA9ICgpOiBudW1iZXIgPT4gMTAwMDtcblxuLy8gTWFpbiBsb29wIG9mIHRoZSBwcm9ncmFtLCBpdCB3aWxsIHNjcm9sbCB1cCBhbmQgZG93biBhbmRcbi8vIGxvb2sgZm9yIFwiTG9hZCBtb3JlXCIgc3R5bGUgbGlua3MgdG8ga2VlcCBleHBhbmRpbmcgdGhlIHRpbWVsaW5lXG5hc3luYyBmdW5jdGlvbiBuZXh0UGFnZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gY29uc29sZS5sb2coYG5leHRQYWdlYCk7XG4gIHdpbmRvdy5zY3JvbGxUbygwLCAxMDAwMDAwKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCBwcm9jZXNzUm93cyhbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oYC51aUxpc3QgLnVpQm94V2hpdGVgKV0pO1xuICAgIGF3YWl0IGNsaWNrSXRlbShbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oYC51aU1vcmVQYWdlciBhYCldKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoYG5leHRQYWdlIGVycm9yYCwgZSk7XG4gIH1cbiAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICBzZXRUaW1lb3V0KG5leHRQYWdlLCB0aW1lb3V0KCkpO1xufVxuXG4vLyBHbyBkb3duIGVhY2ggbGluZSBvZiB5b3VyIHRpbWVsaW5lIGxvb2tpbmcgZm9yIGFjdGlvbiBidXR0b25zXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzUm93cyhyb3dzOiBIVE1MRWxlbWVudFtdKTogUHJvbWlzZTx2b2lkPiB7XG4gIC8vIGNvbnNvbGUubG9nKFwicHJvY2Vzc1Jvd3NcIik7XG4gIGZvciAoY29uc3Qgcm93IG9mIHJvd3MpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgY2hhbmdlU2hhcmluZyhyb3cpO1xuICAgICAgY2xlYW51cE1lbnUoKTtcbiAgICAgIGF3YWl0IGNoYW5nZVRpbWVsaW5lKHJvdyk7XG4gICAgICBjbGVhbnVwTWVudSgpO1xuICAgICAgY29uc3QgY2xvc2VEaWFsb2c6IEhUTUxFbGVtZW50W10gfCB1bmRlZmluZWQgPSBhd2FpdCBnZXREaWFsb2dGb3IoYENsb3NlYCk7XG4gICAgICBpZiAoY2xvc2VEaWFsb2cpIHtcbiAgICAgICAgYXdhaXQgY2xpY2tJdGVtKGNsb3NlRGlhbG9nKTtcbiAgICAgIH1cbiAgICAgIGNsZWFudXBFbGVtZW50KHJvdyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgcHJvY2Vzc1Jvd3MgZXJyb3JgLCBlKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gSWYgdGhlIHByaXZhY3kgb2YgdGhlIHRpbWVsaW5lIGl0ZW0gY2FuIGJlIGNoYW5nZWQsIHNldCBpdCB0byBPbmx5IG1lXG5hc3luYyBmdW5jdGlvbiBjaGFuZ2VTaGFyaW5nKHJvdzogSFRNTEVsZW1lbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gY29uc29sZS5sb2coXCJjaGFuZ2VTaGFyaW5nXCIsIHJvdyk7XG4gIGNvbnN0IHNoYXJpbmc6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHJvdy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW2FyaWEtbGFiZWx+PVwiU2hhcmVkXCJdYCk7XG4gIGlmIChzaGFyaW5nKSB7XG4gICAgYXdhaXQgY2xpY2tJdGVtKHNoYXJpbmcpO1xuICAgIGNvbnN0IG9ubHlNZVBsdXM6IEhUTUxFbGVtZW50W10gfCB1bmRlZmluZWQgPSBhd2FpdCBnZXRNZW51Rm9yKGBPbmx5IG1lICgrKWApO1xuICAgIGlmIChvbmx5TWVQbHVzKSB7XG4gICAgICBhd2FpdCBjbGlja0l0ZW0ob25seU1lUGx1cyk7XG4gICAgfVxuICAgIGF3YWl0IGNsaWNrSXRlbShzaGFyaW5nKTtcbiAgICBjb25zdCBvbmx5TWU6IEhUTUxFbGVtZW50W10gfCB1bmRlZmluZWQgPSBhd2FpdCBnZXRNZW51Rm9yKGBPbmx5IG1lYCk7XG4gICAgaWYgKG9ubHlNZSkge1xuICAgICAgYXdhaXQgY2xpY2tJdGVtKG9ubHlNZSk7XG4gICAgfVxuICB9XG59XG5cbi8vIExvb2sgZm9yIHRoZSBlZGl0IGl0ZW0gYnV0dG9uXG5hc3luYyBmdW5jdGlvbiBjaGFuZ2VUaW1lbGluZShyb3c6IEhUTUxFbGVtZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGVkaXQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHJvdy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW2FyaWEtbGFiZWw9XCJFZGl0XCJdYCk7XG4gIGlmICghZWRpdCkge1xuICAgIHJldHVybjtcbiAgfVxuICBhd2FpdCBjbGlja0l0ZW0oZWRpdCk7XG4gIGNvbnN0IG1lbnU6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGBbcm9sZT1cIm1lbnVcIl1gKTtcbiAgaWYgKG1lbnUpIHtcbiAgICBjb25zdCBhbGxNZW51SXRlbXM6IEhUTUxFbGVtZW50W10gPSBbLi4ubWVudS5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgW3JvbGU9XCJtZW51XCJdIFtyb2xlPVwicHJlc2VudGF0aW9uXCJdIGFgKV07XG4gICAgZm9yIChjb25zdCBtZW51SXRlbSBvZiBhbGxNZW51SXRlbXMpIHtcbiAgICAgIC8vIGNvbnN0IG1lbnVJdGVtID0gYWxsTWVudUl0ZW1zW2ldO1xuICAgICAgY29uc3QgdGV4dDogc3RyaW5nID0gbWVudUl0ZW0uaW5uZXJUZXh0LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgLy8gY29uc29sZS5sb2coYFRleHQ6IFwiJHt0ZXh0fVwiYCk7XG4gICAgICAvLyBMb29rIGZvciBzcGVjaWZpYyBpdGVtIGluIHRoZSBkcm9wIGRvd24gbWVudSBhbmQgY2xpY2sgdGhlbVxuICAgICAgc3dpdGNoICh0ZXh0KSB7XG4gICAgICAgIC8vIEhpZGUgZnJvbSB0aW1lbGluZVxuICAgICAgICBjYXNlIFwiaGlkZGVuIGZyb20gdGltZWxpbmVcIjoge1xuICAgICAgICAgIGF3YWl0IGNsaWNrSXRlbShtZW51SXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVW5saWtlICh1c3VhbGx5IGp1c3QgcG9zdHMgYW5kIGNvbW1lbnRzLCBub3QgcGFnZXMpXG4gICAgICAgIGNhc2UgXCJ1bmxpa2VcIjoge1xuICAgICAgICAgIGF3YWl0IGNsaWNrSXRlbShtZW51SXRlbSk7XG4gICAgICAgICAgY29uc3QgY29uZmlybTogSFRNTEVsZW1lbnRbXSB8IHVuZGVmaW5lZCA9IGF3YWl0IGdldERpYWxvZ0ZvcihgQ2xvc2VgKTtcbiAgICAgICAgICBpZiAoY29uZmlybSkge1xuICAgICAgICAgICAgYXdhaXQgY2xpY2tJdGVtKGNvbmZpcm0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBVbnZvdGUgKE5ldzogcG9sbHMpXG4gICAgICAgIGNhc2UgXCJ1bnZvdGVcIjoge1xuICAgICAgICAgIGF3YWl0IGNsaWNrSXRlbShtZW51SXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTGlrZSB1bmxpa2UgYnV0IGZvciBzbWlsZXMsIGhlYXJ0cywgZXRjLlxuICAgICAgICBjYXNlIFwicmVtb3ZlIHJlYWN0aW9uXCI6IHtcbiAgICAgICAgICBhd2FpdCBjbGlja0l0ZW0obWVudUl0ZW0pO1xuICAgICAgICAgIGNvbnN0IGNvbmZpcm06IEhUTUxFbGVtZW50W10gfCB1bmRlZmluZWQgPSBhd2FpdCBnZXREaWFsb2dGb3IoYENsb3NlYCk7XG4gICAgICAgICAgaWYgKGNvbmZpcm0pIHtcbiAgICAgICAgICAgIGF3YWl0IGNsaWNrSXRlbShjb25maXJtKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVW50YWcgeW91cnNlbGYgZnJvbSBwb3N0cyBhbmQgcGljdHVyZXNcbiAgICAgICAgY2FzZSBcInJlcG9ydC9yZW1vdmUgdGFnXCI6IHtcbiAgICAgICAgICBhd2FpdCBjbGlja0l0ZW0obWVudUl0ZW0pO1xuICAgICAgICAgIGF3YWl0IHVudGFnRnJvbVRpbWVsaW5lKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGVsZXRlIHRoZSBwb3N0IGFsdG9nZXRoZXJcbiAgICAgICAgY2FzZSBcImRlbGV0ZVwiOiB7XG4gICAgICAgICAgYXdhaXQgY2xpY2tJdGVtKG1lbnVJdGVtKTtcbiAgICAgICAgICBjb25zdCBjb25maXJtOiBIVE1MRWxlbWVudFtdIHwgdW5kZWZpbmVkID0gYXdhaXQgZ2V0RGlhbG9nRm9yKGBEZWxldGVgKTtcbiAgICAgICAgICBpZiAoY29uZmlybSkge1xuICAgICAgICAgICAgYXdhaXQgY2xpY2tJdGVtKGNvbmZpcm0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgdW50YWcgcHJvY2VzcyBoYXMgYSBtdWx0aS1kaWFsb2cgcHJvY2VzcyB0aGF0IG11c3QgYmUgbmF2aWdhdGVkIHRvIHJlbW92ZSB5b3Vyc2VsZixcbi8vICAgc28gdGhpcyBzaG91bGQgbmF2aWdhdGUgaXQgYW5kIGNsaWNrIGFsbCB0aGUgbmVjZXNzYXJ5IHRoaW5ncyB0byByZW1vdmUgdGhlIHRhZy5cbmFzeW5jIGZ1bmN0aW9uIHVudGFnRnJvbVRpbWVsaW5lKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdHJpbmdzVG9Ucnk6IHN0cmluZ1tdID0gW1xuICAgIGBJJ20gaW4gdGhpcyBwaG90byBhbmQgSSBkb24ndCBsaWtlIGl0YCxcbiAgICBgVGhpcyBpcyBhIHBob3RvIG9mIG1lIG9yIG15IGZhbWlseSB0aGF0IEkgZG9uJ3Qgd2FudCBvbiBGYWNlYm9va2AsXG4gICAgYEkgdGhpbmsgaXQncyBhbiB1bmF1dGhvcml6ZWQgdXNlIG9mIG15IGludGVsbGVjdHVhbCBwcm9wZXJ0eWAsXG4gICAgYEkgdGhpbmsgaXQgc2hvdWxkbid0IGJlIG9uIEZhY2Vib29rYCxcbiAgICBgSXQncyBhIGJhZCBwaG90byBvZiBtZWAsXG4gICAgYEl0J3MgaW5hcHByb3ByaWF0ZWAsXG4gICAgYEl0IG1ha2VzIG1lIHNhZGAsXG4gICAgYEl0J3MgZW1iYXJyYXNzaW5nYCxcbiAgICBgT3RoZXJgLFxuICAgIGBTb21ldGhpbmcgZWxzZWAsXG4gICAgYEl0J3Mgc29tZXRoaW5nIGVsc2VgLFxuICAgIGBTZWUgbW9yZSBvcHRpb25zYCxcbiAgICBgUmVtb3ZlIFRhZ2AsXG4gIF07XG4gIGxldCBsb29wQ291bnQ6IG51bWJlcjtcbiAgZm9yIChsb29wQ291bnQgPSAwOyBsb29wQ291bnQgPCA1OyBsb29wQ291bnQrKykge1xuICAgIGZvciAoY29uc3QgdHJ5U3RyaW5nIG9mIHN0cmluZ3NUb1RyeSkge1xuICAgICAgLy8gY29uc29sZS5sb2coYFRyeWluZyBcIiR7dHJ5U3RyaW5nfVwiYCk7XG4gICAgICBjb25zdCByZXBvcnQ6IEhUTUxFbGVtZW50W10gfCB1bmRlZmluZWQgPSBhd2FpdCBnZXREaWFsb2dGb3IodHJ5U3RyaW5nKTtcbiAgICAgIGlmIChyZXBvcnQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYEZvdW5kIFwiJHt0cnlTdHJpbmd9XCJgKTtcbiAgICAgICAgYXdhaXQgY2xpY2tJdGVtKHJlcG9ydCk7XG4gICAgICAgIGNvbnN0IGNvbnQ6IEhUTUxFbGVtZW50W10gfCB1bmRlZmluZWQgPSBhd2FpdCBnZXREaWFsb2dGb3IoYENvbnRpbnVlYCk7XG4gICAgICAgIGlmIChjb250KSB7XG4gICAgICAgICAgYXdhaXQgY2xpY2tJdGVtKGNvbnQpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZvdW5kRG9uZTogSFRNTEVsZW1lbnRbXSB8IHVuZGVmaW5lZCA9IGF3YWl0IGdldERpYWxvZ0ZvcihgRG9uZWApO1xuICBpZiAoZm91bmREb25lKSB7XG4gICAgYXdhaXQgY2xpY2tJdGVtKGZvdW5kRG9uZSk7XG4gIH1cbn1cblxuLy8gSGVscGVyIHRvIGdldCBjbGlja2FibGUgZWxlbWVudHMgaW4gZHJvcCBkb3duIG1lbnVzXG5mdW5jdGlvbiBnZXRNZW51Rm9yKHRleHQ6IHN0cmluZyk6IFByb21pc2U8SFRNTEVsZW1lbnRbXSB8IHVuZGVmaW5lZD4ge1xuICAvLyBjb25zb2xlLmxvZyhcImdldE1lbnVGb3Igb3V0ZXJcIiwgdGV4dCk7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogKHZhbHVlPzogSFRNTEVsZW1lbnRbXSkgPT4gdm9pZCk6IHZvaWQgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbWVudTogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYFtyb2xlPVwibWVudVwiXWApO1xuICAgICAgICBpZiAobWVudSkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZ2V0TWVudUZvciBpbm5lclwiLCB0ZXh0KTtcbiAgICAgICAgICBjb25zdCBhbGxNZW51SXRlbXM6IEhUTUxFbGVtZW50W10gPSBbLi4ubWVudS5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgKmApXTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZE1lbnVJdGVtczogSFRNTEVsZW1lbnRbXSA9IGFsbE1lbnVJdGVtcy5maWx0ZXIoKGl0ZW06IEhUTUxFbGVtZW50KSA9PiBpdGVtLmlubmVyVGV4dC50b0xvd2VyQ2FzZSgpID09PSB0ZXh0LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgIGlmIChmaWx0ZXJlZE1lbnVJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShbLi4uZmlsdGVyZWRNZW51SXRlbXNdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBnZXRNZW51Rm9yIGVycm9yYCwgZSk7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSwgdGltZW91dCgpKTtcbiAgfSk7XG59XG5cbi8vIEhlbHBlciB0byBnZXQgY2xpY2thYmxlIGVsZW1lbnRzIGluIHBvcCB1cCBkaWFsb2dzXG5mdW5jdGlvbiBnZXREaWFsb2dGb3IodGV4dDogc3RyaW5nKTogUHJvbWlzZTxIVE1MRWxlbWVudFtdIHwgdW5kZWZpbmVkPiB7XG4gIC8vIGNvbnNvbGUubG9nKFwiZ2V0RGlhbG9nRm9yIG91dGVyXCIsIHRleHQpO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6ICh2YWx1ZT86IEhUTUxFbGVtZW50W10pID0+IHZvaWQpOiB2b2lkID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRpYWxvZ3M6IEhUTUxFbGVtZW50W10gPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oYFtyb2xlPVwiZGlhbG9nXCJdYCldO1xuICAgICAgICBjb25zdCBkaWFsb2c6IEhUTUxFbGVtZW50ID0gZGlhbG9nc1tkaWFsb2dzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoZGlhbG9nKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJnZXREaWFsb2dGb3IgaW5uZXJcIiwgdGV4dCk7XG4gICAgICAgICAgY29uc3QgYWxsRGlhbG9nSXRlbXM6IEhUTUxFbGVtZW50W10gPSBbLi4uZGlhbG9nLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KGAqYCldO1xuICAgICAgICAgIGNvbnN0IGZpbHRlcmVkRGlhbG9nSXRlbXM6IEhUTUxFbGVtZW50W10gPSBhbGxEaWFsb2dJdGVtcy5maWx0ZXIoKGl0ZW06IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5pbm5lclRleHQudG9Mb3dlckNhc2UoKSA9PT0gdGV4dC50b0xvd2VyQ2FzZSgpICYmXG4gICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgIWl0ZW0uYXR0cmlidXRlcy5kaXNhYmxlZCAmJlxuICAgICAgICAgICAgICAhaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5fZWxlbVwiKSAmJlxuICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICghaXRlbS5jb21wdXRlZFN0eWxlTWFwIHx8IGl0ZW0uY29tcHV0ZWRTdHlsZU1hcCgpLmdldChcImRpc3BsYXlcIikudmFsdWUgIT09IFwibm9uZVwiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZmlsdGVyZWREaWFsb2dJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShbLi4uZmlsdGVyZWREaWFsb2dJdGVtc10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYGdldERpYWxvZ0ZvciBlcnJvcmAsIGUpO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0sIHRpbWVvdXQoKSk7XG4gIH0pO1xufVxuXG4vLyBSZW1vdmUgZHJvcCBkb3duIG1lbnVzIHdoZW4gd2VcInJlIGRvd24gd2l0aCB0aGVtIGJlY2F1c2UgRmFjZWJvb2sgZG9lc24ndFxuLy8gICBhbmQgdGhlIGhpZGRlbiBIVE1MIGdyb3dzIHNpZ25pZmljYW50bHkgaWYgd2UgZG9uJ3QuXG5mdW5jdGlvbiBjbGVhbnVwTWVudSgpOiB1bmRlZmluZWQge1xuICAvLyBjb25zb2xlLmxvZyhcImNsZWFudXBNZW51XCIpO1xuICBjb25zdCBtZW51OiBIVE1MRWxlbWVudCB8IG51bGwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW3JvbGU9XCJtZW51XCJdYCk7XG4gIGlmIChtZW51KSB7XG4gICAgcmV0dXJuIGNsZWFudXBFbGVtZW50KG1lbnUpO1xuICB9XG59XG5cbi8vIFNpbXVsYXRlIGEgdXNlciBjbGlja2luZyBhbiBpdGVtLlxuYXN5bmMgZnVuY3Rpb24gY2xpY2tJdGVtKGl0ZW06IEhUTUxFbGVtZW50IHwgSFRNTEVsZW1lbnRbXSk6IFByb21pc2U8dm9pZD4ge1xuICAvLyBjb25zb2xlLmxvZyhcImNsaWNrSXRlbSBvdXRlclwiLCBpdGVtKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICBmb3IgKGNvbnN0IGkgb2YgaXRlbSkge1xuICAgICAgYXdhaXQgY2xpY2tJdGVtKGkpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiAoKSA9PiB2b2lkKTogdm9pZCA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNsaWNrSXRlbSBpbm5lclwiLCBpdGVtKTtcbiAgICAgICAgaXRlbS5jbGljaygpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYGNsaWNrSXRlbSBlcnJvcmAsIGUpO1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0sIHRpbWVvdXQoKSk7XG4gIH0pO1xufVxuXG4vLyBSZW1vdmUgZWxlbWVudHMgZnJvbSB0aGUgcGFnZSBzbyB0aGUgcHJvY2Vzc2luZyBkb2Vzbid0IHNsb3cgZG93biBhcyBtdWNoXG5mdW5jdGlvbiBjbGVhbnVwRWxlbWVudChpdGVtOiBIVE1MRWxlbWVudCk6IHVuZGVmaW5lZCB7XG4gIC8vIGNvbnNvbGUubG9nKFwiY2xlYW51cEVsZW1lbnRcIiwgaXRlbSk7XG4gIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgZm9yIChjb25zdCBpIG9mIGl0ZW0pIHtcbiAgICAgIGNsZWFudXBFbGVtZW50KGkpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAoaXRlbS5wYXJlbnROb2RlKSB7XG4gICAgICBpdGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaXRlbSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihgY2xlYW51cEVsZW1lbnQgZXJyb3JgLCBlKTtcbiAgfVxufVxuXG4vLyBTdGFydCBieSBjYWxsaW5nIG5leHRQYWdlIHJpZ2h0IGF3YXlcbm5leHRQYWdlKCkudGhlbigocjogdm9pZCkgPT4gY29uc29sZS5sb2cocikpO1xuIl19