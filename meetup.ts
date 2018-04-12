import { IMeetupUser } from './models/meetup.user';

console.log('start');
import _fs from 'fs';
import { promisify } from 'util';
// const fs = {
//   writeFile: promisify(_fs.writeFile)
// };

// import axios from 'axios';
import { IUserProfile, Strategy as MeetupStrategy } from 'passport-meetup';

// import * as path from 'path';
import * as express from 'express';
// import * as serveStatic from 'serve-static';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as passport from 'passport';
import { IMeetupEvent } from './models/meetup.events';

const app = express();
// app.use(serveStatic(path.resolve(__dirname, 'static'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: 'auto' }
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

let _profile: IUserProfile;

passport.use(new MeetupStrategy({
    consumerKey: 'genf0u522trnl34ed5qjomu6sb',
    consumerSecret: 'm410glrsa6b7fc1ueo5h3a6qu6',
    callbackURL: 'http://localhost:3000/auth/meetup/callback'
  },
  (token, tokenSecret, profile, done) => {
    console.log('verify', token, tokenSecret, profile, done);
    _profile = profile;
    done(null, profile);
  }
));
app.get('/',
  async (req, res, next) => {
    const user = req && req.user;
    // console.log('/', req && req.user);
    const urlname = 'ColoradoSprings4wheelers';
    const statuses = ['cancelled', 'past', 'proposed', 'suggested', 'upcoming'];
    const params = {
      'sign': true,
      'key': '5d6735595632314794b567935615f74',
      'photo-host': 'secure',
    };
    const pars = Object.entries(params).map(param => `${param[0]}=${param[1]}`).join('&');
    const url = `https://api.meetup.com/members/self?${pars}`;
    console.log('url', url);
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

app.get('/auth/meetup',
  passport.authenticate('meetup'));

app.get('/auth/meetup/callback',
  passport.authenticate('meetup'),
  (req, res) => {
    // console.log('/auth/meetup/callback', JSON.stringify(req && req.user, null, 2));
    // res.json(JSON.stringify(req && req.user, null, 2)).send();
    res.redirect('/');
  });
console.log('end');
