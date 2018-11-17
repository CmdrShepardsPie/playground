"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("start");
const passport_meetup_1 = require("passport-meetup");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const app = express();
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
    const eventid = 247253189;
    res.send(events.data);
    next();
});
app.get("/auth/meetup", passport.authenticate("meetup"));
app.get("/auth/meetup/callback", passport.authenticate("meetup"), (req, res) => {
    res.redirect("/");
});
console.log("end");
