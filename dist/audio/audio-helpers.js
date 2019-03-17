(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../helpers/node-logger", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var node_logger_1 = require("../helpers/node-logger");
    var chalk_1 = require("chalk");
    var log = node_logger_1.createLog("Audio Helpers");
    function mixBuffers(mix) {
        // Convert buffer into number array so we have free reign to use any precision
        var numberArrays = mix["in"].map(function (p) { return read16LEToNumberArray(p.buffer); });
        var maxLength = numberArrays[0].length;
        // Find shortest array
        numberArrays.forEach(function (nums, x) {
            if (nums.length < maxLength) {
                maxLength = nums.length;
            }
            log(chalk_1["default"].green("In Buffer"), x, "samples", nums.length, "length", (nums.length / 16000).toFixed(2), "seconds");
        });
        // Normalize and truncate
        numberArrays.forEach(function (nums, i) {
            if (nums.length > maxLength) {
                nums.splice(maxLength);
            }
            if (mix["in"][i].normalize) {
                normalize(nums, i);
            }
            if (mix["in"][i].gain) {
                boost(nums, mix["in"][i].gain, i);
            }
        });
        // Mixing
        var mixedNumberArray = new Array(maxLength);
        var _loop_1 = function (i) {
            var mixed = 0;
            numberArrays.forEach(function (nums) { return (mixed += nums[i % nums.length]); });
            mixedNumberArray[i] = mixed / numberArrays.length;
        };
        for (var i = 0; i < maxLength; i += 1) {
            _loop_1(i);
        }
        if (mix.out.normalize) {
            normalize(mixedNumberArray, "Out");
        }
        if (mix.out.gain) {
            boost(mixedNumberArray, mix.out.gain, "Out");
        }
        // Numbers are going to be 16 bit integers but Buffer is going to be 8 bit integers
        var outBuffer = new Buffer(maxLength * 2);
        log(chalk_1["default"].green("Out Buffer"), "samples", outBuffer.length / 2, "length", (maxLength / 16000).toFixed(2), "seconds");
        mixedNumberArray.forEach(function (num, i) { return outBuffer.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(num))), i * 2); });
        return outBuffer;
    }
    exports.mixBuffers = mixBuffers;
    function read16LEToNumberArray(pcmData) {
        var numArray = [];
        for (var i = 0; i < pcmData.length; i += 2) {
            var num = pcmData.readInt16LE(i);
            numArray.push(num);
        }
        return numArray;
    }
    function normalize(inNumberArray, id) {
        var length = inNumberArray.length;
        var limit = (Math.pow(2, 16) / 2) - 1;
        var peak = 0;
        for (var i = 0; i < length; i++) {
            var value = Math.abs(inNumberArray[i]);
            if (value > peak) {
                peak = value;
            }
        }
        var amp = limit / peak;
        for (var i = 0; i < length; i++) {
            inNumberArray[i] = inNumberArray[i] * amp;
        }
        log(chalk_1["default"].blue("Normalized"), id !== undefined ? id : "", "peak", peak, "amplification", amp.toFixed(2) + " x");
    }
    function boost(inNumberArray, gainDb, id) {
        var ratio = Math.pow(10, gainDb / 10);
        var length = inNumberArray.length;
        for (var i = 0; i < length; i++) {
            inNumberArray[i] = inNumberArray[i] * ratio;
        }
        log(chalk_1["default"].yellow("Boosted"), id !== undefined ? id : "", "gain", gainDb + " db");
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8taGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdWRpby9hdWRpby1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsc0RBQWlEO0lBRWpELCtCQUEwQjtJQUUxQixJQUFNLEdBQUcsR0FBRyx1QkFBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXZDLFNBQWdCLFVBQVUsQ0FBQyxHQUFjO1FBQ3ZDLDhFQUE4RTtRQUM5RSxJQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsSUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEscUJBQXFCLENBQUMsQ0FBQyxDQUFDLE1BQU8sQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7UUFDekUsSUFBSSxTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN2QyxzQkFBc0I7UUFDdEIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxDQUFDO1lBQzNCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUU7Z0JBQzNCLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3pCO1lBQ0QsR0FBRyxDQUFDLGtCQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsSCxDQUFDLENBQUMsQ0FBQztRQUNILHlCQUF5QjtRQUN6QixZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0IsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN4QjtZQUNELElBQUksR0FBRyxDQUFDLElBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtnQkFDdkIsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNwQjtZQUNELElBQUksR0FBRyxDQUFDLElBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTtnQkFDbEIsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxTQUFTO1FBQ1QsSUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztnQ0FDckMsQ0FBQztZQUNSLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLFlBQVksQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJLElBQUssT0FBQSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7WUFDakUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7O1FBSHBELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0JBQTVCLENBQUM7U0FJVDtRQUNELElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7WUFDckIsU0FBUyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTtZQUNoQixLQUFLLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDOUM7UUFDRCxtRkFBbUY7UUFDbkYsSUFBTSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxrQkFBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNySCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFLLE9BQUEsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBakYsQ0FBaUYsQ0FBQyxDQUFDO1FBQ3hILE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUF6Q0QsZ0NBeUNDO0lBRUQsU0FBUyxxQkFBcUIsQ0FBQyxPQUFlO1FBQzVDLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxTQUFTLFNBQVMsQ0FBQyxhQUF1QixFQUFFLEVBQVE7UUFDbEQsSUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxJQUFNLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7UUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFFO1lBQ2hDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFO2dCQUNoQixJQUFJLEdBQUcsS0FBSyxDQUFDO2FBQ2Q7U0FDRjtRQUNELElBQU0sR0FBRyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBRTtZQUNoQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUMzQztRQUNELEdBQUcsQ0FBQyxrQkFBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2xILENBQUM7SUFFRCxTQUFTLEtBQUssQ0FBQyxhQUF1QixFQUFFLE1BQWMsRUFBRSxFQUFRO1FBQzlELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN4QyxJQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUU7WUFDaEMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDN0M7UUFDRCxHQUFHLENBQUMsa0JBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQztJQUNuRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtjcmVhdGVMb2d9IGZyb20gXCIuLi9oZWxwZXJzL25vZGUtbG9nZ2VyXCI7XG5pbXBvcnQge0lBdWRpb01peH0gZnJvbSBcIkBpbnRlcmZhY2VzL2kuYXVkaW8tbWl4XCI7XG5pbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCI7XG5cbmNvbnN0IGxvZyA9IGNyZWF0ZUxvZyhcIkF1ZGlvIEhlbHBlcnNcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiBtaXhCdWZmZXJzKG1peDogSUF1ZGlvTWl4KSB7XG4gIC8vIENvbnZlcnQgYnVmZmVyIGludG8gbnVtYmVyIGFycmF5IHNvIHdlIGhhdmUgZnJlZSByZWlnbiB0byB1c2UgYW55IHByZWNpc2lvblxuICBjb25zdCBudW1iZXJBcnJheXMgPSBtaXguaW4ubWFwKChwKSA9PiByZWFkMTZMRVRvTnVtYmVyQXJyYXkocC5idWZmZXIhKSk7XG4gIGxldCBtYXhMZW5ndGggPSBudW1iZXJBcnJheXNbMF0ubGVuZ3RoO1xuICAvLyBGaW5kIHNob3J0ZXN0IGFycmF5XG4gIG51bWJlckFycmF5cy5mb3JFYWNoKChudW1zLCB4KSA9PiB7XG4gICAgaWYgKG51bXMubGVuZ3RoIDwgbWF4TGVuZ3RoKSB7XG4gICAgICBtYXhMZW5ndGggPSBudW1zLmxlbmd0aDtcbiAgICB9XG4gICAgbG9nKGNoYWxrLmdyZWVuKFwiSW4gQnVmZmVyXCIpLCB4LCBcInNhbXBsZXNcIiwgbnVtcy5sZW5ndGgsIFwibGVuZ3RoXCIsIChudW1zLmxlbmd0aCAvIDE2MDAwKS50b0ZpeGVkKDIpLCBcInNlY29uZHNcIik7XG4gIH0pO1xuICAvLyBOb3JtYWxpemUgYW5kIHRydW5jYXRlXG4gIG51bWJlckFycmF5cy5mb3JFYWNoKChudW1zLCBpKSA9PiB7XG4gICAgaWYgKG51bXMubGVuZ3RoID4gbWF4TGVuZ3RoKSB7XG4gICAgICBudW1zLnNwbGljZShtYXhMZW5ndGgpO1xuICAgIH1cbiAgICBpZiAobWl4LmluW2ldLm5vcm1hbGl6ZSkge1xuICAgICAgbm9ybWFsaXplKG51bXMsIGkpO1xuICAgIH1cbiAgICBpZiAobWl4LmluW2ldLmdhaW4pIHtcbiAgICAgIGJvb3N0KG51bXMsIG1peC5pbltpXS5nYWluLCBpKTtcbiAgICB9XG4gIH0pO1xuICAvLyBNaXhpbmdcbiAgY29uc3QgbWl4ZWROdW1iZXJBcnJheSA9IG5ldyBBcnJheShtYXhMZW5ndGgpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1heExlbmd0aDsgaSArPSAxKSB7XG4gICAgbGV0IG1peGVkID0gMDtcbiAgICBudW1iZXJBcnJheXMuZm9yRWFjaCgobnVtcykgPT4gKG1peGVkICs9IG51bXNbaSAlIG51bXMubGVuZ3RoXSkpO1xuICAgIG1peGVkTnVtYmVyQXJyYXlbaV0gPSBtaXhlZCAvIG51bWJlckFycmF5cy5sZW5ndGg7XG4gIH1cbiAgaWYgKG1peC5vdXQubm9ybWFsaXplKSB7XG4gICAgbm9ybWFsaXplKG1peGVkTnVtYmVyQXJyYXksIFwiT3V0XCIpO1xuICB9XG4gIGlmIChtaXgub3V0LmdhaW4pIHtcbiAgICBib29zdChtaXhlZE51bWJlckFycmF5LCBtaXgub3V0LmdhaW4sIFwiT3V0XCIpO1xuICB9XG4gIC8vIE51bWJlcnMgYXJlIGdvaW5nIHRvIGJlIDE2IGJpdCBpbnRlZ2VycyBidXQgQnVmZmVyIGlzIGdvaW5nIHRvIGJlIDggYml0IGludGVnZXJzXG4gIGNvbnN0IG91dEJ1ZmZlciA9IG5ldyBCdWZmZXIobWF4TGVuZ3RoICogMik7XG4gIGxvZyhjaGFsay5ncmVlbihcIk91dCBCdWZmZXJcIiksIFwic2FtcGxlc1wiLCBvdXRCdWZmZXIubGVuZ3RoIC8gMiwgXCJsZW5ndGhcIiwgKG1heExlbmd0aCAvIDE2MDAwKS50b0ZpeGVkKDIpLCBcInNlY29uZHNcIik7XG4gIG1peGVkTnVtYmVyQXJyYXkuZm9yRWFjaCgobnVtLCBpKSA9PiBvdXRCdWZmZXIud3JpdGVJbnQxNkxFKE1hdGgubWF4KC0zMjc2OCwgTWF0aC5taW4oMzI3NjcsIE1hdGgucm91bmQobnVtKSkpLCBpICogMikpO1xuICByZXR1cm4gb3V0QnVmZmVyO1xufVxuXG5mdW5jdGlvbiByZWFkMTZMRVRvTnVtYmVyQXJyYXkocGNtRGF0YTogQnVmZmVyKSB7XG4gIGNvbnN0IG51bUFycmF5ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGNtRGF0YS5sZW5ndGg7IGkgKz0gMikge1xuICAgIGNvbnN0IG51bSA9IHBjbURhdGEucmVhZEludDE2TEUoaSk7XG4gICAgbnVtQXJyYXkucHVzaChudW0pO1xuICB9XG4gIHJldHVybiBudW1BcnJheTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKGluTnVtYmVyQXJyYXk6IG51bWJlcltdLCBpZD86IGFueSkge1xuICBjb25zdCBsZW5ndGggPSBpbk51bWJlckFycmF5Lmxlbmd0aDtcbiAgY29uc3QgbGltaXQgPSAoTWF0aC5wb3coMiwgMTYpIC8gMikgLSAxO1xuICBsZXQgcGVhayA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKSB7XG4gICAgY29uc3QgdmFsdWUgPSBNYXRoLmFicyhpbk51bWJlckFycmF5W2ldKTtcbiAgICBpZiAodmFsdWUgPiBwZWFrKSB7XG4gICAgICBwZWFrID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIGNvbnN0IGFtcCA9IGxpbWl0IC8gcGVhaztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKyspIHtcbiAgICBpbk51bWJlckFycmF5W2ldID0gaW5OdW1iZXJBcnJheVtpXSAqIGFtcDtcbiAgfVxuICBsb2coY2hhbGsuYmx1ZShcIk5vcm1hbGl6ZWRcIiksIGlkICE9PSB1bmRlZmluZWQgPyBpZCA6IFwiXCIsIFwicGVha1wiLCBwZWFrLCBcImFtcGxpZmljYXRpb25cIiwgYW1wLnRvRml4ZWQoMikgKyBcIiB4XCIpO1xufVxuXG5mdW5jdGlvbiBib29zdChpbk51bWJlckFycmF5OiBudW1iZXJbXSwgZ2FpbkRiOiBudW1iZXIsIGlkPzogYW55KSB7XG4gIGNvbnN0IHJhdGlvID0gTWF0aC5wb3coMTAsIGdhaW5EYiAvIDEwKTtcbiAgY29uc3QgbGVuZ3RoID0gaW5OdW1iZXJBcnJheS5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKSB7XG4gICAgaW5OdW1iZXJBcnJheVtpXSA9IGluTnVtYmVyQXJyYXlbaV0gKiByYXRpbztcbiAgfVxuICBsb2coY2hhbGsueWVsbG93KFwiQm9vc3RlZFwiKSwgaWQgIT09IHVuZGVmaW5lZCA/IGlkIDogXCJcIiwgXCJnYWluXCIsIGdhaW5EYiArIFwiIGRiXCIpO1xufVxuIl19