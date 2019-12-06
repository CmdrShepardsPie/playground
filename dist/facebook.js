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
const getTimer = () => 300;
// Main loop of the program, it will scroll up and down and
// look for "Load more" style links to keep expanding the timeline
async function nextPage() {
    // console.log(`nextPage`);
    window.scrollTo(0, document.body.scrollHeight);
    try {
        await processRows([...document.querySelectorAll(`.uiList .uiBoxWhite`)]);
        await clickItem([...document.querySelectorAll(`.uiMorePager a`)]);
    }
    catch (e) {
        console.error(`nextPage error`, e);
    }
    // window.scrollTo(0, 0);
    setTimeout(nextPage, getTimer());
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
                case 'hidden from timeline': {
                    await clickItem(menuItem);
                    break;
                }
                // Unlike (usually just posts and comments, not pages)
                case 'unlike': {
                    await clickItem(menuItem);
                    const confirm = await getDialogFor(`Close`);
                    if (confirm) {
                        await clickItem(confirm);
                    }
                    break;
                }
                // Unvote (New: polls)
                case 'unvote': {
                    await clickItem(menuItem);
                    break;
                }
                // Like unlike but for smiles, hearts, etc.
                case 'remove reaction': {
                    await clickItem(menuItem);
                    const confirm = await getDialogFor(`Close`);
                    if (confirm) {
                        await clickItem(confirm);
                    }
                    break;
                }
                // Untag yourself from posts and pictures
                case 'report/remove tag': {
                    await clickItem(menuItem);
                    await untagFromTimeline();
                    break;
                }
                // Delete the post altogether
                case 'delete': {
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
        }, getTimer());
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
                            !item.classList.contains('hidden_elem') &&
                            // @ts-ignore
                            (!item.computedStyleMap || item.computedStyleMap().get('display').value !== 'none');
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
        }, getTimer());
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
        }, getTimer());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZmFjZWJvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0VBSUU7QUFFRjs7O0VBR0U7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXlCRTtBQUVGLE1BQU0sUUFBUSxHQUFpQixHQUFXLEVBQUUsQ0FBQyxHQUFHLENBQUM7QUFFakQsMkRBQTJEO0FBQzNELGtFQUFrRTtBQUNsRSxLQUFLLFVBQVUsUUFBUTtJQUNyQiwyQkFBMkI7SUFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMvQyxJQUFJO1FBQ0YsTUFBTSxXQUFXLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBYyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RixNQUFNLFNBQVMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFjLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3BDO0lBQ0QseUJBQXlCO0lBQ3pCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQsZ0VBQWdFO0FBQ2hFLEtBQUssVUFBVSxXQUFXLENBQUMsSUFBbUI7SUFDNUMsOEJBQThCO0lBQzlCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1FBQ3RCLElBQUk7WUFDRixNQUFNLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixXQUFXLEVBQUUsQ0FBQztZQUNkLE1BQU0sY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLFdBQVcsRUFBRSxDQUFDO1lBQ2QsTUFBTSxXQUFXLEdB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TyxDQUFDLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxPQUFPLEVBQUUsQ0FBQzthQUNsQjtRQUNILENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELDRFQUE0RTtBQUM1RSxTQUFTLGNBQWMsQ0FBQyxJQUFpQjtJQUN2Qyx1Q0FBdUM7SUFDdkMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZCLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3BCLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQjtRQUNELE9BQU87S0FDUjtJQUNELElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7S0FDRjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUMxQztBQUNILENBQUM7QUFFRCx1Q0FBdUM7QUFDdkMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKiBJTVBPUlRBTlQhIFlvdSBNVVNUIG5hdmlnYXRlIHRvIHlvdXIgXCJBbGwgYWN0aXZpdHlcIiB0aW1lbGluZSBmb3IgdGhpcyB0byB3b3JrIVxuKiBodHRwczovL3d3dy5mYWNlYm9vay5jb20vW3lvdXIgdXNlcm5hbWVdL2FsbGFjdGl2aXR5XG4qIFlvdSBjYW4gYWxzbyBnZXQgdG8gdGhpcyBieSBjbGlja2luZyB5b3VyIG5hbWUgdG8gZ2V0IHRvIHlvdXIgb3duIHRpbWVsaW5lLCB0aGVuIGNsaWNraW5nIFwiVmlldyBBY3Rpdml0eSBMb2dcIlxuKi9cblxuLypcbiogV0FSTklORyEgVGhpcyB3aWxsIHN0YXJ0IGltbWVkaWF0ZWx5LCBhbmQgZGVsZXRlICpldmVyeXRoaW5nKiBpdCBjYW4hXG4qIERvbid0IHJ1biBpZiB5b3UgZG9uJ3Qgd2FudCB0byBsb3NlIGFueXRoaW5nIGFuZC9vciBoYXZlbnQgYmFja2VkIGl0IHVwIVxuKi9cblxuLypcbiogVGhpcyBzY3JpcHQgd2lsbCBhdHRlbXB0IHRvIGhpZGUgYW5kL29yIGRlbGV0ZSBldmVyeXRoaW5nIGZyb20geW91ciBGYWNlYm9vayB0aW1lbGluZS5cbipcbiogWW91IHdpbGwgb3BlbiB0aGUgYnJvd3NlciBkZXZlbG9wZXIgdG9vbHMgYW5kIGNvcHktcGFzdGUgdGhpcyB3aG9sZSBzY3JpcHQgaW50byB0aGUgXCJjb25zb2xlXCIuXG4qIChVc3VhbGx5IHByZXNzIGFuZCBob2xkIE1hYzogQ21kLShBbHQvT3B0aW9uKS1JIG9yIFdpbmRvdzogQ3RybC1TaGlmdC1JKVxuKlxuKiBGYWNlYm9vayBzaG93cyBhIG1lc3NhZ2UgaW4gdGhlIGRldmVsb3BlciB0b29sIGNvbnNvbGUgd2FybmluZyB5b3UgYWJvdXQgcGFzdGluZyBzY3JpcHRzLFxuKiAgIGFuZCB0aGV5J3JlIGFic29sdXRlbHkgcmlnaHQsIGJlIHZlcnkgY2FyZWZ1bCBhYm91dCBwYXN0aW5nIHRoaW5ncyBoZXJlLFxuKiAgIGFzIGl0IHdpbGwgaGF2ZSBmdWxsIGFjY2VzcyB0byB5b3VyIGJyb3dzZXIgYW5kIGFueXRoaW5nIHlvdSBjYW4gZG8gb3Igc2VlLlxuKlxuKiBUaGlzIHJ1bnMgaW4gbXVsdGlwbGUgcGhhc2VzLCBzZXR0aW5nIHByaXZhY3kgdG8gXCJPbmx5IG1lXCIgb3IgXCJPbmx5IG1lXCIgaWYgaXQgY2FuLFxuKiAgIHRoZW4gc2V0dGluZyBwb3N0IHZpc2liaWxpdHkgdG8gXCJIaWRkZW4gZnJvbSB0aW1lbGluZVwiLFxuKiAgIHRoZW4gYXR0ZW1wdHMgdG8gdW5saWtlIG9yIHVudGFnLCBhbmQgZmluYWxseSBkZWxldGUgaXQsIGlmIHBvc3NpYmxlLlxuKlxuKiBJdCBjYW4gdGFrZSBhIHZlcnkgbG9uZyB0aW1lIHRvIHJ1biBkZXBlbmRpbmcgb24gaG93IG11Y2ggaXQgd2lsbCBkZWxldGUuXG4qIFRoZSBsb25nZXIgaXQgcnVucywgdGhlIG1vcmUgaXQgZGVsZXRlcy4gSXQgY2FuIHRha2UgaG91cnMgb3IgZGF5cy5cbipcbiogVGhpcyBwcm9jZXNzIGlzIHBlcm1hbmVudCBhbmQgY2Fubm90IGJlIHJldmVyc2VkIG9yIHVuZG9uZSwgc28gZG8gYSBGYWNlYm9vayBiYWNrdXAgZmlyc3QhXG4qXG4qIEFsc28gY29uc2lkZXIgZ29pbmcgdGhyb3VnaCB0aGUgdmFyaW91cyBwcml2YWN5IHNldHRpbmdzIG9uIHlvdXIgQWJvdXQgcGFnZSBhbmQgYWNjb3VudCBzZXR0aW5ncyBhbmRcbiogICBsb2NraW5nIHRob3NlIHNldHRpbmdzIGRvd24gdG9vLCBpZiB5b3Ugd2FudCB0byBiZSBleHRyYSBzdXJlLiBZb3Ugd2lsbCBoYXZlIHRvIGRlbGV0ZSBhbnkgcGVyc29uYWxcbiogICBkZXRhaWxzIGZyb20geW91ciBhY2NvdW50IGFuZCBcIkFib3V0XCIgc2VjdGlvbiB5b3Vyc2VsZi5cbiogICBDaGVjayBvdXQgaHR0cHM6Ly9maWVsZGd1aWRlLmdpem1vZG8uY29tL2hlcmVzLWhvdy10by1zaGFyZS1hcy1saXR0bGUtZGF0YS1hcy1wb3NzaWJsZS13aXRob3V0LWQtMTgyMzkxNTYyOFxuKlxuKiBUaGlzIGNvbWVzIHdpdGggYWJzb2x1dGVseSBubyB3YXJyYW50eSwgZ3VhcmFudGVlcywgb3Igc3VwcG9ydC4gWW91IHJ1biB0aGlzIGF0IHlvdXIgb3duIHJpc2shXG4qL1xuXG5jb25zdCBnZXRUaW1lcjogKCkgPT4gbnVtYmVyID0gKCk6IG51bWJlciA9PiAzMDA7XG5cbi8vIE1haW4gbG9vcCBvZiB0aGUgcHJvZ3JhbSwgaXQgd2lsbCBzY3JvbGwgdXAgYW5kIGRvd24gYW5kXG4vLyBsb29rIGZvciBcIkxvYWQgbW9yZVwiIHN0eWxlIGxpbmtzIHRvIGtlZXAgZXhwYW5kaW5nIHRoZSB0aW1lbGluZVxuYXN5bmMgZnVuY3Rpb24gbmV4dFBhZ2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gIC8vIGNvbnNvbGUubG9nKGBuZXh0UGFnZWApO1xuICB3aW5kb3cuc2Nyb2xsVG8oMCwgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQpO1xuICB0cnkge1xuICAgIGF3YWl0IHByb2Nlc3NSb3dzKFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgLnVpTGlzdCAudWlCb3hXaGl0ZWApXSk7XG4gICAgYXdhaXQgY2xpY2tJdGVtKFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgLnVpTW9yZVBhZ2VyIGFgKV0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihgbmV4dFBhZ2UgZXJyb3JgLCBlKTtcbiAgfVxuICAvLyB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gIHNldFRpbWVvdXQobmV4dFBhZ2UsIGdldFRpbWVyKCkpO1xufVxuXG4vLyBHbyBkb3duIGVhY2ggbGluZSBvZiB5b3VyIHRpbWVsaW5lIGxvb2tpbmcgZm9yIGFjdGlvbiBidXR0b25zXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzUm93cyhyb3dzOiBIVE1MRWxlbWVudFtdKTogUHJvbWlzZTx2b2lkPiB7XG4gIC8vIGNvbnNvbGUubG9nKFwicHJvY2Vzc1Jvd3NcIik7XG4gIGZvciAoY29uc3Qgcm93IG9mIHJvd3MpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgY2hhbmdlU2hhcmluZyhyb3cpO1xuICAgICAgY2xlYW51cE1lbnUoKTtcbiAgICAgIGF3YWl0IGNoYW5nZVRpbWVsaW5lKHJvdyk7XG4gICAgICBjbGVhbnVwTWVudSgpO1xuICAgICAgY29uc3QgY2xvc2VEaWFsb2c6IEhUTUxFbGVtZW50W10gfCB1bmRlZmluZWQgPSBhd2FpdCBnZXREaWFsb2dGb3IoYENsb3NlYCk7XG4gICAgICBpZiAoY2xvc2VEaWFsb2cpIHtcbiAgICAgICAgYXdhaXQgY2xpY2tJdGVtKGNsb3NlRGlhbG9nKTtcbiAgICAgIH1cbiAgICAgIGNsZWFudXBFbGVtZW50KHJvdyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgcHJvY2Vzc1Jvd3MgZXJyb3JgLCBlKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gSWYgdGhlIHByaXZhY3kgb2YgdGhlIHRpbWVsaW5lIGl0ZW0gY2FuIGJlIGNoYW5nZWQsIHNldCBpdCB0byBPbmx5IG1lXG5hc3luYyBmdW5jdGlvbiBjaGFuZ2VTaGFyaW5nKHJvdzogSFRNTEVsZW1lbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gY29uc29sZS5sb2coXCJjaGFuZ2VTaGFyaW5nXCIsIHJvdyk7XG4gIGNvbnN0IHNoYXJpbmc6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHJvdy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW2FyaWEtbGFiZWx+PVwiU2hhcmVkXCJdYCk7XG4gIGlmIChzaGFyaW5nKSB7XG4gICAgYXdhaXQgY2xpY2tJdGVtKHNoYXJpbmcpO1xuICAgIGNvbnN0IG9ubHlNZVBsdXM6IEhUTUxFbGVtZW50W10gfCB1bmRlZmluZWQgPSBhd2FpdCBnZXRNZW51Rm9yKGBPbmx5IG1lICgrKWApO1xuICAgIGlmIChvbmx5TWVQbHVzKSB7XG4gICAgICBhd2FpdCBjbGlja0l0ZW0ob25seU1lUGx1cyk7XG4gICAgfVxuICAgIGF3YWl0IGNsaWNrSXRlbShzaGFyaW5nKTtcbiAgICBjb25zdCBvbmx5TWU6IEhUTUxFbGVtZW50W10gfCB1bmRlZmluZWQgPSBhd2FpdCBnZXRNZW51Rm9yKGBPbmx5IG1lYCk7XG4gICAgaWYgKG9ubHlNZSkge1xuICAgICAgYXdhaXQgY2xpY2tJdGVtKG9ubHlNZSk7XG4gICAgfVxuICB9XG59XG5cbi8vIExvb2sgZm9yIHRoZSBlZGl0IGl0ZW0gYnV0dG9uXG5hc3luYyBmdW5jdGlvbiBjaGFuZ2VUaW1lbGluZShyb3c6IEhUTUxFbGVtZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGVkaXQ6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHJvdy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW2FyaWEtbGFiZWw9XCJFZGl0XCJdYCk7XG4gIGlmICghZWRpdCkge1xuICAgIHJldHVybjtcbiAgfVxuICBhd2FpdCBjbGlja0l0ZW0oZWRpdCk7XG4gIGNvbnN0IG1lbnU6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGBbcm9sZT1cIm1lbnVcIl1gKTtcbiAgaWYgKG1lbnUpIHtcbiAgICBjb25zdCBhbGxNZW51SXRlbXM6IEhUTUxFbGVtZW50W10gPSBbLi4ubWVudS5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgW3JvbGU9XCJtZW51XCJdIFtyb2xlPVwicHJlc2VudGF0aW9uXCJdIGFgKV07XG4gICAgZm9yIChjb25zdCBtZW51SXRlbSBvZiBhbGxNZW51SXRlbXMpIHtcbiAgICAgIC8vIGNvbnN0IG1lbnVJdGVtID0gYWxsTWVudUl0ZW1zW2ldO1xuICAgICAgY29uc3QgdGV4dDogc3RyaW5nID0gbWVudUl0ZW0uaW5uZXJUZXh0LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgLy8gY29uc29sZS5sb2coYFRleHQ6IFwiJHt0ZXh0fVwiYCk7XG4gICAgICAvLyBMb29rIGZvciBzcGVjaWZpYyBpdGVtIGluIHRoZSBkcm9wIGRvd24gbWVudSBhbmQgY2xpY2sgdGhlbVxuICAgICAgc3dpdGNoICh0ZXh0KSB7XG4gICAgICAgIC8vIEhpZGUgZnJvbSB0aW1lbGluZVxuICAgICAgICBjYXNlICdoaWRkZW4gZnJvbSB0aW1lbGluZSc6IHtcbiAgICAgICAgICBhd2FpdCBjbGlja0l0ZW0obWVudUl0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVubGlrZSAodXN1YWxseSBqdXN0IHBvc3RzIGFuZCBjb21tZW50cywgbm90IHBhZ2VzKVxuICAgICAgICBjYXNlICd1bmxpa2UnOiB7XG4gICAgICAgICAgYXdhaXQgY2xpY2tJdGVtKG1lbnVJdGVtKTtcbiAgICAgICAgICBjb25zdCBjb25maXJtOiBIVE1MRWxlbWVudFtdIHwgdW5kZWZpbmVkID0gYXdhaXQgZ2V0RGlhbG9nRm9yKGBDbG9zZWApO1xuICAgICAgICAgIGlmIChjb25maXJtKSB7XG4gICAgICAgICAgICBhd2FpdCBjbGlja0l0ZW0oY29uZmlybSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVudm90ZSAoTmV3OiBwb2xscylcbiAgICAgICAgY2FzZSAndW52b3RlJzoge1xuICAgICAgICAgIGF3YWl0IGNsaWNrSXRlbShtZW51SXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTGlrZSB1bmxpa2UgYnV0IGZvciBzbWlsZXMsIGhlYXJ0cywgZXRjLlxuICAgICAgICBjYXNlICdyZW1vdmUgcmVhY3Rpb24nOiB7XG4gICAgICAgICAgYXdhaXQgY2xpY2tJdGVtKG1lbnVJdGVtKTtcbiAgICAgICAgICBjb25zdCBjb25maXJtOiBIVE1MRWxlbWVudFtdIHwgdW5kZWZpbmVkID0gYXdhaXQgZ2V0RGlhbG9nRm9yKGBDbG9zZWApO1xuICAgICAgICAgIGlmIChjb25maXJtKSB7XG4gICAgICAgICAgICBhd2FpdCBjbGlja0l0ZW0oY29uZmlybSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVudGFnIHlvdXJzZWxmIGZyb20gcG9zdHMgYW5kIHBpY3R1cmVzXG4gICAgICAgIGNhc2UgJ3JlcG9ydC9yZW1vdmUgdGFnJzoge1xuICAgICAgICAgIGF3YWl0IGNsaWNrSXRlbShtZW51SXRlbSk7XG4gICAgICAgICAgYXdhaXQgdW50YWdGcm9tVGltZWxpbmUoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBEZWxldGUgdGhlIHBvc3QgYWx0b2dldGhlclxuICAgICAgICBjYXNlICdkZWxldGUnOiB7XG4gICAgICAgICAgYXdhaXQgY2xpY2tJdGVtKG1lbnVJdGVtKTtcbiAgICAgICAgICBjb25zdCBjb25maXJtOiBIVE1MRWxlbWVudFtdIHwgdW5kZWZpbmVkID0gYXdhaXQgZ2V0RGlhbG9nRm9yKGBEZWxldGVgKTtcbiAgICAgICAgICBpZiAoY29uZmlybSkge1xuICAgICAgICAgICAgYXdhaXQgY2xpY2tJdGVtKGNvbmZpcm0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgdW50YWcgcHJvY2VzcyBoYXMgYSBtdWx0aS1kaWFsb2cgcHJvY2VzcyB0aGF0IG11c3QgYmUgbmF2aWdhdGVkIHRvIHJlbW92ZSB5b3Vyc2VsZixcbi8vICAgc28gdGhpcyBzaG91bGQgbmF2aWdhdGUgaXQgYW5kIGNsaWNrIGFsbCB0aGUgbmVjZXNzYXJ5IHRoaW5ncyB0byByZW1vdmUgdGhlIHRhZy5cbmFzeW5jIGZ1bmN0aW9uIHVudGFnRnJvbVRpbWVsaW5lKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBzdHJpbmdzVG9Ucnk6IHN0cmluZ1tdID0gW1xuICAgIGBJJ20gaW4gdGhpcyBwaG90byBhbmQgSSBkb24ndCBsaWtlIGl0YCxcbiAgICBgVGhpcyBpcyBhIHBob3RvIG9mIG1lIG9yIG15IGZhbWlseSB0aGF0IEkgZG9uJ3Qgd2FudCBvbiBGYWNlYm9va2AsXG4gICAgYEkgdGhpbmsgaXQncyBhbiB1bmF1dGhvcml6ZWQgdXNlIG9mIG15IGludGVsbGVjdHVhbCBwcm9wZXJ0eWAsXG4gICAgYEkgdGhpbmsgaXQgc2hvdWxkbid0IGJlIG9uIEZhY2Vib29rYCxcbiAgICBgSXQncyBhIGJhZCBwaG90byBvZiBtZWAsXG4gICAgYEl0J3MgaW5hcHByb3ByaWF0ZWAsXG4gICAgYEl0IG1ha2VzIG1lIHNhZGAsXG4gICAgYEl0J3MgZW1iYXJyYXNzaW5nYCxcbiAgICBgT3RoZXJgLFxuICAgIGBTb21ldGhpbmcgZWxzZWAsXG4gICAgYEl0J3Mgc29tZXRoaW5nIGVsc2VgLFxuICAgIGBTZWUgbW9yZSBvcHRpb25zYCxcbiAgICBgUmVtb3ZlIFRhZ2AsXG4gIF07XG4gIGxldCBsb29wQ291bnQ6IG51bWJlcjtcbiAgZm9yIChsb29wQ291bnQgPSAwOyBsb29wQ291bnQgPCA1OyBsb29wQ291bnQrKykge1xuICAgIGZvciAoY29uc3QgdHJ5U3RyaW5nIG9mIHN0cmluZ3NUb1RyeSkge1xuICAgICAgLy8gY29uc29sZS5sb2coYFRyeWluZyBcIiR7dHJ5U3RyaW5nfVwiYCk7XG4gICAgICBjb25zdCByZXBvcnQ6IEhUTUxFbGVtZW50W10gfCB1bmRlZmluZWQgPSBhd2FpdCBnZXREaWFsb2dGb3IodHJ5U3RyaW5nKTtcbiAgICAgIGlmIChyZXBvcnQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYEZvdW5kIFwiJHt0cnlTdHJpbmd9XCJgKTtcbiAgICAgICAgYXdhaXQgY2xpY2tJdGVtKHJlcG9ydCk7XG4gICAgICAgIGNvbnN0IGNvbnQ6IEhUTUxFbGVtZW50W10gfCB1bmRlZmluZWQgPSBhd2FpdCBnZXREaWFsb2dGb3IoYENvbnRpbnVlYCk7XG4gICAgICAgIGlmIChjb250KSB7XG4gICAgICAgICAgYXdhaXQgY2xpY2tJdGVtKGNvbnQpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZvdW5kRG9uZTogSFRNTEVsZW1lbnRbXSB8IHVuZGVmaW5lZCA9IGF3YWl0IGdldERpYWxvZ0ZvcihgRG9uZWApO1xuICBpZiAoZm91bmREb25lKSB7XG4gICAgYXdhaXQgY2xpY2tJdGVtKGZvdW5kRG9uZSk7XG4gIH1cbn1cblxuLy8gSGVscGVyIHRvIGdldCBjbGlja2FibGUgZWxlbWVudHMgaW4gZHJvcCBkb3duIG1lbnVzXG5mdW5jdGlvbiBnZXRNZW51Rm9yKHRleHQ6IHN0cmluZyk6IFByb21pc2U8SFRNTEVsZW1lbnRbXSB8IHVuZGVmaW5lZD4ge1xuICAvLyBjb25zb2xlLmxvZyhcImdldE1lbnVGb3Igb3V0ZXJcIiwgdGV4dCk7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZTogKHZhbHVlPzogSFRNTEVsZW1lbnRbXSkgPT4gdm9pZCk6IHZvaWQgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgbWVudTogSFRNTEVsZW1lbnQgfCBudWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYFtyb2xlPVwibWVudVwiXWApO1xuICAgICAgICBpZiAobWVudSkge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZ2V0TWVudUZvciBpbm5lclwiLCB0ZXh0KTtcbiAgICAgICAgICBjb25zdCBhbGxNZW51SXRlbXM6IEhUTUxFbGVtZW50W10gPSBbLi4ubWVudS5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgKmApXTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZE1lbnVJdGVtczogSFRNTEVsZW1lbnRbXSA9IGFsbE1lbnVJdGVtcy5maWx0ZXIoKGl0ZW06IEhUTUxFbGVtZW50KSA9PiBpdGVtLmlubmVyVGV4dC50b0xvd2VyQ2FzZSgpID09PSB0ZXh0LnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgIGlmIChmaWx0ZXJlZE1lbnVJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShbLi4uZmlsdGVyZWRNZW51SXRlbXNdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBnZXRNZW51Rm9yIGVycm9yYCwgZSk7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSwgZ2V0VGltZXIoKSk7XG4gIH0pO1xufVxuXG4vLyBIZWxwZXIgdG8gZ2V0IGNsaWNrYWJsZSBlbGVtZW50cyBpbiBwb3AgdXAgZGlhbG9nc1xuZnVuY3Rpb24gZ2V0RGlhbG9nRm9yKHRleHQ6IHN0cmluZyk6IFByb21pc2U8SFRNTEVsZW1lbnRbXSB8IHVuZGVmaW5lZD4ge1xuICAvLyBjb25zb2xlLmxvZyhcImdldERpYWxvZ0ZvciBvdXRlclwiLCB0ZXh0KTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOiAodmFsdWU/OiBIVE1MRWxlbWVudFtdKSA9PiB2b2lkKTogdm9pZCA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBkaWFsb2dzOiBIVE1MRWxlbWVudFtdID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KGBbcm9sZT1cImRpYWxvZ1wiXWApXTtcbiAgICAgICAgY29uc3QgZGlhbG9nOiBIVE1MRWxlbWVudCA9IGRpYWxvZ3NbZGlhbG9ncy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGRpYWxvZykge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZ2V0RGlhbG9nRm9yIGlubmVyXCIsIHRleHQpO1xuICAgICAgICAgIGNvbnN0IGFsbERpYWxvZ0l0ZW1zOiBIVE1MRWxlbWVudFtdID0gWy4uLmRpYWxvZy5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgKmApXTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZERpYWxvZ0l0ZW1zOiBIVE1MRWxlbWVudFtdID0gYWxsRGlhbG9nSXRlbXMuZmlsdGVyKChpdGVtOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaW5uZXJUZXh0LnRvTG93ZXJDYXNlKCkgPT09IHRleHQudG9Mb3dlckNhc2UoKSAmJlxuICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICFpdGVtLmF0dHJpYnV0ZXMuZGlzYWJsZWQgJiZcbiAgICAgICAgICAgICAgIWl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRkZW5fZWxlbScpICYmXG4gICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgKCFpdGVtLmNvbXB1dGVkU3R5bGVNYXAgfHwgaXRlbS5jb21wdXRlZFN0eWxlTWFwKCkuZ2V0KCdkaXNwbGF5JykudmFsdWUgIT09ICdub25lJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGZpbHRlcmVkRGlhbG9nSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoWy4uLmZpbHRlcmVkRGlhbG9nSXRlbXNdKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBnZXREaWFsb2dGb3IgZXJyb3JgLCBlKTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9LCBnZXRUaW1lcigpKTtcbiAgfSk7XG59XG5cbi8vIFJlbW92ZSBkcm9wIGRvd24gbWVudXMgd2hlbiB3ZVwicmUgZG93biB3aXRoIHRoZW0gYmVjYXVzZSBGYWNlYm9vayBkb2Vzbid0XG4vLyAgIGFuZCB0aGUgaGlkZGVuIEhUTUwgZ3Jvd3Mgc2lnbmlmaWNhbnRseSBpZiB3ZSBkb24ndC5cbmZ1bmN0aW9uIGNsZWFudXBNZW51KCk6IHVuZGVmaW5lZCB7XG4gIC8vIGNvbnNvbGUubG9nKFwiY2xlYW51cE1lbnVcIik7XG4gIGNvbnN0IG1lbnU6IEhUTUxFbGVtZW50IHwgbnVsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGBbcm9sZT1cIm1lbnVcIl1gKTtcbiAgaWYgKG1lbnUpIHtcbiAgICByZXR1cm4gY2xlYW51cEVsZW1lbnQobWVudSk7XG4gIH1cbn1cblxuLy8gU2ltdWxhdGUgYSB1c2VyIGNsaWNraW5nIGFuIGl0ZW0uXG5hc3luYyBmdW5jdGlvbiBjbGlja0l0ZW0oaXRlbTogSFRNTEVsZW1lbnQgfCBIVE1MRWxlbWVudFtdKTogUHJvbWlzZTx2b2lkPiB7XG4gIC8vIGNvbnNvbGUubG9nKFwiY2xpY2tJdGVtIG91dGVyXCIsIGl0ZW0pO1xuICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgIGZvciAoY29uc3QgaSBvZiBpdGVtKSB7XG4gICAgICBhd2FpdCBjbGlja0l0ZW0oaSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmU6ICgpID0+IHZvaWQpOiB2b2lkID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2xpY2tJdGVtIGlubmVyXCIsIGl0ZW0pO1xuICAgICAgICBpdGVtLmNsaWNrKCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgY2xpY2tJdGVtIGVycm9yYCwgZSk7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSwgZ2V0VGltZXIoKSk7XG4gIH0pO1xufVxuXG4vLyBSZW1vdmUgZWxlbWVudHMgZnJvbSB0aGUgcGFnZSBzbyB0aGUgcHJvY2Vzc2luZyBkb2Vzbid0IHNsb3cgZG93biBhcyBtdWNoXG5mdW5jdGlvbiBjbGVhbnVwRWxlbWVudChpdGVtOiBIVE1MRWxlbWVudCk6IHVuZGVmaW5lZCB7XG4gIC8vIGNvbnNvbGUubG9nKFwiY2xlYW51cEVsZW1lbnRcIiwgaXRlbSk7XG4gIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgZm9yIChjb25zdCBpIG9mIGl0ZW0pIHtcbiAgICAgIGNsZWFudXBFbGVtZW50KGkpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAoaXRlbS5wYXJlbnROb2RlKSB7XG4gICAgICBpdGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaXRlbSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihgY2xlYW51cEVsZW1lbnQgZXJyb3JgLCBlKTtcbiAgfVxufVxuXG4vLyBTdGFydCBieSBjYWxsaW5nIG5leHRQYWdlIHJpZ2h0IGF3YXlcbm5leHRQYWdlKCkudGhlbigocjogdm9pZCkgPT4gY29uc29sZS5sb2cocikpO1xuIl19