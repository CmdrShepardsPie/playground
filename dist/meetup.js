var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "body-parser", "cookie-parser", "express", "express-session", "passport", "passport-meetup"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // import axios from 'axios';
    // import * as path from 'path';
    const bodyParser = __importStar(require("body-parser"));
    // import * as serveStatic from 'serve-static';
    const cookieParser = __importStar(require("cookie-parser"));
    const express = __importStar(require("express"));
    const expressSession = __importStar(require("express-session"));
    const passport = __importStar(require("passport"));
    const passport_meetup_1 = require("passport-meetup");
    console.log("start");
    // const fs = {
    //   writeFile: promisify(_fs.writeFile)
    // };
    const app = express();
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
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    app.listen(3000);
    let _profile;
    passport.use(new passport_meetup_1.Strategy({}, (token, tokenSecret, profile, done) => {
        console.log("verify", token, tokenSecret, profile, done);
        _profile = profile;
        done(null, profile);
    }));
    app.get("/", async (req, res, next) => {
        const user = req && req.user;
        // console.log('/', req && req.user);
        const urlname = "ColoradoSprings4wheelers";
        const statuses = ["cancelled", "past", "proposed", "suggested", "upcoming"];
        const params = {
            "sign": true,
            "key": "5d6735595632314794b567935615f74",
            "photo-host": "secure",
        };
        const pars = Object.entries(params).map((param) => `${param[0]}=${param[1]}`).join("&");
        const url = `https://api.meetup.com/members/self?${pars}`;
        console.log("url", url);
        const events = await axios.get(url);
        // const events = await axios.get<IMeetupEvent[]>(`https://api.meetup.com/${urlname}/events?status=${statuses.join(',')}&photo-host=secure&sign=true&key=5d6735595632314794b567935615f74`);
        const eventid = 247253189;
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
    });
    app.get("/auth/meetup", passport.authenticate("meetup"));
    app.get("/auth/meetup/callback", passport.authenticate("meetup"), (req, res) => {
        // console.log('/auth/meetup/callback', JSON.stringify(req && req.user, null, 2));
        // res.json(JSON.stringify(req && req.user, null, 2)).send();
        res.redirect("/");
    });
    console.log("end");
});
