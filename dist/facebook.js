"use strict";
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
        var e_2, _a, _b, _c, row, _d, e_3, e_2_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 13, 14, 15]);
                    _b = __values(Array.prototype.slice.apply(rows)), _c = _b.next();
                    _e.label = 1;
                case 1:
                    if (!!_c.done) return [3 /*break*/, 12];
                    row = _c.value;
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 10, , 11]);
                    return [4 /*yield*/, changeSharing(row)];
                case 3:
                    _e.sent();
                    return [4 /*yield*/, cleanupMenu()];
                case 4:
                    _e.sent();
                    return [4 /*yield*/, changeTimeline(row)];
                case 5:
                    _e.sent();
                    return [4 /*yield*/, cleanupMenu()];
                case 6:
                    _e.sent();
                    _d = clickItem;
                    return [4 /*yield*/, getDialogFor("Close")];
                case 7: return [4 /*yield*/, _d.apply(void 0, [_e.sent()])];
                case 8:
                    _e.sent();
                    return [4 /*yield*/, cleanupElement(row)];
                case 9:
                    _e.sent();
                    return [3 /*break*/, 11];
                case 10:
                    e_3 = _e.sent();
                    console.log("processRows error", e_3);
                    return [3 /*break*/, 11];
                case 11:
                    _c = _b.next();
                    return [3 /*break*/, 1];
                case 12: return [3 /*break*/, 15];
                case 13:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 15];
                case 14:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 15: return [2 /*return*/];
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
        var e_4, _a, edit, menu, allMenuItems, allMenuItems_1, allMenuItems_1_1, menuItem, text_1, _b, confirm_1, confirm_2, confirm_3, e_4_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    edit = row.querySelector("[aria-label=\"Edit\"]");
                    if (!edit) return [3 /*break*/, 25];
                    return [4 /*yield*/, clickItem(edit)];
                case 1:
                    _c.sent();
                    menu = document.querySelector("[role=\"menu\"]");
                    if (!menu) return [3 /*break*/, 25];
                    allMenuItems = Array.prototype.slice.apply(menu.querySelectorAll("[role=\"menu\"] [role=\"presentation\"] a"));
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 23, 24, 25]);
                    allMenuItems_1 = __values(allMenuItems), allMenuItems_1_1 = allMenuItems_1.next();
                    _c.label = 3;
                case 3:
                    if (!!allMenuItems_1_1.done) return [3 /*break*/, 22];
                    menuItem = allMenuItems_1_1.value;
                    text_1 = menuItem.innerText.trim().toLowerCase();
                    _b = text_1;
                    switch (_b) {
                        case "hidden from timeline": return [3 /*break*/, 4];
                        case "unlike": return [3 /*break*/, 6];
                        case "remove reaction": return [3 /*break*/, 10];
                        case "report/remove tag": return [3 /*break*/, 14];
                        case "delete": return [3 /*break*/, 17];
                    }
                    return [3 /*break*/, 21];
                case 4: return [4 /*yield*/, clickItem(menuItem)];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 21];
                case 6: return [4 /*yield*/, clickItem(menuItem)];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, getDialogFor("Close")];
                case 8:
                    confirm_1 = _c.sent();
                    return [4 /*yield*/, clickItem(confirm_1)];
                case 9:
                    _c.sent();
                    return [3 /*break*/, 21];
                case 10: return [4 /*yield*/, clickItem(menuItem)];
                case 11:
                    _c.sent();
                    return [4 /*yield*/, getDialogFor("Close")];
                case 12:
                    confirm_2 = _c.sent();
                    return [4 /*yield*/, clickItem(confirm_2)];
                case 13:
                    _c.sent();
                    return [3 /*break*/, 21];
                case 14: return [4 /*yield*/, clickItem(menuItem)];
                case 15:
                    _c.sent();
                    return [4 /*yield*/, untagFromTimeline()];
                case 16:
                    _c.sent();
                    return [3 /*break*/, 21];
                case 17: return [4 /*yield*/, clickItem(menuItem)];
                case 18:
                    _c.sent();
                    return [4 /*yield*/, getDialogFor("Delete")];
                case 19:
                    confirm_3 = _c.sent();
                    return [4 /*yield*/, clickItem(confirm_3)];
                case 20:
                    _c.sent();
                    return [3 /*break*/, 21];
                case 21:
                    allMenuItems_1_1 = allMenuItems_1.next();
                    return [3 /*break*/, 3];
                case 22: return [3 /*break*/, 25];
                case 23:
                    e_4_1 = _c.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 25];
                case 24:
                    try {
                        if (allMenuItems_1_1 && !allMenuItems_1_1.done && (_a = allMenuItems_1.return)) _a.call(allMenuItems_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 25: return [2 /*return*/];
            }
        });
    });
}
// The untag process has a multi-dialog process that must be navigated to remove yourself,
//   so this should navigate it and click all the necessary things to remove the tag.
function untagFromTimeline() {
    return __awaiter(this, void 0, void 0, function () {
        var e_5, _a, stringsToTry, loopCount, stringsToTry_1, stringsToTry_1_1, tryString, report, cont, e_5_1, foundDone;
        return __generator(this, function (_b) {
            switch (_b.label) {
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
                    _b.label = 1;
                case 1:
                    if (!(loopCount < 5)) return [3 /*break*/, 13];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 10, 11, 12]);
                    stringsToTry_1 = __values(stringsToTry), stringsToTry_1_1 = stringsToTry_1.next();
                    _b.label = 3;
                case 3:
                    if (!!stringsToTry_1_1.done) return [3 /*break*/, 9];
                    tryString = stringsToTry_1_1.value;
                    return [4 /*yield*/, getDialogFor(tryString)];
                case 4:
                    report = _b.sent();
                    if (!report) return [3 /*break*/, 8];
                    // console.log(`Found "${tryString}"`);
                    return [4 /*yield*/, clickItem(report)];
                case 5:
                    // console.log(`Found "${tryString}"`);
                    _b.sent();
                    return [4 /*yield*/, getDialogFor("Continue")];
                case 6:
                    cont = _b.sent();
                    return [4 /*yield*/, clickItem(cont)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    stringsToTry_1_1 = stringsToTry_1.next();
                    return [3 /*break*/, 3];
                case 9: return [3 /*break*/, 12];
                case 10:
                    e_5_1 = _b.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 12];
                case 11:
                    try {
                        if (stringsToTry_1_1 && !stringsToTry_1_1.done && (_a = stringsToTry_1.return)) _a.call(stringsToTry_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 12:
                    loopCount++;
                    return [3 /*break*/, 1];
                case 13: return [4 /*yield*/, getDialogFor("Done")];
                case 14:
                    foundDone = _b.sent();
                    return [4 /*yield*/, clickItem(foundDone)];
                case 15:
                    _b.sent();
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
                                        return resolve(__spread(filteredMenuItems));
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
                                        return resolve(__spread(filteredDialogItems));
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
        var e_6, _a, item_1, item_1_1, i, e_6_1;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // console.log("clickItem outer", item);
                    if (!item || item.length === 0) {
                        return [2 /*return*/];
                    }
                    if (!Array.isArray(item)) return [3 /*break*/, 9];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    item_1 = __values(item), item_1_1 = item_1.next();
                    _b.label = 2;
                case 2:
                    if (!!item_1_1.done) return [3 /*break*/, 5];
                    i = item_1_1.value;
                    return [4 /*yield*/, clickItem(i)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    item_1_1 = item_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_6_1 = _b.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (item_1_1 && !item_1_1.done && (_a = item_1.return)) _a.call(item_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
                case 9:
                    if (!item.length) return [3 /*break*/, 11];
                    return [4 /*yield*/, clickItem(__spread(item))];
                case 10: return [2 /*return*/, _b.sent()];
                case 11: return [4 /*yield*/, new Promise(function (resolve) {
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
                case 12: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
// Remove elements from the page so the processing doesn"t slow down as much
function cleanupElement(item) {
    return __awaiter(this, void 0, void 0, function () {
        var e_7, _a, item_2, item_2_1, i, e_7_1;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // console.log("cleanupElement outer", item);
                    if (!item || item.length === 0) {
                        return [2 /*return*/];
                    }
                    if (!Array.isArray(item)) return [3 /*break*/, 9];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    item_2 = __values(item), item_2_1 = item_2.next();
                    _b.label = 2;
                case 2:
                    if (!!item_2_1.done) return [3 /*break*/, 5];
                    i = item_2_1.value;
                    return [4 /*yield*/, cleanupElement(i)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    item_2_1 = item_2.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_7_1 = _b.sent();
                    e_7 = { error: e_7_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (item_2_1 && !item_2_1.done && (_a = item_2.return)) _a.call(item_2);
                    }
                    finally { if (e_7) throw e_7.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
                case 9:
                    if (!item.length) return [3 /*break*/, 11];
                    return [4 /*yield*/, cleanupElement(__spread(item))];
                case 10: return [2 /*return*/, _b.sent()];
                case 11: return [4 /*yield*/, new Promise(function (resolve) {
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
                case 12: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
// Start by calling nextPage right away
nextPage();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZWJvb2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZmFjZWJvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVIOzs7R0FHRztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsMkRBQTJEO0FBQzNELGtFQUFrRTtBQUNsRSxTQUFlLFFBQVE7Ozs7OztvQkFDckIsMkJBQTJCO29CQUMzQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7OztvQkFFcEIscUJBQU0sU0FBUyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFBOztvQkFBM0QsU0FBMkQsQ0FBQztvQkFDNUQscUJBQU0sU0FBUyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUE7O29CQUE1RCxTQUE0RCxDQUFDO29CQUM3RCxxQkFBTSxTQUFTLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUE7O29CQUEzRCxTQUEyRCxDQUFDO29CQUM1RCxxQkFBTSxTQUFTLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBQTs7b0JBQTVELFNBQTRELENBQUM7b0JBQzdELHFCQUFNLFdBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxFQUFBOztvQkFBbkUsU0FBbUUsQ0FBQzs7OztvQkFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFDLENBQUMsQ0FBQzs7O29CQUMvQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDNUIsVUFBVSxDQUFD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QkFFMUIsc0JBQU87O3lCQUNFLElBQUksQ0FBQyxNQUFNLEVBQVgseUJBQVc7b0JBQ2IscUJBQU0sY0FBYyxVQUFLLElBQUksRUFBRSxFQUFBO3lCQUF0QyxzQkFBTyxTQUErQixFQUFDO3lCQUVsQyxxQkFBTSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU87d0JBQy9CLFVBQVUsQ0FBQzs7Z0NBQ1QsSUFBSTtvQ0FDRiw2Q0FBNkM7b0NBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNsQyxzQkFBTyxPQUFPLEVBQUUsRUFBQztpQ0FDbEI7Z0NBQUMsT0FBTyxDQUFDLEVBQUU7b0NBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsQ0FBQztvQ0FBQyxzQkFBTyxPQUFPLEVBQUUsRUFBQztpQ0FBRTs7OzZCQUM5RSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNWLENBQUMsQ0FBQyxFQUFBO3lCQVJGLHNCQUFPLFNBUUwsRUFBQzs7OztDQUNKO0FBRUQsdUNBQXVDO0FBQ3ZDLFFBQVEsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIElNUE9SVEFOVCEgWW91IE1VU1QgbmF2aWdhdGUgdG8geW91ciBcIkFsbCBhY3Rpdml0eVwiIHRpbWVsaW5lIGZvciB0aGlzIHRvIHdvcmshXG4gKiBodHRwczovL3d3dy5mYWNlYm9vay5jb20vW3lvdXIgdXNlcm5hbWVdL2FsbGFjdGl2aXR5XG4gKiBZb3UgY2FuIGFsc28gZ2V0IHRvIHRoaXMgYnkgY2xpY2tpbmcgeW91ciBuYW1lIHRvIGdldCB0byB5b3VyIG93biB0aW1lbGluZSwgdGhlbiBjbGlja2luZyBcIlZpZXcgQWN0aXZpdHkgTG9nXCJcbiAqL1xuXG4vKlxuICogV0FSTklORyEgVGhpcyB3aWxsIHN0YXJ0IGltbWVkaWF0ZWx5LCBhbmQgZGVsZXRlICpldmVyeXRoaW5nKiBpdCBjYW4hXG4gKiBEb24ndCBydW4gaWYgeW91IGRvbid0IHdhbnQgdG8gbG9zZSBhbnl0aGluZyBhbmQvb3IgaGF2ZW5cInQgYmFja2VkIGl0IHVwIVxuICovXG5cbi8qXG4gKiBUaGlzIHNjcmlwdCB3aWxsIGF0dGVtcHQgdG8gaGlkZSBhbmQvb3IgZGVsZXRlIGV2ZXJ5dGhpbmcgZnJvbSB5b3VyIEZhY2Vib29rIHRpbWVsaW5lLlxuICpcbiAqIFlvdSB3aWxsIG9wZW4gdGhlIGJyb3dzZXIgZGV2ZWxvcGVyIHRvb2xzIGFuZCBjb3B5LXBhc3RlIHRoaXMgd2hvbGUgc2NyaXB0IGludG8gdGhlIFwiY29uc29sZVwiLlxuICogKFVzdWFsbHkgcHJlc3MgYW5kIGhvbGQgTWFjOiBDbWQtKEFsdC9PcHRpb24pLUkgb3IgV2luZG93OiBDdHJsLVNoaWZ0LUkpXG4gKlxuICogRmFjZWJvb2sgc2hvd3MgYSBtZXNzYWdlIGluIHRoZSBkZXZlbG9wZXIgdG9vbCBjb25zb2xlIHdhcm5pbmcgeW91IGFib3V0IHBhc3Rpbmcgc2NyaXB0cyxcbiAqICAgYW5kIHRoZXlcInJlIGFic29sdXRlbHkgcmlnaHQsIGJlIHZlcnkgY2FyZWZ1bCBhYm91dCBwYXN0aW5nIHRoaW5ncyBoZXJlLFxuICogICBhcyBpdCB3aWxsIGhhdmUgZnVsbCBhY2Nlc3MgdG8geW91ciBicm93c2VyIGFuZCBhbnl0aGluZyB5b3UgY2FuIGRvIG9yIHNlZS5cbiAqXG4gKiBUaGlzIHJ1bnMgaW4gbXVsdGlwbGUgcGhhc2VzLCBzZXR0aW5nIHByaXZhY3kgdG8gXCJPbmx5IG1lXCIgb3IgXCJPbmx5IG1lXCIgaWYgaXQgY2FuLFxuICogICB0aGVuIHNldHRpbmcgcG9zdCB2aXNpYmlsaXR5IHRvIFwiSGlkZGVuIGZyb20gdGltZWxpbmVcIixcbiAqICAgdGhlbiBhdHRlbXB0cyB0byB1bmxpa2Ugb3IgdW50YWcsIGFuZCBmaW5hbGx5IGRlbGV0ZSBpdCwgaWYgcG9zc2libGUuXG4gKlxuICogSXQgY2FuIHRha2UgYSB2ZXJ5IGxvbmcgdGltZSB0byBydW4gZGVwZW5kaW5nIG9uIGhvdyBtdWNoIGl0IHdpbGwgZGVsZXRlLlxuICogVGhlIGxvbmdlciBpdCBydW5zLCB0aGUgbW9yZSBpdCBkZWxldGVzLiBJdCBjYW4gdGFrZSBob3VycyBvciBkYXlzLlxuICpcbiAqIFRoaXMgcHJvY2VzcyBpcyBwZXJtYW5lbnQgYW5kIGNhbm5vdCBiZSByZXZlcnNlZCBvciB1bmRvbmUsIHNvIGRvIGEgRmFjZWJvb2sgYmFja3VwIGZpcnN0IVxuICpcbiAqIEFsc28gY29uc2lkZXIgZ29pbmcgdGhyb3VnaCB0aGUgdmFyaW91cyBwcml2YWN5IHNldHRpbmdzIG9uIHlvdXIgQWJvdXQgcGFnZSBhbmQgYWNjb3VudCBzZXR0aW5ncyBhbmRcbiAqICAgbG9ja2luZyB0aG9zZSBzZXR0aW5ncyBkb3duIHRvbywgaWYgeW91IHdhbnQgdG8gYmUgZXh0cmEgc3VyZS4gWW91IHdpbGwgaGF2ZSB0byBkZWxldGUgYW55IHBlcnNvbmFsXG4gKiAgIGRldGFpbHMgZnJvbSB5b3VyIGFjY291bnQgYW5kIFwiQWJvdXRcIiBzZWN0aW9uIHlvdXJzZWxmLlxuICogICBDaGVjayBvdXQgaHR0cHM6Ly9maWVsZGd1aWRlLmdpem1vZG8uY29tL2hlcmVzLWhvdy10by1zaGFyZS1hcy1saXR0bGUtZGF0YS1hcy1wb3NzaWJsZS13aXRob3V0LWQtMTgyMzkxNTYyOFxuICpcbiAqIFRoaXMgY29tZXMgd2l0aCBhYnNvbHV0ZWx5IG5vIHdhcnJhbnR5LCBndWFyYW50ZWVzLCBvciBzdXBwb3J0LiBZb3UgcnVuIHRoaXMgYXQgeW91ciBvd24gcmlzayFcbiAqL1xuXG4vLyBNYWluIGxvb3Agb2YgdGhlIHByb2dyYW0sIGl0IHdpbGwgc2Nyb2xsIHVwIGFuZCBkb3duIGFuZFxuLy8gbG9vayBmb3IgXCJMb2FkIG1vcmVcIiBzdHlsZSBsaW5rcyB0byBrZWVwIGV4cGFuZGluZyB0aGUgdGltZWxpbmVcbmFzeW5jIGZ1bmN0aW9uIG5leHRQYWdlKCkge1xuICAvLyBjb25zb2xlLmxvZyhgbmV4dFBhZ2VgKTtcbiAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICB0cnkge1xuICAgIGF3YWl0IGNsaWNrSXRlbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS15ZWFyXSBhYCkpO1xuICAgIGF3YWl0IGNsaWNrSXRlbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAudWlNb3JlUGFnZXIgYWApKTtcbiAgICBhd2FpdCBjbGlja0l0ZW0oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEteWVhcl0gYWApKTtcbiAgICBhd2FpdCBjbGlja0l0ZW0oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnVpTW9yZVBhZ2VyIGFgKSk7XG4gICAgYXdhaXQgcHJvY2Vzc1Jvd3MoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnVpTGlzdCAudWlCb3hXaGl0ZWApKTtcbiAgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmxvZyhgbmV4dFBhZ2UgZXJyb3JgLCBlKTsgfVxuICB3aW5kb3cuc2Nyb2xsVG8oMCwgMTAwMDAwMCk7XG4gIHNldFRpbWVvdXQobmV4dFBhZ2UsIDUwMCk7XG59XG5cbi8vIEdvIGRvd24gZWFjaCBsaW5lIG9mIHlvdXIgdGltZWxpbmUgbG9va2luZyBmb3IgYWN0aW9uIGJ1dHRvbnNcbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NSb3dzKHJvd3M6IE5vZGVMaXN0T2Y8RWxlbWVudD4pIHtcbiAgLy8gY29uc29sZS5sb2coXCJwcm9jZXNzUm93c1wiKTtcbiAgZm9yIChjb25zdCByb3cgb2YgQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KHJvd3MpKSB7XG4gICAgLy8gY29uc3Qgcm93ID0gcm93c1tpXTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgY2hhbmdlU2hhcmluZyhyb3cpO1xuICAgICAgYXdhaXQgY2xlYW51cE1lbnUoKTtcbiAgICAgIGF3YWl0IGNoYW5nZVRpbWVsaW5lKHJvdyk7XG4gICAgICBhd2FpdCBjbGVhbnVwTWVudSgpO1xuICAgICAgYXdhaXQgY2xpY2tJdGVtKGF3YWl0IGdldERpYWxvZ0ZvcihgQ2xvc2VgKSk7XG4gICAgICBhd2FpdCBjbGVhbnVwRWxlbWVudChyb3cpO1xuICAgIH0gY2F0Y2ggKGUpIHsgY29uc29sZS5sb2coYHByb2Nlc3NSb3dzIGVycm9yYCwgZSk7IH1cbiAgfVxufVxuXG4vLyBJZiB0aGUgcHJpdmFjeSBvZiB0aGUgdGltZWxpbmUgaXRlbSBjYW4gYmUgY2hhbmdlZCwgc2V0IGl0IHRvIE9ubHkgbWVcbmFzeW5jIGZ1bmN0aW9uIGNoYW5nZVNoYXJpbmcocm93OiBFbGVtZW50KSB7XG4gIC8vIGNvbnNvbGUubG9nKFwiY2hhbmdlU2hhcmluZ1wiLCByb3cpO1xuICBjb25zdCBzaGFyaW5nID0gcm93LnF1ZXJ5U2VsZWN0b3IoYFthcmlhLWxhYmVsfj1cIlNoYXJlZFwiXWApO1xuICBpZiAoc2hhcmluZykge1xuICAgIGF3YWl0IGNsaWNrSXRlbShzaGFyaW5nKTtcbiAgICByZXR1cm4gYXdhaXQgY2xpY2tJdGVtKGF3YWl0IGdldE1lbnVGb3IoYE9ubHkgbWVgKSk7XG4gIH1cbn1cblxuLy8gTG9vayBmb3IgdGhlIGVkaXQgaXRlbSBidXR0b25cbmFzeW5jIGZ1bmN0aW9uIGNoYW5nZVRpbWVsaW5lKHJvdzogRWxlbWVudCkge1xuICBjb25zdCBlZGl0ID0gcm93LnF1ZXJ5U2VsZWN0b3IoYFthcmlhLWxhYmVsPVwiRWRpdFwiXWApO1xuICBpZiAoZWRpdCkge1xuICAgIGF3YWl0IGNsaWNrSXRlbShlZGl0KTtcbiAgICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW3JvbGU9XCJtZW51XCJdYCk7XG4gICAgaWYgKG1lbnUpIHtcbiAgICAgIGNvbnN0IGFsbE1lbnVJdGVtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShtZW51LnF1ZXJ5U2VsZWN0b3JBbGwoYFtyb2xlPVwibWVudVwiXSBbcm9sZT1cInByZXNlbnRhdGlvblwiXSBhYCkpIGFzIEhUTUxFbGVtZW50W107XG4gICAgICBmb3IgKGNvbnN0IG1lbnVJdGVtIG9mIGFsbE1lbnVJdGVtcykge1xuICAgICAgICAvLyBjb25zdCBtZW51SXRlbSA9IGFsbE1lbnVJdGVtc1tpXTtcbiAgICAgICAgY29uc3QgdGV4dCA9IG1lbnVJdGVtLmlubmVyVGV4dC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYFRleHQ6IFwiJHt0ZXh0fVwiYCk7XG4gICAgICAgIC8vIExvb2sgZm9yIHNwZWNpZmljIGl0ZW0gaW4gdGhlIGRyb3AgZG93biBtZW51IGFuZCBjbGljayB0aGVtXG4gICAgICAgIHN3aXRjaCAodGV4dCkge1xuICAgICAgICAgIC8vIEhpZGUgZnJvbSB0aW1lbGluZVxuICAgICAgICAgIGNhc2UgXCJoaWRkZW4gZnJvbSB0aW1lbGluZVwiOiB7XG4gICAgICAgICAgICBhd2FpdCBjbGlja0l0ZW0obWVudUl0ZW0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFVubGlrZSAodXN1YWxseSBqdXN0IHBvc3RzIGFuZCBjb21tZW50cywgbm90IHBhZ2VzKVxuICAgICAgICAgIGNhc2UgXCJ1bmxpa2VcIjoge1xuICAgICAgICAgICAgYXdhaXQgY2xpY2tJdGVtKG1lbnVJdGVtKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpcm0gPSBhd2FpdCBnZXREaWFsb2dGb3IoYENsb3NlYCk7XG4gICAgICAgICAgICBhd2FpdCBjbGlja0l0ZW0oY29uZmlybSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTGlrZSB1bmxpa2UgYnV0IGZvciBzbWlsZXMsIGhlYXJ0cywgZXRjLlxuICAgICAgICAgIGNhc2UgXCJyZW1vdmUgcmVhY3Rpb25cIjoge1xuICAgICAgICAgICAgYXdhaXQgY2xpY2tJdGVtKG1lbnVJdGVtKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpcm0gPSBhd2FpdCBnZXREaWFsb2dGb3IoYENsb3NlYCk7XG4gICAgICAgICAgICBhd2FpdCBjbGlja0l0ZW0oY29uZmlybSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gVW50YWcgeW91cnNlbGYgZnJvbSBwb3N0cyBhbmQgcGljdHVyZXNcbiAgICAgICAgICBjYXNlIFwicmVwb3J0L3JlbW92ZSB0YWdcIjoge1xuICAgICAgICAgICAgYXdhaXQgY2xpY2tJdGVtKG1lbnVJdGVtKTtcbiAgICAgICAgICAgIGF3YWl0IHVudGFnRnJvbVRpbWVsaW5lKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gRGVsZXRlIHRoZSBwb3N0IGFsdG9nZXRoZXJcbiAgICAgICAgICBjYXNlIFwiZGVsZXRlXCI6IHtcbiAgICAgICAgICAgIGF3YWl0IGNsaWNrSXRlbShtZW51SXRlbSk7XG4gICAgICAgICAgICBjb25zdCBjb25maXJtID0gYXdhaXQgZ2V0RGlhbG9nRm9yKGBEZWxldGVgKTtcbiAgICAgICAgICAgIGF3YWl0IGNsaWNrSXRlbShjb25maXJtKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgdW50YWcgcHJvY2VzcyBoYXMgYSBtdWx0aS1kaWFsb2cgcHJvY2VzcyB0aGF0IG11c3QgYmUgbmF2aWdhdGVkIHRvIHJlbW92ZSB5b3Vyc2VsZixcbi8vICAgc28gdGhpcyBzaG91bGQgbmF2aWdhdGUgaXQgYW5kIGNsaWNrIGFsbCB0aGUgbmVjZXNzYXJ5IHRoaW5ncyB0byByZW1vdmUgdGhlIHRhZy5cbmFzeW5jIGZ1bmN0aW9uIHVudGFnRnJvbVRpbWVsaW5lKCkge1xuICBjb25zdCBzdHJpbmdzVG9UcnkgPSBbXG4gICAgYEknbSBpbiB0aGlzIHBob3RvIGFuZCBJIGRvbid0IGxpa2UgaXRgLFxuICAgIGBUaGlzIGlzIGEgcGhvdG8gb2YgbWUgb3IgbXkgZmFtaWx5IHRoYXQgSSBkb24ndCB3YW50IG9uIEZhY2Vib29rYCxcbiAgICBgSSB0aGluayBpdCdzIGFuIHVuYXV0aG9yaXplZCB1c2Ugb2YgbXkgaW50ZWxsZWN0dWFsIHByb3BlcnR5YCxcbiAgICBgSSB0aGluayBpdCBzaG91bGRuJ3QgYmUgb24gRmFjZWJvb2tgLFxuICAgIGBJdCdzIGEgYmFkIHBob3RvIG9mIG1lYCxcbiAgICBgSXQncyBpbmFwcHJvcHJpYXRlYCxcbiAgICBgSXQgbWFrZXMgbWUgc2FkYCxcbiAgICBgSXQncyBlbWJhcnJhc3NpbmdgLFxuICAgIGBPdGhlcmAsXG4gICAgYFNvbWV0aGluZyBlbHNlYCxcbiAgICBgSXQncyBzb21ldGhpbmcgZWxzZWAsXG4gICAgYFNlZSBtb3JlIG9wdGlvbnNgLFxuICAgIGBSZW1vdmUgVGFnYCxcbiAgXTtcbiAgZm9yIChsZXQgbG9vcENvdW50ID0gMDsgbG9vcENvdW50IDwgNTsgbG9vcENvdW50KyspIHtcbiAgICBmb3IgKGNvbnN0IHRyeVN0cmluZyBvZiBzdHJpbmdzVG9UcnkpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGBUcnlpbmcgXCIke3RyeVN0cmluZ31cImApO1xuICAgICAgY29uc3QgcmVwb3J0ID0gYXdhaXQgZ2V0RGlhbG9nRm9yKHRyeVN0cmluZyk7XG4gICAgICBpZiAocmVwb3J0KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBGb3VuZCBcIiR7dHJ5U3RyaW5nfVwiYCk7XG4gICAgICAgIGF3YWl0IGNsaWNrSXRlbShyZXBvcnQpO1xuICAgICAgICBjb25zdCBjb250ID0gYXdhaXQgZ2V0RGlhbG9nRm9yKGBDb250aW51ZWApO1xuICAgICAgICBhd2FpdCBjbGlja0l0ZW0oY29udCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZvdW5kRG9uZSA9IGF3YWl0IGdldERpYWxvZ0ZvcihgRG9uZWApO1xuICBhd2FpdCBjbGlja0l0ZW0oZm91bmREb25lKTtcbn1cbi8vIEhlbHBlciB0byBnZXQgY2xpY2thYmxlIGVsZW1lbnRzIGluIGRyb3AgZG93biBtZW51c1xuYXN5bmMgZnVuY3Rpb24gZ2V0TWVudUZvcih0ZXh0OiBzdHJpbmcpIHtcbiAgLy8gY29uc29sZS5sb2coXCJnZXRNZW51Rm9yIG91dGVyXCIsIHRleHQpO1xuICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbcm9sZT1cIm1lbnVcIl1gKTtcbiAgICAgICAgaWYgKG1lbnUpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImdldE1lbnVGb3IgaW5uZXJcIiwgdGV4dCk7XG4gICAgICAgICAgY29uc3QgYWxsTWVudUl0ZW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KG1lbnUucXVlcnlTZWxlY3RvckFsbChgKmApKSBhcyBIVE1MRWxlbWVudFtdO1xuICAgICAgICAgIGNvbnN0IGZpbHRlcmVkTWVudUl0ZW1zID0gYWxsTWVudUl0ZW1zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5pbm5lclRleHQudG9Mb3dlckNhc2UoKSA9PT0gdGV4dC50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICBpZiAoZmlsdGVyZWRNZW51SXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoWy4uLmZpbHRlcmVkTWVudUl0ZW1zXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHsgY29uc29sZS5sb2coYGdldE1lbnVGb3IgZXJyb3JgLCBlKTsgcmV0dXJuIHJlc29sdmUoKTsgfVxuICAgIH0sIDUwMCk7XG4gIH0pO1xufVxuXG4vLyBIZWxwZXIgdG8gZ2V0IGNsaWNrYWJsZSBlbGVtZW50cyBpbiBwb3AgdXAgZGlhbG9nc1xuYXN5bmMgZnVuY3Rpb24gZ2V0RGlhbG9nRm9yKHRleHQ6IHN0cmluZykge1xuICAvLyBjb25zb2xlLmxvZyhcImdldERpYWxvZ0ZvciBvdXRlclwiLCB0ZXh0KTtcbiAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBkaWFsb2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW3JvbGU9XCJkaWFsb2dcIl1gKTtcbiAgICAgICAgY29uc3QgZGlhbG9nID0gZGlhbG9nc1tkaWFsb2dzLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAoZGlhbG9nKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJnZXREaWFsb2dGb3IgaW5uZXJcIiwgdGV4dCk7XG4gICAgICAgICAgY29uc3QgYWxsRGlhbG9nSXRlbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoZGlhbG9nLnF1ZXJ5U2VsZWN0b3JBbGwoYCpgKSkgYXMgSFRNTEVsZW1lbnRbXTtcbiAgICAgICAgICBjb25zdCBmaWx0ZXJlZERpYWxvZ0l0ZW1zID0gYWxsRGlhbG9nSXRlbXMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5pbm5lclRleHQudG9Mb3dlckNhc2UoKSA9PT0gdGV4dC50b0xvd2VyQ2FzZSgpICYmXG4gICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgIWl0ZW0uYXR0cmlidXRlcy5kaXNhYmxlZCAmJlxuICAgICAgICAgICAgICAhaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5fZWxlbVwiKSAmJlxuICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICghaXRlbS5jb21wdXRlZFN0eWxlTWFwIHx8IGl0ZW0uY29tcHV0ZWRTdHlsZU1hcCgpLmdldChcImRpc3BsYXlcIikudmFsdWUgIT09IFwibm9uZVwiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoZmlsdGVyZWREaWFsb2dJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShbLi4uZmlsdGVyZWREaWFsb2dJdGVtc10pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7IGNvbnNvbGUubG9nKGBnZXREaWFsb2dGb3IgZXJyb3JgLCBlKTsgcmV0dXJuIHJlc29sdmUoKTsgfVxuICAgIH0sIDUwMCk7XG4gIH0pO1xufVxuXG4vLyBSZW1vdmUgZHJvcCBkb3duIG1lbnVzIHdoZW4gd2VcInJlIGRvd24gd2l0aCB0aGVtIGJlY2F1c2UgRmFjZWJvb2sgZG9lc25cInRcbi8vICAgYW5kIHRoZSBoaWRkZW4gSFRNTCBncm93cyBzaWduaWZpY2FudGx5IGlmIHdlIGRvbid0LlxuYXN5bmMgZnVuY3Rpb24gY2xlYW51cE1lbnUoKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwiY2xlYW51cE1lbnVcIik7XG4gIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbcm9sZT1cIm1lbnVcIl1gKTtcbiAgcmV0dXJuIGF3YWl0IGNsZWFudXBFbGVtZW50KG1lbnUpO1xufVxuXG4vLyBTaW11bGF0ZSBhIHVzZXIgY2xpY2tpbmcgYW4gaXRlbS5cbmFzeW5jIGZ1bmN0aW9uIGNsaWNrSXRlbShpdGVtOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAvLyBjb25zb2xlLmxvZyhcImNsaWNrSXRlbSBvdXRlclwiLCBpdGVtKTtcbiAgaWYgKCFpdGVtIHx8IGl0ZW0ubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgZm9yIChjb25zdCBpIG9mIGl0ZW0pIHtcbiAgICAgIGF3YWl0IGNsaWNrSXRlbShpKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKGl0ZW0ubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGF3YWl0IGNsaWNrSXRlbShbLi4uaXRlbV0pO1xuICB9XG4gIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJjbGlja0l0ZW0gaW5uZXJcIiwgaXRlbSk7XG4gICAgICAgIGl0ZW0uY2xpY2soKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSBjYXRjaCAoZSkgeyBjb25zb2xlLmxvZyhgY2xpY2tJdGVtIGVycm9yYCwgZSk7IHJldHVybiByZXNvbHZlKCk7IH1cbiAgICB9LCA1MDApO1xuICB9KTtcbn1cblxuLy8gUmVtb3ZlIGVsZW1lbnRzIGZyb20gdGhlIHBhZ2Ugc28gdGhlIHByb2Nlc3NpbmcgZG9lc25cInQgc2xvdyBkb3duIGFzIG11Y2hcbmFzeW5jIGZ1bmN0aW9uIGNsZWFudXBFbGVtZW50KGl0ZW06IGFueSk6IFByb21pc2U8YW55PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwiY2xlYW51cEVsZW1lbnQgb3V0ZXJcIiwgaXRlbSk7XG4gIGlmICghaXRlbSB8fCBpdGVtLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgIGZvciAoY29uc3QgaSBvZiBpdGVtKSB7XG4gICAgICBhd2FpdCBjbGVhbnVwRWxlbWVudChpKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKGl0ZW0ubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGF3YWl0IGNsZWFudXBFbGVtZW50KFsuLi5pdGVtXSk7XG4gIH1cbiAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNsZWFudXBFbGVtZW50IGlubmVyXCIsIGl0ZW0pO1xuICAgICAgICBpdGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaXRlbSk7XG4gICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICB9IGNhdGNoIChlKSB7IGNvbnNvbGUubG9nKGByZW1vdmVJdGVtRnJvbVBhZ2UgZXJyb3JgLCBlKTsgcmV0dXJuIHJlc29sdmUoKTsgfVxuICAgIH0sIDUwMCk7XG4gIH0pO1xufVxuXG4vLyBTdGFydCBieSBjYWxsaW5nIG5leHRQYWdlIHJpZ2h0IGF3YXlcbm5leHRQYWdlKCk7XG4iXX0=