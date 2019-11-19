"use strict";
/*
* IMPORTANT! You MUST navigate to your "All activity" timeline for this to work!
* https://www.facebook.com/[your username]/allactivity
* You can also get to this by clicking your name to get to your own timeline, then clicking "View Activity Log"
*/
/*
* You will open the browser developer tools and copy-paste this whole script into the "console".
* (Usually press and hold Mac: Cmd-(Alt/Option)-I or Window: Ctrl-Shift-I)
*
* Facebook shows a message in the developer tool console warning you about pasting scripts,
*   and they're absolutely right, be very careful about pasting things here,
*   as it will have full access to your browser and anything you can do or see.
*
* This runs in multiple phases, setting privacy to "Public" or "Public (+)" if it can,
*   then setting post visibility to "allowed on timeline",
*
* It can take a very long time to run depending on how much it will delete.
* The longer it runs, the more it deletes. It can take hours or days.
*
* This comes with absolutely no warranty, guarantees, or support. You run this at your own risk!
*/
const timeout = () => 500;
// Main loop of the program, it will scroll up and down and
// look for "Load more" style links to keep expanding the timeline
async function nextPage() {
    // console.log(`nextPage`);
    try {
        await processRows([...document.querySelectorAll(`.uiList .uiBoxWhite`)]);
        await clickItem([...document.querySelectorAll(`.uiMorePager a`)]);
    }
    catch (e) {
        console.log(`nextPage error`, e);
    }
    setTimeout(nextPage, timeout());
}
// Go down each line of your timeline looking for action buttons
async function processRows(rows) {
    // console.log("processRows");
    for (const row of rows)
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
                    // show on timeline
                    case "allowed on timeline": {
                        await clickItem(menuItem);
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
nextPage().then(r => console.log("DONE?", r));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2stcHVibGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ZhY2Vib29rLXB1YmxpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7RUFJRTtBQUVGOzs7Ozs7Ozs7Ozs7Ozs7RUFlRTtBQUNGLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztBQUUxQiwyREFBMkQ7QUFDM0Qsa0VBQWtFO0FBQ2xFLEtBQUssVUFBVSxRQUFRO0lBQ3ZCLDJCQUEyQjtJQUN6QixJQUFJO1FBQ0YsTUFBTSxXQUFXLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBYyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RixNQUFNLFNBQVMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFjLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQUU7SUFDakQsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFFRCxnRUFBZ0U7QUFDaEUsS0FBSyxVQUFVLFdBQVcsQ0FBQyxJQUFtQjtJQUM5Qyw4QkFBOEI7SUFDNUIsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJO1FBQUUsSUFBSTtZQUMxQixNQUFNLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixNQUFNLFdBQVcsRUFBRSxDQUFDO1lBQ3BCLE1BQU0sY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sV0FBVyxFQUFFLENBQUM7WUFDcEIsTUFBTSxTQUFTLENBQUMsTUFBTSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM3QyxNQUFNLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQjtRQUFDLE9B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UjtJQUNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2QixLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNwQixNQUFNLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6QjtRQUNELE9BQU87S0FDUjtJQUNELE9BQU8sTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ25DLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNwQixJQUFJO2dCQUNGLDZDQUE2QztnQkFDN0MsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkM7Z0JBQ0QsT0FBTyxPQUFPLEVBQUUsQ0FBQzthQUNsQjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxPQUFPLEVBQUUsQ0FBQzthQUFFO1FBQy9FLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELHVDQUF1QztBQUN2QyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiogSU1QT1JUQU5UISBZb3UgTVVTVCBuYXZpZ2F0ZSB0byB5b3VyIFwiQWxsIGFjdGl2aXR5XCIgdGltZWxpbmUgZm9yIHRoaXMgdG8gd29yayFcbiogaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL1t5b3VyIHVzZXJuYW1lXS9hbGxhY3Rpdml0eVxuKiBZb3UgY2FuIGFsc28gZ2V0IHRvIHRoaXMgYnkgY2xpY2tpbmcgeW91ciBuYW1lIHRvIGdldCB0byB5b3VyIG93biB0aW1lbGluZSwgdGhlbiBjbGlja2luZyBcIlZpZXcgQWN0aXZpdHkgTG9nXCJcbiovXG5cbi8qXG4qIFlvdSB3aWxsIG9wZW4gdGhlIGJyb3dzZXIgZGV2ZWxvcGVyIHRvb2xzIGFuZCBjb3B5LXBhc3RlIHRoaXMgd2hvbGUgc2NyaXB0IGludG8gdGhlIFwiY29uc29sZVwiLlxuKiAoVXN1YWxseSBwcmVzcyBhbmQgaG9sZCBNYWM6IENtZC0oQWx0L09wdGlvbiktSSBvciBXaW5kb3c6IEN0cmwtU2hpZnQtSSlcbipcbiogRmFjZWJvb2sgc2hvd3MgYSBtZXNzYWdlIGluIHRoZSBkZXZlbG9wZXIgdG9vbCBjb25zb2xlIHdhcm5pbmcgeW91IGFib3V0IHBhc3Rpbmcgc2NyaXB0cyxcbiogICBhbmQgdGhleSdyZSBhYnNvbHV0ZWx5IHJpZ2h0LCBiZSB2ZXJ5IGNhcmVmdWwgYWJvdXQgcGFzdGluZyB0aGluZ3MgaGVyZSxcbiogICBhcyBpdCB3aWxsIGhhdmUgZnVsbCBhY2Nlc3MgdG8geW91ciBicm93c2VyIGFuZCBhbnl0aGluZyB5b3UgY2FuIGRvIG9yIHNlZS5cbipcbiogVGhpcyBydW5zIGluIG11bHRpcGxlIHBoYXNlcywgc2V0dGluZyBwcml2YWN5IHRvIFwiUHVibGljXCIgb3IgXCJQdWJsaWMgKCspXCIgaWYgaXQgY2FuLFxuKiAgIHRoZW4gc2V0dGluZyBwb3N0IHZpc2liaWxpdHkgdG8gXCJhbGxvd2VkIG9uIHRpbWVsaW5lXCIsXG4qXG4qIEl0IGNhbiB0YWtlIGEgdmVyeSBsb25nIHRpbWUgdG8gcnVuIGRlcGVuZGluZyBvbiBob3cgbXVjaCBpdCB3aWxsIGRlbGV0ZS5cbiogVGhlIGxvbmdlciBpdCBydW5zLCB0aGUgbW9yZSBpdCBkZWxldGVzLiBJdCBjYW4gdGFrZSBob3VycyBvciBkYXlzLlxuKlxuKiBUaGlzIGNvbWVzIHdpdGggYWJzb2x1dGVseSBubyB3YXJyYW50eSwgZ3VhcmFudGVlcywgb3Igc3VwcG9ydC4gWW91IHJ1biB0aGlzIGF0IHlvdXIgb3duIHJpc2shXG4qL1xuY29uc3QgdGltZW91dCA9ICgpID0+IDUwMDtcblxuLy8gTWFpbiBsb29wIG9mIHRoZSBwcm9ncmFtLCBpdCB3aWxsIHNjcm9sbCB1cCBhbmQgZG93biBhbmRcbi8vIGxvb2sgZm9yIFwiTG9hZCBtb3JlXCIgc3R5bGUgbGlua3MgdG8ga2VlcCBleHBhbmRpbmcgdGhlIHRpbWVsaW5lXG5hc3luYyBmdW5jdGlvbiBuZXh0UGFnZSgpIHtcbi8vIGNvbnNvbGUubG9nKGBuZXh0UGFnZWApO1xuICB0cnkge1xuICAgIGF3YWl0IHByb2Nlc3NSb3dzKFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgLnVpTGlzdCAudWlCb3hXaGl0ZWApXSk7XG4gICAgYXdhaXQgY2xpY2tJdGVtKFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgLnVpTW9yZVBhZ2VyIGFgKV0pO1xuICB9IGNhdGNoIChlKSB7IGNvbnNvbGUubG9nKGBuZXh0UGFnZSBlcnJvcmAsIGUpOyB9XG4gIHNldFRpbWVvdXQobmV4dFBhZ2UsIHRpbWVvdXQoKSk7XG59XG5cbi8vIEdvIGRvd24gZWFjaCBsaW5lIG9mIHlvdXIgdGltZWxpbmUgbG9va2luZyBmb3IgYWN0aW9uIGJ1dHRvbnNcbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NSb3dzKHJvd3M6IEhUTUxFbGVtZW50W10pIHtcbi8vIGNvbnNvbGUubG9nKFwicHJvY2Vzc1Jvd3NcIik7XG4gIGZvciAoY29uc3Qgcm93IG9mIHJvd3MpIHRyeSB7XG4gICAgYXdhaXQgY2hhbmdlU2hhcmluZyhyb3cpO1xuICAgIGF3YWl0IGNsZWFudXBNZW51KCk7XG4gICAgYXdhaXQgY2hhbmdlVGltZWxpbmUocm93KTtcbiAgICBhd2FpdCBjbGVhbnVwTWVudSgpO1xuICAgIGF3YWl0IGNsaWNrSXRlbShhd2FpdCBnZXREaWFsb2dGb3IoYENsb3NlYCkpO1xuICAgIGF3YWl0IGNsZWFudXBFbGVtZW50KHJvdyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhgcHJvY2Vzc1Jvd3MgZXJyb3JgLCBlKTtcbiAgfVxufVxuXG4vLyBJZiB0aGUgcHJpdmFjeSBvZiB0aGUgdGltZWxpbmUgaXRlbSBjYW4gYmUgY2hhbmdlZCwgc2V0IGl0IHRvIFB1YmxpY1xuYXN5bmMgZnVuY3Rpb24gY2hhbmdlU2hhcmluZyhyb3c6IEhUTUxFbGVtZW50KSB7XG4vLyBjb25zb2xlLmxvZyhcImNoYW5nZVNoYXJpbmdcIiwgcm93KTtcbiAgY29uc3Qgc2hhcmluZyA9IHJvdy5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW2FyaWEtbGFiZWx+PVwiU2hhcmVkXCJdYCk7XG4gIGlmIChzaGFyaW5nKSB7XG4gICAgYXdhaXQgY2xpY2tJdGVtKHNoYXJpbmcpO1xuICAgIGF3YWl0IGNsaWNrSXRlbShhd2FpdCBnZXRNZW51Rm9yKGBQdWJsaWNgKSk7XG4gICAgYXdhaXQgY2xpY2tJdGVtKHNoYXJpbmcpO1xuICAgIGF3YWl0IGNsaWNrSXRlbShhd2FpdCBnZXRNZW51Rm9yKGBQdWJsaWMgKCspYCkpO1xuICB9XG59XG5cbi8vIExvb2sgZm9yIHRoZSBlZGl0IGl0ZW0gYnV0dG9uXG5hc3luYyBmdW5jdGlvbiBjaGFuZ2VUaW1lbGluZShyb3c6IEhUTUxFbGVtZW50KSB7XG4gIGNvbnN0IGVkaXQgPSByb3cucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYFthcmlhLWxhYmVsPVwiRWRpdFwiXWApO1xuICBpZiAoZWRpdCkge1xuICAgIGF3YWl0IGNsaWNrSXRlbShlZGl0KTtcbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYFtyb2xlPVwibWVudVwiXWApO1xuICAgIGlmIChtZW51KSB7XG4gICAgICBjb25zdCBhbGxNZW51SXRlbXMgPSBbLi4ubWVudS5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgW3JvbGU9XCJtZW51XCJdIFtyb2xlPVwicHJlc2VudGF0aW9uXCJdIGFgKV07XG4gICAgICBmb3IgKGNvbnN0IG1lbnVJdGVtIG9mIGFsbE1lbnVJdGVtcykge1xuICAgICAgICAvLyBjb25zdCBtZW51SXRlbSA9IGFsbE1lbnVJdGVtc1tpXTtcbiAgICAgICAgY29uc3QgdGV4dCA9IG1lbnVJdGVtLmlubmVyVGV4dC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYFRleHQ6IFwiJHt0ZXh0fVwiYCk7XG4gICAgICAgIC8vIExvb2sgZm9yIHNwZWNpZmljIGl0ZW0gaW4gdGhlIGRyb3AgZG93biBtZW51IGFuZCBjbGljayB0aGVtXG4gICAgICAgIHN3aXRjaCAodGV4dCkge1xuICAgICAgICAgIC8vIHNob3cgb24gdGltZWxpbmVcbiAgICAgICAgICBjYXNlIFwiYWxsb3dlZCBvbiB0aW1lbGluZVwiOiB7XG4gICAgICAgICAgICBhd2FpdCBjbGlja0l0ZW0obWVudUl0ZW0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSB1bnRhZyBwcm9jZXNzIGhhcyBhIG11bHRpLWRpYWxvZyBwcm9jZXNzIHRoYXQgbXVzdCBiZSBuYXZpZ2F0ZWQgdG8gcmVtb3ZlIHlvdXJzZWxmLFxuLy8gICBzbyB0aGlzIHNob3VsZCBuYXZpZ2F0ZSBpdCBhbmQgY2xpY2sgYWxsIHRoZSBuZWNlc3NhcnkgdGhpbmdzIHRvIHJlbW92ZSB0aGUgdGFnLlxuYXN5bmMgZnVuY3Rpb24gdW50YWdGcm9tVGltZWxpbmUoKSB7XG4gIGNvbnN0IHN0cmluZ3NUb1RyeSA9IFtcbiAgICBgSSdtIGluIHRoaXMgcGhvdG8gYW5kIEkgZG9uJ3QgbGlrZSBpdGAsXG4gICAgYFRoaXMgaXMgYSBwaG90byBvZiBtZSBvciBteSBmYW1pbHkgdGhhdCBJIGRvbid0IHdhbnQgb24gRmFjZWJvb2tgLFxuICAgIGBJIHRoaW5rIGl0J3MgYW4gdW5hdXRob3JpemVkIHVzZSBvZiBteSBpbnRlbGxlY3R1YWwgcHJvcGVydHlgLFxuICAgIGBJIHRoaW5rIGl0IHNob3VsZG4ndCBiZSBvbiBGYWNlYm9va2AsXG4gICAgYEl0J3MgYSBiYWQgcGhvdG8gb2YgbWVgLFxuICAgIGBJdCdzIGluYXBwcm9wcmlhdGVgLFxuICAgIGBJdCBtYWtlcyBtZSBzYWRgLFxuICAgIGBJdCdzIGVtYmFycmFzc2luZ2AsXG4gICAgYE90aGVyYCxcbiAgICBgU29tZXRoaW5nIGVsc2VgLFxuICAgIGBJdCdzIHNvbWV0aGluZyBlbHNlYCxcbiAgICBgU2VlIG1vcmUgb3B0aW9uc2AsXG4gICAgYFJlbW92ZSBUYWdgLFxuICBdO1xuICBmb3IgKGxldCBsb29wQ291bnQgPSAwOyBsb29wQ291bnQgPCA1OyBsb29wQ291bnQrKykge1xuICAgIGZvciAoY29uc3QgdHJ5U3RyaW5nIG9mIHN0cmluZ3NUb1RyeSkge1xuICAgICAgLy8gY29uc29sZS5sb2coYFRyeWluZyBcIiR7dHJ5U3RyaW5nfVwiYCk7XG4gICAgICBjb25zdCByZXBvcnQgPSBhd2FpdCBnZXREaWFsb2dGb3IodHJ5U3RyaW5nKTtcbiAgICAgIGlmIChyZXBvcnQpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYEZvdW5kIFwiJHt0cnlTdHJpbmd9XCJgKTtcbiAgICAgICAgYXdhaXQgY2xpY2tJdGVtKHJlcG9ydCk7XG4gICAgICAgIGNvbnN0IGNvbnQgPSBhd2FpdCBnZXREaWFsb2dGb3IoYENvbnRpbnVlYCk7XG4gICAgICAgIGF3YWl0IGNsaWNrSXRlbShjb250KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm91bmREb25lID0gYXdhaXQgZ2V0RGlhbG9nRm9yKGBEb25lYCk7XG4gIGF3YWl0IGNsaWNrSXRlbShmb3VuZERvbmUpO1xufVxuLy8gSGVscGVyIHRvIGdldCBjbGlja2FibGUgZWxlbWVudHMgaW4gZHJvcCBkb3duIG1lbnVzXG5hc3luYyBmdW5jdGlvbiBnZXRNZW51Rm9yKHRleHQ6IHN0cmluZykge1xuLy8gY29uc29sZS5sb2coXCJnZXRNZW51Rm9yIG91dGVyXCIsIHRleHQpO1xuICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihgW3JvbGU9XCJtZW51XCJdYCk7XG4gICAgICAgIGlmIChtZW51KSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJnZXRNZW51Rm9yIGlubmVyXCIsIHRleHQpO1xuICAgICAgICAgIGNvbnN0IGFsbE1lbnVJdGVtcyA9IFsuLi5tZW51LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KGAqYCldO1xuICAgICAgICAgIGNvbnN0IGZpbHRlcmVkTWVudUl0ZW1zID0gYWxsTWVudUl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pbm5lclRleHQudG9Mb3dlckNhc2UoKSA9PT0gdGV4dC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICBpZiAoZmlsdGVyZWRNZW51SXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoWy4uLmZpbHRlcmVkTWVudUl0ZW1zXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHsgY29uc29sZS5sb2coYGdldE1lbnVGb3IgZXJyb3JgLCBlKTsgcmV0dXJuIHJlc29sdmUoKTsgfVxuICAgIH0sIHRpbWVvdXQoKSk7XG4gIH0pO1xufVxuXG4vLyBIZWxwZXIgdG8gZ2V0IGNsaWNrYWJsZSBlbGVtZW50cyBpbiBwb3AgdXAgZGlhbG9nc1xuYXN5bmMgZnVuY3Rpb24gZ2V0RGlhbG9nRm9yKHRleHQ6IHN0cmluZykge1xuLy8gY29uc29sZS5sb2coXCJnZXREaWFsb2dGb3Igb3V0ZXJcIiwgdGV4dCk7XG4gIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGlhbG9ncyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgW3JvbGU9XCJkaWFsb2dcIl1gKV07XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IGRpYWxvZ3NbZGlhbG9ncy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKGRpYWxvZykge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZ2V0RGlhbG9nRm9yIGlubmVyXCIsIHRleHQpO1xuICAgICAgICAgIGNvbnN0IGFsbERpYWxvZ0l0ZW1zID0gWy4uLmRpYWxvZy5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihgKmApXTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZERpYWxvZ0l0ZW1zID0gYWxsRGlhbG9nSXRlbXMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5pbm5lclRleHQudG9Mb3dlckNhc2UoKSA9PT0gdGV4dC50b0xvd2VyQ2FzZSgpICYmXG4gICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgIWl0ZW0uYXR0cmlidXRlcy5kaXNhYmxlZCAmJlxuICAgICAgICAgICAgICAhaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5fZWxlbVwiKSAmJlxuICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICghaXRlbS5jb21wdXRlZFN0eWxlTWFwIHx8IGl0ZW0uY29tcHV0ZWRTdHlsZU1hcCgpLmdldChcImRpc3BsYXlcIikudmFsdWUgIT09IFwibm9uZVwiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZmlsdGVyZWREaWFsb2dJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShbLi4uZmlsdGVyZWREaWFsb2dJdGVtc10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7IGNvbnNvbGUubG9nKGBnZXREaWFsb2dGb3IgZXJyb3JgLCBlKTsgcmV0dXJuIHJlc29sdmUoKTsgfVxuICAgIH0sIHRpbWVvdXQoKSk7XG4gIH0pO1xufVxuXG4vLyBSZW1vdmUgZHJvcCBkb3duIG1lbnVzIHdoZW4gd2VcInJlIGRvd24gd2l0aCB0aGVtIGJlY2F1c2UgRmFjZWJvb2sgZG9lc25cInRcbi8vICAgYW5kIHRoZSBoaWRkZW4gSFRNTCBncm93cyBzaWduaWZpY2FudGx5IGlmIHdlIGRvbid0LlxuYXN5bmMgZnVuY3Rpb24gY2xlYW51cE1lbnUoKSB7XG4vLyBjb25zb2xlLmxvZyhcImNsZWFudXBNZW51XCIpO1xuICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oYFtyb2xlPVwibWVudVwiXWApO1xuICByZXR1cm4gYXdhaXQgY2xlYW51cEVsZW1lbnQobWVudSk7XG59XG5cbi8vIFNpbXVsYXRlIGEgdXNlciBjbGlja2luZyBhbiBpdGVtLlxuYXN5bmMgZnVuY3Rpb24gY2xpY2tJdGVtKGl0ZW06IEhUTUxFbGVtZW50IHwgSFRNTEVsZW1lbnRbXSkge1xuLy8gY29uc29sZS5sb2coXCJjbGlja0l0ZW0gb3V0ZXJcIiwgaXRlbSk7XG4gIGlmICghaXRlbSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgIGZvciAoY29uc3QgaSBvZiBpdGVtKSB7XG4gICAgICBhd2FpdCBjbGlja0l0ZW0oaSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2xpY2tJdGVtIGlubmVyXCIsIGl0ZW0pO1xuICAgICAgICBpdGVtLmNsaWNrKCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgY29uc29sZS5sb2coYGNsaWNrSXRlbSBlcnJvcmAsIGUpOyByZXR1cm4gcmVzb2x2ZSgpOyB9XG4gICAgfSwgdGltZW91dCgpKTtcbiAgfSk7XG59XG5cbi8vIFJlbW92ZSBlbGVtZW50cyBmcm9tIHRoZSBwYWdlIHNvIHRoZSBwcm9jZXNzaW5nIGRvZXNuXCJ0IHNsb3cgZG93biBhcyBtdWNoXG5hc3luYyBmdW5jdGlvbiBjbGVhbnVwRWxlbWVudChpdGVtOiBIVE1MRWxlbWVudCkge1xuLy8gY29uc29sZS5sb2coXCJjbGVhbnVwRWxlbWVudCBvdXRlclwiLCBpdGVtKTtcbiAgaWYgKCFpdGVtKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgZm9yIChjb25zdCBpIG9mIGl0ZW0pIHtcbiAgICAgIGF3YWl0IGNsZWFudXBFbGVtZW50KGkpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNsZWFudXBFbGVtZW50IGlubmVyXCIsIGl0ZW0pO1xuICAgICAgICBpZiAoaXRlbS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgaXRlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9IGNhdGNoIChlKSB7IGNvbnNvbGUubG9nKGByZW1vdmVJdGVtRnJvbVBhZ2UgZXJyb3JgLCBlKTsgcmV0dXJuIHJlc29sdmUoKTsgfVxuICAgIH0sIHRpbWVvdXQoKSk7XG4gIH0pO1xufVxuXG4vLyBTdGFydCBieSBjYWxsaW5nIG5leHRQYWdlIHJpZ2h0IGF3YXlcbm5leHRQYWdlKCkudGhlbihyID0+IGNvbnNvbGUubG9nKFwiRE9ORT9cIiwgcikpO1xuIl19