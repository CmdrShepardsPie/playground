var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVldHVwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21lZXR1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSw2QkFBNkI7SUFDN0IsZ0NBQWdDO0lBQ2hDLHdEQUEwQztJQUMxQywrQ0FBK0M7SUFDL0MsNERBQThDO0lBQzlDLGlEQUFtQztJQUNuQyxnRUFBa0Q7SUFDbEQsbURBQXFDO0lBQ3JDLHFEQUF5RTtJQUV6RSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JCLGVBQWU7SUFDZix3Q0FBd0M7SUFDeEMsS0FBSztJQUVMLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLDBEQUEwRDtJQUMxRCxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztRQUNyQixNQUFNLEVBQUUsY0FBYztRQUN0QixNQUFNLEVBQUUsS0FBSztRQUNiLGlCQUFpQixFQUFFLEtBQUs7UUFDeEIsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBQztLQUN6QixDQUFDLENBQUMsQ0FBQztJQUNKLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUU1QixRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWpCLElBQUksUUFBc0IsQ0FBQztJQUUzQixRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksMEJBQWMsQ0FBQyxFQUFFLEVBQ2hDLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekQsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FDRixDQUFDLENBQUM7SUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFDVCxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN2QixNQUFNLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQztRQUM3QixxQ0FBcUM7UUFDckMsTUFBTSxPQUFPLEdBQUcsMEJBQTBCLENBQUM7UUFDM0MsTUFBTSxRQUFRLEdBQUcsQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDNUUsTUFBTSxNQUFNLEdBQUc7WUFDYixNQUFNLEVBQUUsSUFBSTtZQUNaLEtBQUssRUFBRSxpQ0FBaUM7WUFDeEMsWUFBWSxFQUFFLFFBQVE7U0FDdkIsQ0FBQztRQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RixNQUFNLEdBQUcsR0FBRyx1Q0FBdUMsSUFBSSxFQUFFLENBQUM7UUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLDJMQUEyTDtRQUMzTCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDMUIscUNBQXFDO1FBQ3JDLDBIQUEwSDtRQUMxSCxZQUFZO1FBQ1osNkJBQTZCO1FBQzdCLHFEQUFxRDtRQUNyRCxzRUFBc0U7UUFDdEUsMkJBQTJCO1FBQzNCLG9CQUFvQjtRQUNwQixNQUFNO1FBQ04sc0JBQXNCO1FBQ3RCLE9BQU87UUFDUCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixJQUFJLEVBQUUsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0lBRUwsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQ3BCLFFBQVEsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUVuQyxHQUFHLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUM3QixRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUMvQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNYLGtGQUFrRjtRQUNsRiw2REFBNkQ7UUFDN0QsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuLy8gaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSBcImJvZHktcGFyc2VyXCI7XG4vLyBpbXBvcnQgKiBhcyBzZXJ2ZVN0YXRpYyBmcm9tICdzZXJ2ZS1zdGF0aWMnO1xuaW1wb3J0ICogYXMgY29va2llUGFyc2VyIGZyb20gXCJjb29raWUtcGFyc2VyXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgKiBhcyBleHByZXNzU2Vzc2lvbiBmcm9tIFwiZXhwcmVzcy1zZXNzaW9uXCI7XG5pbXBvcnQgKiBhcyBwYXNzcG9ydCBmcm9tIFwicGFzc3BvcnRcIjtcbmltcG9ydCB7SVVzZXJQcm9maWxlLCBTdHJhdGVneSBhcyBNZWV0dXBTdHJhdGVneX0gZnJvbSBcInBhc3Nwb3J0LW1lZXR1cFwiO1xuXG5jb25zb2xlLmxvZyhcInN0YXJ0XCIpO1xuLy8gY29uc3QgZnMgPSB7XG4vLyAgIHdyaXRlRmlsZTogcHJvbWlzaWZ5KF9mcy53cml0ZUZpbGUpXG4vLyB9O1xuXG5jb25zdCBhcHAgPSBleHByZXNzKCk7XG4vLyBhcHAudXNlKHNlcnZlU3RhdGljKHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzdGF0aWMnKSk7XG5hcHAudXNlKGNvb2tpZVBhcnNlcigpKTtcbmFwcC51c2UoYm9keVBhcnNlci51cmxlbmNvZGVkKHtleHRlbmRlZDogdHJ1ZX0pKTtcbmFwcC51c2UoZXhwcmVzc1Nlc3Npb24oe1xuICBzZWNyZXQ6IFwia2V5Ym9hcmQgY2F0XCIsXG4gIHJlc2F2ZTogZmFsc2UsXG4gIHNhdmVVbmluaXRpYWxpemVkOiBmYWxzZSxcbiAgY29va2llOiB7c2VjdXJlOiBcImF1dG9cIn0sXG59KSk7XG5hcHAudXNlKHBhc3Nwb3J0LmluaXRpYWxpemUoKSk7XG5hcHAudXNlKHBhc3Nwb3J0LnNlc3Npb24oKSk7XG5cbnBhc3Nwb3J0LnNlcmlhbGl6ZVVzZXIoKHVzZXIsIGRvbmUpID0+IHtcbiAgZG9uZShudWxsLCB1c2VyKTtcbn0pO1xuXG5wYXNzcG9ydC5kZXNlcmlhbGl6ZVVzZXIoKHVzZXIsIGRvbmUpID0+IHtcbiAgZG9uZShudWxsLCB1c2VyKTtcbn0pO1xuXG5hcHAubGlzdGVuKDMwMDApO1xuXG5sZXQgX3Byb2ZpbGU6IElVc2VyUHJvZmlsZTtcblxucGFzc3BvcnQudXNlKG5ldyBNZWV0dXBTdHJhdGVneSh7fSxcbiAgKHRva2VuLCB0b2tlblNlY3JldCwgcHJvZmlsZSwgZG9uZSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwidmVyaWZ5XCIsIHRva2VuLCB0b2tlblNlY3JldCwgcHJvZmlsZSwgZG9uZSk7XG4gICAgX3Byb2ZpbGUgPSBwcm9maWxlO1xuICAgIGRvbmUobnVsbCwgcHJvZmlsZSk7XG4gIH0sXG4pKTtcbmFwcC5nZXQoXCIvXCIsXG4gIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgIGNvbnN0IHVzZXIgPSByZXEgJiYgcmVxLnVzZXI7XG4gICAgLy8gY29uc29sZS5sb2coJy8nLCByZXEgJiYgcmVxLnVzZXIpO1xuICAgIGNvbnN0IHVybG5hbWUgPSBcIkNvbG9yYWRvU3ByaW5nczR3aGVlbGVyc1wiO1xuICAgIGNvbnN0IHN0YXR1c2VzID0gW1wiY2FuY2VsbGVkXCIsIFwicGFzdFwiLCBcInByb3Bvc2VkXCIsIFwic3VnZ2VzdGVkXCIsIFwidXBjb21pbmdcIl07XG4gICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgXCJzaWduXCI6IHRydWUsXG4gICAgICBcImtleVwiOiBcIjVkNjczNTU5NTYzMjMxNDc5NGI1Njc5MzU2MTVmNzRcIixcbiAgICAgIFwicGhvdG8taG9zdFwiOiBcInNlY3VyZVwiLFxuICAgIH07XG4gICAgY29uc3QgcGFycyA9IE9iamVjdC5lbnRyaWVzKHBhcmFtcykubWFwKChwYXJhbSkgPT4gYCR7cGFyYW1bMF19PSR7cGFyYW1bMV19YCkuam9pbihcIiZcIik7XG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLm1lZXR1cC5jb20vbWVtYmVycy9zZWxmPyR7cGFyc31gO1xuICAgIGNvbnNvbGUubG9nKFwidXJsXCIsIHVybCk7XG4gICAgY29uc3QgZXZlbnRzID0gYXdhaXQgYXhpb3MuZ2V0KHVybCk7XG4gICAgLy8gY29uc3QgZXZlbnRzID0gYXdhaXQgYXhpb3MuZ2V0PElNZWV0dXBFdmVudFtdPihgaHR0cHM6Ly9hcGkubWVldHVwLmNvbS8ke3VybG5hbWV9L2V2ZW50cz9zdGF0dXM9JHtzdGF0dXNlcy5qb2luKCcsJyl9JnBob3RvLWhvc3Q9c2VjdXJlJnNpZ249dHJ1ZSZrZXk9NWQ2NzM1NTk1NjMyMzE0Nzk0YjU2NzkzNTYxNWY3NGApO1xuICAgIGNvbnN0IGV2ZW50aWQgPSAyNDcyNTMxODk7XG4gICAgLy8gY29uc3QgZmllbGRzID0gWydjb21tZW50X3NhbXBsZSddO1xuICAgIC8vIGNvbnN0IHJzdnBzID0gYXdhaXQgYXhpb3MuZ2V0KGBodHRwczovL2FwaS5tZWV0dXAuY29tL0NvbG9yYWRvU3ByaW5nczR3aGVlbGVycy9ldmVudHMmc3RhdHVzZXM9JHtzdGF0dXNlcy5qb2luKCcsJyl9YCk7XG4gICAgLy8gMjQ3NDAzNDA1XG4gICAgLy8gY29uc3Qgb2JqZWN0czogYW55W10gPSBbXTtcbiAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgIC8vICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgb2JqZWN0cy5pbmRleE9mKHZhbHVlKSA9PT0gLTEpIHtcbiAgICAvLyAgICAgb2JqZWN0cy5wdXNoKHZhbHVlKTtcbiAgICAvLyAgICAgcmV0dXJuIHZhbHVlO1xuICAgIC8vICAgfVxuICAgIC8vICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAvLyB9KSk7XG4gICAgcmVzLnNlbmQoZXZlbnRzLmRhdGEpO1xuICAgIG5leHQoKTtcbiAgfSk7XG5cbmFwcC5nZXQoXCIvYXV0aC9tZWV0dXBcIixcbiAgcGFzc3BvcnQuYXV0aGVudGljYXRlKFwibWVldHVwXCIpKTtcblxuYXBwLmdldChcIi9hdXRoL21lZXR1cC9jYWxsYmFja1wiLFxuICBwYXNzcG9ydC5hdXRoZW50aWNhdGUoXCJtZWV0dXBcIiksXG4gIChyZXEsIHJlcykgPT4ge1xuICAgIC8vIGNvbnNvbGUubG9nKCcvYXV0aC9tZWV0dXAvY2FsbGJhY2snLCBKU09OLnN0cmluZ2lmeShyZXEgJiYgcmVxLnVzZXIsIG51bGwsIDIpKTtcbiAgICAvLyByZXMuanNvbihKU09OLnN0cmluZ2lmeShyZXEgJiYgcmVxLnVzZXIsIG51bGwsIDIpKS5zZW5kKCk7XG4gICAgcmVzLnJlZGlyZWN0KFwiL1wiKTtcbiAgfSk7XG5jb25zb2xlLmxvZyhcImVuZFwiKTtcbiJdfQ==