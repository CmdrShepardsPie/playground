/*
 * IMPORTANT! You MUST navigate to your "All activity" timeline for this to work!
 * https://www.facebook.com/[your username]/allactivity
 * You can also get to this by clicking your name to get to your own timeline, then clicking "View Activity Log"
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*
 * WARNING! This will start immediately, and delete *everything* it can!
 * Don't run if you don't want to lose anything and/or haven"t backed it up!
 */
/*
 * This script will attempt to hide and/or delete everything from your Facebook timeline.
 *
 * You will open the browser developer tools and copy-paste this whole script into the "console".
 * (Usually press and hold Mac: Cmd-(Alt/Option)-I or Window: Ctrl-Shift-I)
 *
 * Facebook shows a message in the developer tool console warning you about pasting scripts,
 *   and they"re absolutely right, be very careful about pasting things here,
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
// Main loop of the program, it will scroll up and down and
// look for "Load more" style links to keep expanding the timeline
function nextPage() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // console.log(`nextPage`);
                    window.scrollTo(0, 0);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, clickItem(document.querySelectorAll("[data-year] a"))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, clickItem(document.querySelectorAll(".uiMorePager a"))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, clickItem(document.querySelectorAll("[data-year] a"))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, clickItem(document.querySelectorAll(".uiMorePager a"))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, processRows(document.querySelectorAll(".uiList .uiBoxWhite"))];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    console.log("nextPage error", e_1);
                    return [3 /*break*/, 8];
                case 8:
                    window.scrollTo(0, 1000000);
                    setTimeout(nextPage, 500);
                    return [2 /*return*/];
            }
        });
    });
}
// Go down each line of your timeline looking for action buttons
function processRows(rows) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, row, _b, e_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _i = 0, _a = Array.prototype.slice.apply(rows);
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 12];
                    row = _a[_i];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 10, , 11]);
                    return [4 /*yield*/, changeSharing(row)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, cleanupMenu()];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, changeTimeline(row)];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, cleanupMenu()];
                case 6:
                    _c.sent();
                    _b = clickItem;
                    return [4 /*yield*/, getDialogFor("Close")];
                case 7: return [4 /*yield*/, _b.apply(void 0, [_c.sent()])];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, cleanupElement(row)];
                case 9:
                    _c.sent();
                    return [3 /*break*/, 11];
                case 10:
                    e_2 = _c.sent();
                    console.log("processRows error", e_2);
                    return [3 /*break*/, 11];
                case 11:
                    _i++;
                    return [3 /*break*/, 1];
                case 12: return [2 /*return*/];
            }
        });
    });
}
// If the privacy of the timeline item can be changed, set it to Only me
function changeSharing(row) {
    return __awaiter(this, void 0, void 0, function () {
        var sharing, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    sharing = row.querySelector("[aria-label~=\"Shared\"]");
                    if (!sharing) return [3 /*break*/, 4];
                    return [4 /*yield*/, clickItem(sharing)];
                case 1:
                    _b.sent();
                    _a = clickItem;
                    return [4 /*yield*/, getMenuFor("Only me")];
                case 2: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                case 3: return [2 /*return*/, _b.sent()];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Look for the edit item button
function changeTimeline(row) {
    return __awaiter(this, void 0, void 0, function () {
        var edit, menu, allMenuItems, _i, allMenuItems_1, menuItem, text_1, _a, confirm_1, confirm_2, confirm_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    edit = row.querySelector("[aria-label=\"Edit\"]");
                    if (!edit) return [3 /*break*/, 21];
                    return [4 /*yield*/, clickItem(edit)];
                case 1:
                    _b.sent();
                    menu = document.querySelector("[role=\"menu\"]");
                    if (!menu) return [3 /*break*/, 21];
                    allMenuItems = Array.prototype.slice.apply(menu.querySelectorAll("[role=\"menu\"] [role=\"presentation\"] a"));
                    _i = 0, allMenuItems_1 = allMenuItems;
                    _b.label = 2;
                case 2:
                    if (!(_i < allMenuItems_1.length)) return [3 /*break*/, 21];
                    menuItem = allMenuItems_1[_i];
                    text_1 = menuItem.innerText.trim().toLowerCase();
                    _a = text_1;
                    switch (_a) {
                        case "hidden from timeline": return [3 /*break*/, 3];
                        case "unlike": return [3 /*break*/, 5];
                        case "remove reaction": return [3 /*break*/, 9];
                        case "report/remove tag": return [3 /*break*/, 13];
                        case "delete": return [3 /*break*/, 16];
                    }
                    return [3 /*break*/, 20];
                case 3: return [4 /*yield*/, clickItem(menuItem)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 5: return [4 /*yield*/, clickItem(menuItem)];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, getDialogFor("Close")];
                case 7:
                    confirm_1 = _b.sent();
                    return [4 /*yield*/, clickItem(confirm_1)];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 9: return [4 /*yield*/, clickItem(menuItem)];
                case 10:
                    _b.sent();
                    return [4 /*yield*/, getDialogFor("Close")];
                case 11:
                    confirm_2 = _b.sent();
                    return [4 /*yield*/, clickItem(confirm_2)];
                case 12:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 13: return [4 /*yield*/, clickItem(menuItem)];
                case 14:
                    _b.sent();
                    return [4 /*yield*/, untagFromTimeline()];
                case 15:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 16: return [4 /*yield*/, clickItem(menuItem)];
                case 17:
                    _b.sent();
                    return [4 /*yield*/, getDialogFor("Delete")];
                case 18:
                    confirm_3 = _b.sent();
                    return [4 /*yield*/, clickItem(confirm_3)];
                case 19:
                    _b.sent();
                    return [3 /*break*/, 20];
                case 20:
                    _i++;
                    return [3 /*break*/, 2];
                case 21: return [2 /*return*/];
            }
        });
    });
}
// The untag process has a multi-dialog process that must be navigated to remove yourself,
//   so this should navigate it and click all the necessary things to remove the tag.
function untagFromTimeline() {
    return __awaiter(this, void 0, void 0, function () {
        var stringsToTry, loopCount, _i, stringsToTry_1, tryString, report, cont, foundDone;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stringsToTry = [
                        "I'm in this photo and I don't like it",
                        "This is a photo of me or my family that I don't want on Facebook",
                        "I think it's an unauthorized use of my intellectual property",
                        "I think it shouldn't be on Facebook",
                        "It's a bad photo of me",
                        "It's inappropriate",
                        "It makes me sad",
                        "It's embarrassing",
                        "Other",
                        "Something else",
                        "It's something else",
                        "See more options",
                        "Remove Tag",
                    ];
                    loopCount = 0;
                    _a.label = 1;
                case 1:
                    if (!(loopCount < 5)) return [3 /*break*/, 9];
                    _i = 0, stringsToTry_1 = stringsToTry;
                    _a.label = 2;
                case 2:
                    if (!(_i < stringsToTry_1.length)) return [3 /*break*/, 8];
                    tryString = stringsToTry_1[_i];
                    return [4 /*yield*/, getDialogFor(tryString)];
                case 3:
                    report = _a.sent();
                    if (!report) return [3 /*break*/, 7];
                    // console.log(`Found "${tryString}"`);
                    return [4 /*yield*/, clickItem(report)];
                case 4:
                    // console.log(`Found "${tryString}"`);
                    _a.sent();
                    return [4 /*yield*/, getDialogFor("Continue")];
                case 5:
                    cont = _a.sent();
                    return [4 /*yield*/, clickItem(cont)];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8:
                    loopCount++;
                    return [3 /*break*/, 1];
                case 9: return [4 /*yield*/, getDialogFor("Done")];
                case 10:
                    foundDone = _a.sent();
                    return [4 /*yield*/, clickItem(foundDone)];
                case 11:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Helper to get clickable elements in drop down menus
function getMenuFor(text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            try {
                                var menu = document.querySelector("[role=\"menu\"]");
                                if (menu) {
                                    // console.log("getMenuFor inner", text);
                                    var allMenuItems = Array.prototype.slice.apply(menu.querySelectorAll("*"));
                                    var filteredMenuItems = allMenuItems.filter(function (item) { return item.innerText.toLowerCase() === text.toLowerCase(); });
                                    if (filteredMenuItems.length > 0) {
                                        return resolve(filteredMenuItems.slice());
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
                                console.log("getMenuFor error", e);
                                return resolve();
                            }
                        }, 500);
                    })];
                case 1: 
                // console.log("getMenuFor outer", text);
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// Helper to get clickable elements in pop up dialogs
function getDialogFor(text) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            try {
                                var dialogs = document.querySelectorAll("[role=\"dialog\"]");
                                var dialog = dialogs[dialogs.length - 1];
                                if (dialog) {
                                    // console.log("getDialogFor inner", text);
                                    var allDialogItems = Array.prototype.slice.apply(dialog.querySelectorAll("*"));
                                    var filteredDialogItems = allDialogItems.filter(function (item) {
                                        return item.innerText.toLowerCase() === text.toLowerCase() &&
                                            // @ts-ignore
                                            !item.attributes.disabled &&
                                            !item.classList.contains("hidden_elem") &&
                                            // @ts-ignore
                                            (!item.computedStyleMap || item.computedStyleMap().get("display").value !== "none");
                                    });
                                    if (filteredDialogItems.length > 0) {
                                        return resolve(filteredDialogItems.slice());
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
                                console.log("getDialogFor error", e);
                                return resolve();
                            }
                        }, 500);
                    })];
                case 1: 
                // console.log("getDialogFor outer", text);
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// Remove drop down menus when we"re down with them because Facebook doesn"t
//   and the hidden HTML grows significantly if we don't.
function cleanupMenu() {
    return __awaiter(this, void 0, void 0, function () {
        var menu;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    menu = document.querySelector("[role=\"menu\"]");
                    return [4 /*yield*/, cleanupElement(menu)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// Simulate a user clicking an item.
function clickItem(item) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, item_1, i;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // console.log("clickItem outer", item);
                    if (!item || item.length === 0) {
                        return [2 /*return*/];
                    }
                    if (!Array.isArray(item)) return [3 /*break*/, 5];
                    _i = 0, item_1 = item;
                    _a.label = 1;
                case 1:
                    if (!(_i < item_1.length)) return [3 /*break*/, 4];
                    i = item_1[_i];
                    return [4 /*yield*/, clickItem(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
                case 5:
                    if (!item.length) return [3 /*break*/, 7];
                    return [4 /*yield*/, clickItem(item.slice())];
                case 6: return [2 /*return*/, _a.sent()];
                case 7: return [4 /*yield*/, new Promise(function (resolve) {
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                try {
                                    // console.log("clickItem inner", item);
                                    item.click();
                                    resolve();
                                }
                                catch (e) {
                                    console.log("clickItem error", e);
                                    return [2 /*return*/, resolve()];
                                }
                                return [2 /*return*/];
                            });
                        }); }, 500);
                    })];
                case 8: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// Remove elements from the page so the processing doesn"t slow down as much
function cleanupElement(item) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, item_2, i;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // console.log("cleanupElement outer", item);
                    if (!item || item.length === 0) {
                        return [2 /*return*/];
                    }
                    if (!Array.isArray(item)) return [3 /*break*/, 5];
                    _i = 0, item_2 = item;
                    _a.label = 1;
                case 1:
                    if (!(_i < item_2.length)) return [3 /*break*/, 4];
                    i = item_2[_i];
                    return [4 /*yield*/, cleanupElement(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
                case 5:
                    if (!item.length) return [3 /*break*/, 7];
                    return [4 /*yield*/, cleanupElement(item.slice())];
                case 6: return [2 /*return*/, _a.sent()];
                case 7: return [4 /*yield*/, new Promise(function (resolve) {
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                try {
                                    // console.log("cleanupElement inner", item);
                                    item.parentNode.removeChild(item);
                                    return [2 /*return*/, resolve()];
                                }
                                catch (e) {
                                    console.log("removeItemFromPage error", e);
                                    return [2 /*return*/, resolve()];
                                }
                                return [2 /*return*/];
                            });
                        }); }, 500);
                    })];
                case 8: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
// Start by calling nextPage right away
nextPage();
