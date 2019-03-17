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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVldHVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21lZXR1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxpQkFpR0E7O0lBL0ZBLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFHckIsZUFBZTtJQUNmLHdDQUF3QztJQUN4QyxLQUFLO0lBRUwsNkJBQTZCO0lBQzdCLG1EQUEyRTtJQUUzRSxnQ0FBZ0M7SUFDaEMsd0NBQTBDO0lBQzFDLCtDQUErQztJQUMvQyw0Q0FBOEM7SUFDOUMsaUNBQW1DO0lBQ25DLGdEQUFrRDtJQUNsRCxtQ0FBcUM7SUFHckMsSUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7SUFDdEIsMERBQTBEO0lBQzFELEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxjQUFjO1FBQ3RCLE1BQU0sRUFBRSxLQUFLO1FBQ2IsaUJBQWlCLEVBQUUsS0FBSztRQUN4QixNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO0tBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0osR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUMvQixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRTVCLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBQyxJQUFJLEVBQUUsSUFBSTtRQUNoQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFDLElBQUksRUFBRSxJQUFJO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWpCLElBQUksUUFBc0IsQ0FBQztJQUUzQixRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksMEJBQWMsQ0FBQyxFQUM3QixFQUNELFVBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSTtRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RCxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUNGLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUNULFVBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJOzs7OztvQkFDYixJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBRXZCLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztvQkFDckMsUUFBUSxHQUFHLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO29CQUN0RSxNQUFNLEdBQUc7d0JBQ2IsTUFBTSxFQUFFLElBQUk7d0JBQ1osS0FBSyxFQUFFLGlDQUFpQzt3QkFDeEMsWUFBWSxFQUFFLFFBQVE7cUJBQ3ZCLENBQUM7b0JBQ0ksSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFJLEtBQUssQ0FBQyxDQUFDLENBQUcsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDbEYsR0FBRyxHQUFHLHlDQUF1QyxJQUFNLENBQUM7b0JBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNULHFCQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUE7O29CQUE3QixNQUFNLEdBQUcsU0FBb0I7b0JBRTdCLE9BQU8sR0FBRyxTQUFTLENBQUM7b0JBQzFCLHFDQUFxQztvQkFDckMsMEhBQTBIO29CQUMxSCxZQUFZO29CQUNaLDZCQUE2QjtvQkFDN0IscURBQXFEO29CQUNyRCxzRUFBc0U7b0JBQ3RFLDJCQUEyQjtvQkFDM0Isb0JBQW9CO29CQUNwQixNQUFNO29CQUNOLHNCQUFzQjtvQkFDdEIsT0FBTztvQkFDUCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxFQUFFLENBQUM7Ozs7U0FDUixDQUFDLENBQUM7SUFFTCxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFDcEIsUUFBUSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRW5DLEdBQUcsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQzdCLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQy9CLFVBQUMsR0FBRyxFQUFFLEdBQUc7UUFDUCxrRkFBa0Y7UUFDbEYsNkRBQTZEO1FBQzdELEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU1lZXR1cFVzZXIgfSBmcm9tIFwiLi9tb2RlbHMvbWVldHVwLnVzZXJcIjtcblxuY29uc29sZS5sb2coXCJzdGFydFwiKTtcbmltcG9ydCBfZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tIFwidXRpbFwiO1xuLy8gY29uc3QgZnMgPSB7XG4vLyAgIHdyaXRlRmlsZTogcHJvbWlzaWZ5KF9mcy53cml0ZUZpbGUpXG4vLyB9O1xuXG4vLyBpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgSVVzZXJQcm9maWxlLCBTdHJhdGVneSBhcyBNZWV0dXBTdHJhdGVneSB9IGZyb20gXCJwYXNzcG9ydC1tZWV0dXBcIjtcblxuLy8gaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG4vLyBpbXBvcnQgKiBhcyBzZXJ2ZVN0YXRpYyBmcm9tICdzZXJ2ZS1zdGF0aWMnO1xuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gXCJjb29raWUtcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzU2Vzc2lvbiBmcm9tIFwiZXhwcmVzcy1zZXNzaW9uXCI7XG5pbXBvcnQgKiBhcyBwYXNzcG9ydCBmcm9tIFwicGFzc3BvcnRcIjtcbmltcG9ydCB7IElNZWV0dXBFdmVudCB9IGZyb20gXCIuL21vZGVscy9tZWV0dXAuZXZlbnRzXCI7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbi8vIGFwcC51c2Uoc2VydmVTdGF0aWMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3N0YXRpYycpKTtcbmFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5hcHAudXNlKGV4cHJlc3NTZXNzaW9uKHtcbiAgc2VjcmV0OiBcImtleWJvYXJkIGNhdFwiLFxuICByZXNhdmU6IGZhbHNlLFxuICBzYXZlVW5pbml0aWFsaXplZDogZmFsc2UsXG4gIGNvb2tpZTogeyBzZWN1cmU6IFwiYXV0b1wiIH0sXG59KSk7XG5hcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG5hcHAudXNlKHBhc3Nwb3J0LnNlc3Npb24oKSk7XG5cbnBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoKHVzZXIsIGRvbmUpID0+IHtcbiAgZG9uZShudWxsLCB1c2VyKTtcbn0pO1xuXG5wYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoKHVzZXIsIGRvbmUpID0+IHtcbiAgZG9uZShudWxsLCB1c2VyKTtcbn0pO1xuXG5hcHAubGlzdGVuKDMwMDApO1xuXG5sZXQgX3Byb2ZpbGU6IElVc2VyUHJvZmlsZTtcblxucGFzc3BvcnQudXNlKG5ldyBNZWV0dXBTdHJhdGVneSh7XG4gIH0sXG4gICh0b2tlbiwgdG9rZW5TZWNyZXQsIHByb2ZpbGUsIGRvbmUpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcInZlcmlmeVwiLCB0b2tlbiwgdG9rZW5TZWNyZXQsIHByb2ZpbGUsIGRvbmUpO1xuICAgIF9wcm9maWxlID0gcHJvZmlsZTtcbiAgICBkb25lKG51bGwsIHByb2ZpbGUpO1xuICB9LFxuKSk7XG5hcHAuZ2V0KFwiL1wiLFxuICBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICBjb25zdCB1c2VyID0gcmVxICYmIHJlcS51c2VyO1xuICAgIC8vIGNvbnNvbGUubG9nKCcvJywgcmVxICYmIHJlcS51c2VyKTtcbiAgICBjb25zdCB1cmxuYW1lID0gXCJDb2xvcmFkb1NwcmluZ3M0d2hlZWxlcnNcIjtcbiAgICBjb25zdCBzdGF0dXNlcyA9IFtcImNhbmNlbGxlZFwiLCBcInBhc3RcIiwgXCJwcm9wb3NlZFwiLCBcInN1Z2dlc3RlZFwiLCBcInVwY29taW5nXCJdO1xuICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgIFwic2lnblwiOiB0cnVlLFxuICAgICAgXCJrZXlcIjogXCI1ZDY3MzU1OTU2MzIzMTQ3OTRiNTY3OTM1NjE1Zjc0XCIsXG4gICAgICBcInBob3RvLWhvc3RcIjogXCJzZWN1cmVcIixcbiAgICB9O1xuICAgIGNvbnN0IHBhcnMgPSBPYmplY3QuZW50cmllcyhwYXJhbXMpLm1hcCgocGFyYW0pID0+IGAke3BhcmFtWzBdfT0ke3BhcmFtWzFdfWApLmpvaW4oXCImXCIpO1xuICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5tZWV0dXAuY29tL21lbWJlcnMvc2VsZj8ke3BhcnN9YDtcbiAgICBjb25zb2xlLmxvZyhcInVybFwiLCB1cmwpO1xuICAgIGNvbnN0IGV2ZW50cyA9IGF3YWl0IGF4aW9zLmdldCh1cmwpO1xuICAgIC8vIGNvbnN0IGV2ZW50cyA9IGF3YWl0IGF4aW9zLmdldDxJTWVldHVwRXZlbnRbXT4oYGh0dHBzOi8vYXBpLm1lZXR1cC5jb20vJHt1cmxuYW1lfS9ldmVudHM/c3RhdHVzPSR7c3RhdHVzZXMuam9pbignLCcpfSZwaG90by1ob3N0PXNlY3VyZSZzaWduPXRydWUma2V5PTVkNjczNTU5NTYzMjMxNDc5NGI1Njc5MzU2MTVmNzRgKTtcbiAgICBjb25zdCBldmVudGlkID0gMjQ3MjUzMTg5O1xuICAgIC8vIGNvbnN0IGZpZWxkcyA9IFsnY29tbWVudF9zYW1wbGUnXTtcbiAgICAvLyBjb25zdCByc3ZwcyA9IGF3YWl0IGF4aW9zLmdldChgaHR0cHM6Ly9hcGkubWVldHVwLmNvbS9Db2xvcmFkb1NwcmluZ3M0d2hlZWxlcnMvZXZlbnRzJnN0YXR1c2VzPSR7c3RhdHVzZXMuam9pbignLCcpfWApO1xuICAgIC8vIDI0NzQwMzQwNVxuICAgIC8vIGNvbnN0IG9iamVjdHM6IGFueVtdID0gW107XG4gICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSwgKGtleSwgdmFsdWUpID0+IHtcbiAgICAvLyAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIG9iamVjdHMuaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XG4gICAgLy8gICAgIG9iamVjdHMucHVzaCh2YWx1ZSk7XG4gICAgLy8gICAgIHJldHVybiB2YWx1ZTtcbiAgICAvLyAgIH1cbiAgICAvLyAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgLy8gfSkpO1xuICAgIHJlcy5zZW5kKGV2ZW50cy5kYXRhKTtcbiAgICBuZXh0KCk7XG4gIH0pO1xuXG5hcHAuZ2V0KFwiL2F1dGgvbWVldHVwXCIsXG4gIHBhc3Nwb3J0LmF1dGhlbnRpY2F0ZShcIm1lZXR1cFwiKSk7XG5cbmFwcC5nZXQoXCIvYXV0aC9tZWV0dXAvY2FsbGJhY2tcIixcbiAgcGFzc3BvcnQuYXV0aGVudGljYXRlKFwibWVldHVwXCIpLFxuICAocmVxLCByZXMpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZygnL2F1dGgvbWVldHVwL2NhbGxiYWNrJywgSlNPTi5zdHJpbmdpZnkocmVxICYmIHJlcS51c2VyLCBudWxsLCAyKSk7XG4gICAgLy8gcmVzLmpzb24oSlNPTi5zdHJpbmdpZnkocmVxICYmIHJlcS51c2VyLCBudWxsLCAyKSkuc2VuZCgpO1xuICAgIHJlcy5yZWRpcmVjdChcIi9cIik7XG4gIH0pO1xuY29uc29sZS5sb2coXCJlbmRcIik7XG4iXX0=