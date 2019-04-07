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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "passport-meetup", "body-parser", "cookie-parser", "express", "express-session", "passport"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    console.log("start");
    // const fs = {
    //   writeFile: promisify(_fs.writeFile)
    // };
    // import axios from 'axios';
    var passport_meetup_1 = require("passport-meetup");
    // import * as path from 'path';
    var bodyParser = require("body-parser");
    // import * as serveStatic from 'serve-static';
    var cookieParser = require("cookie-parser");
    var express = require("express");
    var expressSession = require("express-session");
    var passport = require("passport");
    var app = express();
    // app.use(serveStatic(path.resolve(__dirname, 'static'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(expressSession({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: "auto" },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
    app.listen(3000);
    var _profile;
    passport.use(new passport_meetup_1.Strategy({}, function (token, tokenSecret, profile, done) {
        console.log("verify", token, tokenSecret, profile, done);
        _profile = profile;
        done(null, profile);
    }));
    app.get("/", function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var user, urlname, statuses, params, pars, url, events, eventid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = req && req.user;
                    urlname = "ColoradoSprings4wheelers";
                    statuses = ["cancelled", "past", "proposed", "suggested", "upcoming"];
                    params = {
                        "sign": true,
                        "key": "5d6735595632314794b567935615f74",
                        "photo-host": "secure",
                    };
                    pars = Object.entries(params).map(function (param) { return param[0] + "=" + param[1]; }).join("&");
                    url = "https://api.meetup.com/members/self?" + pars;
                    console.log("url", url);
                    return [4 /*yield*/, axios.get(url)];
                case 1:
                    events = _a.sent();
                    eventid = 247253189;
                    // const fields = ['comment_sample'];
                    // const rsvps = await axios.get(`https://api.meetup.com/ColoradoSprings4wheelers/events&statuses=${statuses.join(',')}`);
                    // 247403405
                    // const objects: any[] = [];
                    // console.log(JSON.stringify(data, (key, value) => {
                    //   if (typeof value === 'object' && objects.indexOf(value) === -1) {
                    //     objects.push(value);
                    //     return value;
                    //   }
                    //   return undefined;
                    // }));
                    res.send(events.data);
                    next();
                    return [2 /*return*/];
            }
        });
    }); });
    app.get("/auth/meetup", passport.authenticate("meetup"));
    app.get("/auth/meetup/callback", passport.authenticate("meetup"), function (req, res) {
        // console.log('/auth/meetup/callback', JSON.stringify(req && req.user, null, 2));
        // res.json(JSON.stringify(req && req.user, null, 2)).send();
        res.redirect("/");
    });
    console.log("end");
});
