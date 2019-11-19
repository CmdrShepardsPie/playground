var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const chalk_1 = __importDefault(require("chalk"));
    let lastMessageInline = false;
    let lastContext;
    const bgColors = [
        // "bgBlack",
        "bgRed",
        "bgGreen",
        "bgYellow",
        "bgBlue",
        "bgMagenta",
        "bgCyan",
    ];
    let lastColor = 0;
    function createOut(context, color) {
        if (!color) {
            color = bgColors[lastColor];
            lastColor += 1;
            if (lastColor >= bgColors.length) {
                lastColor = 0;
            }
        }
        return { log: createLog(context, color), write: createWrite(context, color) };
    }
    exports.createOut = createOut;
    function createLog(context, color) {
        if (!color) {
            color = bgColors[lastColor];
            lastColor += 1;
            if (lastColor >= bgColors.length) {
                lastColor = 0;
            }
        }
        // @ts-ignore
        const chalkColorFn = chalk_1.default[color];
        return (...msg) => {
            msg = msg.map(prepIfJson);
            // if (lastContext !== context) {
            //   createEmptyLine();
            // }
            if (lastMessageInline) {
                createEmptyLine();
            }
            const args = [chalkColorFn(`${context}:`), ...msg];
            console.log(...args);
            lastMessageInline = false;
            lastContext = context;
        };
    }
    exports.createLog = createLog;
    function createWrite(context, color) {
        if (!color) {
            color = bgColors[lastColor];
            lastColor += 1;
            if (lastColor >= bgColors.length) {
                lastColor = 0;
            }
        }
        // @ts-ignore
        const chalkColorFn = chalk_1.default[color];
        return (...msg) => {
            if (!lastMessageInline) {
                process.stdout.write(chalkColorFn(`${context}:`) + " ");
            }
            if (lastMessageInline && lastContext !== context) {
                createEmptyLine();
                process.stdout.write(chalkColorFn(`${context}:`) + " ");
            }
            process.stdout.write(msg.join(" "));
            lastMessageInline = true;
            lastContext = context;
        };
    }
    exports.createWrite = createWrite;
    function createThrowError(context) {
        const color = bgColors[lastColor];
        lastColor += 1;
        if (lastColor >= bgColors.length) {
            lastColor = 0;
        }
        // @ts-ignore
        const chalkColorFn = chalk_1.default[color];
        return (type, ...msg) => {
            console.log(chalkColorFn(`${context}:`), chalk_1.default.red(`${type} Error:`), ...msg);
            process.exit(1);
        };
    }
    exports.createThrowError = createThrowError;
    function prepIfJson(t) {
        if (t instanceof Error) {
            return t;
        }
        if (typeof t === "string") {
            try {
                t = JSON.parse(t);
            }
            catch (e) {
                /* no empty */
            }
        }
        if (typeof t === "object") {
            try {
                t = JSON.stringify(t, null, 4);
                t = colorizeJsonString(t);
            }
            catch (e) {
                /* no empty */
            }
        }
        return t;
    }
    function colorizeJsonString(json) {
        // Strings
        json = json.replace(/(\s+)("[^"]*")(,?[\r\n])/gi, `$1${chalk_1.default.yellow("$2")}$3`);
        // booleans, numbers, etc.
        json = json.replace(/(\s+)([^"[{\]}][^[\]{}"\n\r,]*)(,?[\r\n])/gi, `$1${chalk_1.default.cyan("$2")}$3`);
        // Keys
        json = json.replace(/("[^"]*"):/gi, `${chalk_1.default.magenta("$1")}:`);
        return json;
    }
    function createEmptyLine() {
        console.log();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1sb2dnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9ub2RlLWxvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLGtEQUEwQjtJQUUxQixJQUFJLGlCQUFpQixHQUFZLEtBQUssQ0FBQztJQUN2QyxJQUFJLFdBQW1CLENBQUM7SUFFeEIsTUFBTSxRQUFRLEdBQUc7UUFDZixhQUFhO1FBQ2IsT0FBTztRQUNQLFNBQVM7UUFDVCxVQUFVO1FBQ1YsUUFBUTtRQUNSLFdBQVc7UUFDWCxRQUFRO0tBVVQsQ0FBQztJQUNGLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztJQUVsQixTQUFnQixTQUFTLENBQUMsT0FBZSxFQUFFLEtBQWM7UUFDdkQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLEtBQUssR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUIsU0FBUyxJQUFJLENBQUMsQ0FBQztZQUNmLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hDLFNBQVMsR0FBRyxDQUFDLENBQUM7YUFDZjtTQUNGO1FBQ0QsT0FBTyxFQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFDLENBQUM7SUFDOUUsQ0FBQztJQVRELDhCQVNDO0lBRUQsU0FBZ0IsU0FBUyxDQUFDLE9BQWUsRUFBRSxLQUFjO1FBQ3ZELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixLQUFLLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVCLFNBQVMsSUFBSSxDQUFDLENBQUM7WUFDZixJQUFJLFNBQVMsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUNoQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2FBQ2Y7U0FDRjtRQUNELGFBQWE7UUFDYixNQUFNLFlB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QUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuQjtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLGNBQWM7YUFDZjtTQUNGO1FBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDekIsSUFBSTtnQkFDRixDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixDQUFDLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0I7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixjQUFjO2FBQ2Y7U0FDRjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELFNBQVMsa0JBQWtCLENBQUMsSUFBWTtRQUN0QyxVQUFVO1FBQ1YsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQ2pCLDRCQUE0QixFQUM1QixLQUFLLGVBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDNUIsQ0FBQztRQUNGLDBCQUEwQjtRQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDakIsNkNBQTZDLEVBQzdDLEtBQUssZUFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUMxQixDQUFDO1FBQ0YsT0FBTztRQUNQLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxHQUFHLGVBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFNBQVMsZUFBZTtRQUN0QixPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcblxubGV0IGxhc3RNZXNzYWdlSW5saW5lOiBib29sZWFuID0gZmFsc2U7XG5sZXQgbGFzdENvbnRleHQ6IHN0cmluZztcblxuY29uc3QgYmdDb2xvcnMgPSBbXG4gIC8vIFwiYmdCbGFja1wiLFxuICBcImJnUmVkXCIsXG4gIFwiYmdHcmVlblwiLFxuICBcImJnWWVsbG93XCIsXG4gIFwiYmdCbHVlXCIsXG4gIFwiYmdNYWdlbnRhXCIsXG4gIFwiYmdDeWFuXCIsXG4gIC8vIFwiYmdXaGl0ZVwiLFxuICAvLyBcImJnQmxhY2tCcmlnaHRcIixcbiAgLy8gXCJiZ1JlZEJyaWdodFwiLFxuICAvLyBcImJnR3JlZW5CcmlnaHRcIixcbiAgLy8gXCJiZ1llbGxvd0JyaWdodFwiLFxuICAvLyBcImJnQmx1ZUJyaWdodFwiLFxuICAvLyBcImJnTWFnZW50YUJyaWdodFwiLFxuICAvLyBcImJnQ3lhbkJyaWdodFwiLFxuICAvLyBcImJnV2hpdGVCcmlnaHRcIixcbl07XG5sZXQgbGFzdENvbG9yID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU91dChjb250ZXh0OiBzdHJpbmcsIGNvbG9yPzogc3RyaW5nKSB7XG4gIGlmICghY29sb3IpIHtcbiAgICBjb2xvciA9IGJnQ29sb3JzW2xhc3RDb2xvcl07XG4gICAgbGFzdENvbG9yICs9IDE7XG4gICAgaWYgKGxhc3RDb2xvciA+PSBiZ0NvbG9ycy5sZW5ndGgpIHtcbiAgICAgIGxhc3RDb2xvciA9IDA7XG4gICAgfVxuICB9XG4gIHJldHVybiB7bG9nOiBjcmVhdGVMb2coY29udGV4dCwgY29sb3IpLCB3cml0ZTogY3JlYXRlV3JpdGUoY29udGV4dCwgY29sb3IpfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxvZyhjb250ZXh0OiBzdHJpbmcsIGNvbG9yPzogc3RyaW5nKSB7XG4gIGlmICghY29sb3IpIHtcbiAgICBjb2xvciA9IGJnQ29sb3JzW2xhc3RDb2xvcl07XG4gICAgbGFzdENvbG9yICs9IDE7XG4gICAgaWYgKGxhc3RDb2xvciA+PSBiZ0NvbG9ycy5sZW5ndGgpIHtcbiAgICAgIGxhc3RDb2xvciA9IDA7XG4gICAgfVxuICB9XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgY2hhbGtDb2xvckZuID0gY2hhbGtbY29sb3JdO1xuXG4gIHJldHVybiAoLi4ubXNnOiBhbnlbXSkgPT4ge1xuICAgIG1zZyA9IG1zZy5tYXAocHJlcElmSnNvbik7XG5cbiAgICAvLyBpZiAobGFzdENvbnRleHQgIT09IGNvbnRleHQpIHtcbiAgICAvLyAgIGNyZWF0ZUVtcHR5TGluZSgpO1xuICAgIC8vIH1cbiAgICBpZiAobGFzdE1lc3NhZ2VJbmxpbmUpIHtcbiAgICAgIGNyZWF0ZUVtcHR5TGluZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGFyZ3MgPSBbY2hhbGtDb2xvckZuKGAke2NvbnRleHR9OmApLCAuLi5tc2ddO1xuXG4gICAgY29uc29sZS5sb2coLi4uYXJncyk7XG4gICAgbGFzdE1lc3NhZ2VJbmxpbmUgPSBmYWxzZTtcbiAgICBsYXN0Q29udGV4dCA9IGNvbnRleHQ7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXcml0ZShjb250ZXh0OiBzdHJpbmcsIGNvbG9yPzogc3RyaW5nKSB7XG4gIGlmICghY29sb3IpIHtcbiAgICBjb2xvciA9IGJnQ29sb3JzW2xhc3RDb2xvcl07XG4gICAgbGFzdENvbG9yICs9IDE7XG4gICAgaWYgKGxhc3RDb2xvciA+PSBiZ0NvbG9ycy5sZW5ndGgpIHtcbiAgICAgIGxhc3RDb2xvciA9IDA7XG4gICAgfVxuICB9XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgY2hhbGtDb2xvckZuID0gY2hhbGtbY29sb3JdO1xuXG4gIHJldHVybiAoLi4ubXNnOiBhbnlbXSkgPT4ge1xuICAgIGlmICghbGFzdE1lc3NhZ2VJbmxpbmUpIHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGNoYWxrQ29sb3JGbihgJHtjb250ZXh0fTpgKSArIFwiIFwiKTtcbiAgICB9XG4gICAgaWYgKGxhc3RNZXNzYWdlSW5saW5lICYmIGxhc3RDb250ZXh0ICE9PSBjb250ZXh0KSB7XG4gICAgICBjcmVhdGVFbXB0eUxpbmUoKTtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGNoYWxrQ29sb3JGbihgJHtjb250ZXh0fTpgKSArIFwiIFwiKTtcbiAgICB9XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUobXNnLmpvaW4oXCIgXCIpKTtcbiAgICBsYXN0TWVzc2FnZUlubGluZSA9IHRydWU7XG4gICAgbGFzdENvbnRleHQgPSBjb250ZXh0O1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGhyb3dFcnJvcihjb250ZXh0OiBzdHJpbmcpIHtcbiAgY29uc3QgY29sb3IgPSBiZ0NvbG9yc1tsYXN0Q29sb3JdO1xuICBsYXN0Q29sb3IgKz0gMTtcbiAgaWYgKGxhc3RDb2xvciA+PSBiZ0NvbG9ycy5sZW5ndGgpIHtcbiAgICBsYXN0Q29sb3IgPSAwO1xuICB9XG4gIC8vIEB0cy1pZ25vcmVcbiAgY29uc3QgY2hhbGtDb2xvckZuID0gY2hhbGtbY29sb3JdO1xuXG4gIHJldHVybiAodHlwZTogc3RyaW5nLCAuLi5tc2c6IGFueVtdKSA9PiB7XG4gICAgY29uc29sZS5sb2coY2hhbGtDb2xvckZuKGAke2NvbnRleHR9OmApLCBjaGFsay5yZWQoYCR7dHlwZX0gRXJyb3I6YCksIC4uLm1zZyk7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwcmVwSWZKc29uKHQ6IGFueSk6IGFueSB7XG4gIGlmICh0IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gdDtcbiAgfVxuICBpZiAodHlwZW9mIHQgPT09IFwic3RyaW5nXCIpIHtcbiAgICB0cnkge1xuICAgICAgdCA9IEpTT04ucGFyc2UodCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyogbm8gZW1wdHkgKi9cbiAgICB9XG4gIH1cbiAgaWYgKHR5cGVvZiB0ID09PSBcIm9iamVjdFwiKSB7XG4gICAgdHJ5IHtcbiAgICAgIHQgPSBKU09OLnN0cmluZ2lmeSh0LCBudWxsLCA0KTtcbiAgICAgIHQgPSBjb2xvcml6ZUpzb25TdHJpbmcodCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLyogbm8gZW1wdHkgKi9cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHQ7XG59XG5cbmZ1bmN0aW9uIGNvbG9yaXplSnNvblN0cmluZyhqc29uOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBTdHJpbmdzXG4gIGpzb24gPSBqc29uLnJlcGxhY2UoXG4gICAgLyhcXHMrKShcIlteXCJdKlwiKSgsP1tcXHJcXG5dKS9naSxcbiAgICBgJDEke2NoYWxrLnllbGxvdyhcIiQyXCIpfSQzYCxcbiAgKTtcbiAgLy8gYm9vbGVhbnMsIG51bWJlcnMsIGV0Yy5cbiAganNvbiA9IGpzb24ucmVwbGFjZShcbiAgICAvKFxccyspKFteXCJbe1xcXX1dW15bXFxde31cIlxcblxccixdKikoLD9bXFxyXFxuXSkvZ2ksXG4gICAgYCQxJHtjaGFsay5jeWFuKFwiJDJcIil9JDNgLFxuICApO1xuICAvLyBLZXlzXG4gIGpzb24gPSBqc29uLnJlcGxhY2UoLyhcIlteXCJdKlwiKTovZ2ksIGAke2NoYWxrLm1hZ2VudGEoXCIkMVwiKX06YCk7XG4gIHJldHVybiBqc29uO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbXB0eUxpbmUoKSB7XG4gIGNvbnNvbGUubG9nKCk7XG59XG4iXX0=