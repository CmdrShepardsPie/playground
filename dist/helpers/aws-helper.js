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
        define(["require", "exports", "@config/aws.config", "fs-helpers", "aws-sdk", "chalk", "path", "./node-logger"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // setup dependencies
    var aws_config_1 = require("@config/aws.config");
    var fs_helpers_1 = require("fs-helpers");
    var AWS = require("aws-sdk");
    var chalk_1 = require("chalk");
    var path = require("path");
    var node_logger_1 = require("./node-logger");
    // set config for upload.
    AWS.config.update({
        accessKeyId: aws_config_1.default.amazonS3.key,
        secretAccessKey: aws_config_1.default.amazonS3.secret,
        region: aws_config_1.default.amazonS3.region,
    });
    var s3 = new AWS.S3({ apiVersion: "2006-03-01" });
    var log = node_logger_1.createLog("AWS Service");
    /*  ======================
     //  UPLOAD FUNCTIONS
     //  ====================== */
    function upload(filename, body) {
        var _this = this;
        filename = path.join(aws_config_1.default.amazonS3.root, filename);
        log(chalk_1.default.green("upload"), filename);
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs_helpers_1.makeDirs(path.join("aws-upload", filename))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs_helpers_1.writeFileAsync(path.join("aws-upload", filename), body)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, s3.upload({
                                Bucket: aws_config_1.default.amazonS3.bucket,
                                Key: filename,
                                // ContentType: contentType,
                                Body: body,
                            }).send(function (err, data) {
                                // log(chalk.blue("send"), "filename", filename, "data", data, "err", err);
                                err ? reject(err) : resolve(data);
                            })];
                }
            });
        }); });
    }
    exports.upload = upload;
    function list(subdir) {
        subdir = path.join(aws_config_1.default.amazonS3.root, subdir || "");
        log(chalk_1.default.green("list"), subdir);
        return new Promise(function (resolve, reject) {
            return s3.listObjectsV2({
                Bucket: aws_config_1.default.amazonS3.bucket,
                Prefix: subdir,
            }).send(function (err, data) {
                // log(chalk.blue("send"), "fileName", fileName, "data", data, "err", err);
                err ? reject(err) : resolve(data);
            });
        });
    }
    exports.list = list;
    function download(filename) {
        var _this = this;
        filename = path.join(aws_config_1.default.amazonS3.root, filename);
        log(chalk_1.default.green("download"), filename);
        return new Promise(function (resolve, reject) {
            return s3.getObject({
                Bucket: aws_config_1.default.amazonS3.bucket,
                Key: filename,
            }).send(function (err, data) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // log(chalk.blue("send"), "filename", filename, "data", data, "err", err);
                        return [4 /*yield*/, fs_helpers_1.makeDirs(path.join("aws-download", filename))];
                        case 1:
                            // log(chalk.blue("send"), "filename", filename, "data", data, "err", err);
                            _a.sent();
                            return [4 /*yield*/, fs_helpers_1.writeFileAsync(path.join("aws-download", filename), data.Body)];
                        case 2:
                            _a.sent();
                            err ? reject(err) : resolve(data);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    }
    exports.download = download;
});
//
// export async function copy(bucket: BucketName, source: CopySource, target: ObjectKey) {
//   console.log("copy", "Bucket", bucket, "source", source, "target", target);
//   return await s3.copyObject({
//     Bucket: bucket,
//     Key: target,
//     CopySource: source,
//   });
// }
//
// export async function remove(bucket: BucketName, key: ObjectKey) {
//   console.log("remove", "Bucket", bucket, "Key", key);
//   return await s3.deleteObject({
//     Bucket: bucket,
//     Key: key,
//   });
// }
// /*  ======================
//  //  DELETE FUNCTIONS
//  //  ====================== */
// // awsService.deleteFiles = function (objArr) {
// //     var deferred = q.defer();
// //     var params = {
// //         Bucket: config.amazonS3.bucket,
// //         Delete: { Objects: objArr }
// //     };
// //     s3.deleteObjects(params, function(err, data) {
// //         if (err) {
// //             console.log(err, err.stack); // an error occurred
// //             deferred.reject();
// //         } else {
// //             console.log('delete', data);           // successful response
// //             deferred.resolve();
// //         }
// //     });
// //
// //     return deferred.promise;
// // };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2F3cy1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFBLHFCQUFxQjtJQUNyQixpREFBMkM7SUFDM0MseUNBQW9EO0lBQ3BELDZCQUErQjtJQUkvQiwrQkFBMEI7SUFDMUIsMkJBQTZCO0lBQzdCLDZDQUF3QztJQUV4Qyx5QkFBeUI7SUFDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEIsV0FBVyxFQUFFLG9CQUFTLENBQUMsUUFBUSxDQUFDLEdBQUc7UUFDbkMsZUFBZSxFQUFFLG9CQUFTLENBQUMsUUFBUSxDQUFDLE1BQU07UUFDMUMsTUFBTSxFQUFFLG9CQUFTLENBQUMsUUFBUSxDQUFDLE1BQU07S0FDbEMsQ0FBQyxDQUFDO0lBRUgsSUFBTSxFQUFFLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUM7SUFFbEQsSUFBTSxHQUFHLEdBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyQzs7a0NBRThCO0lBRTlCLFNBQWdCLE1BQU0sQ0FBQyxRQUFnQixFQUFFLElBQVU7UUFBbkQsaUJBZ0JDO1FBZkMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELEdBQUcsQ0FBQyxlQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBTyxPQUFPLEVBQUUsTUFBTTs7OzRCQUN2QyxxQkFBTSxxQkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxD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QUFDL0UsaUNBQWlDO0FBQ2pDLHNCQUFzQjtBQUN0QixtQkFBbUI7QUFDbkIsMEJBQTBCO0FBQzFCLFFBQVE7QUFDUixJQUFJO0FBQ0osRUFBRTtBQUNGLHFFQUFxRTtBQUNyRSx5REFBeUQ7QUFDekQsbUNBQW1DO0FBQ25DLHNCQUFzQjtBQUN0QixnQkFBZ0I7QUFDaEIsUUFBUTtBQUNSLElBQUk7QUFFSiw2QkFBNkI7QUFDN0Isd0JBQXdCO0FBQ3hCLGlDQUFpQztBQUNqQyxrREFBa0Q7QUFDbEQsbUNBQW1DO0FBQ25DLHdCQUF3QjtBQUN4Qiw2Q0FBNkM7QUFDN0MseUNBQXlDO0FBQ3pDLFlBQVk7QUFDWix3REFBd0Q7QUFDeEQsd0JBQXdCO0FBQ3hCLG1FQUFtRTtBQUNuRSxvQ0FBb0M7QUFDcEMsc0JBQXNCO0FBQ3RCLCtFQUErRTtBQUMvRSxxQ0FBcUM7QUFDckMsZUFBZTtBQUNmLGFBQWE7QUFDYixLQUFLO0FBQ0wsa0NBQWtDO0FBQ2xDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzZXR1cCBkZXBlbmRlbmNpZXNcbmltcG9ydCBhd3NDb25maWcgZnJvbSBcIkBjb25maWcvYXdzLmNvbmZpZ1wiO1xuaW1wb3J0IHttYWtlRGlycywgd3JpdGVGaWxlQXN5bmN9IGZyb20gXCJmcy1oZWxwZXJzXCI7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIjtcbmltcG9ydCB7Qm9keSwgR2V0T2JqZWN0T3V0cHV0LCBMaXN0T2JqZWN0c1YyT3V0cHV0fSBmcm9tIFwiYXdzLXNkay9jbGllbnRzL3MzXCI7XG5pbXBvcnQge01hbmFnZWRVcGxvYWR9IGZyb20gXCJhd3Mtc2RrL2xpYi9zMy9tYW5hZ2VkX3VwbG9hZFwiO1xuaW1wb3J0IFNlbmREYXRhID0gTWFuYWdlZFVwbG9hZC5TZW5kRGF0YTtcbmltcG9ydCBjaGFsayBmcm9tIFwiY2hhbGtcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7Y3JlYXRlTG9nfSBmcm9tIFwiLi9ub2RlLWxvZ2dlclwiO1xuXG4vLyBzZXQgY29uZmlnIGZvciB1cGxvYWQuXG5BV1MuY29uZmlnLnVwZGF0ZSh7XG4gIGFjY2Vzc0tleUlkOiBhd3NDb25maWcuYW1hem9uUzMua2V5LFxuICBzZWNyZXRBY2Nlc3NLZXk6IGF3c0NvbmZpZy5hbWF6b25TMy5zZWNyZXQsXG4gIHJlZ2lvbjogYXdzQ29uZmlnLmFtYXpvblMzLnJlZ2lvbixcbn0pO1xuXG5jb25zdCBzMyA9IG5ldyBBV1MuUzMoe2FwaVZlcnNpb246IFwiMjAwNi0wMy0wMVwifSk7XG5cbmNvbnN0IGxvZyA9IGNyZWF0ZUxvZyhcIkFXUyBTZXJ2aWNlXCIpO1xuLyogID09PT09PT09PT09PT09PT09PT09PT1cbiAvLyAgVVBMT0FEIEZVTkNUSU9OU1xuIC8vICA9PT09PT09PT09PT09PT09PT09PT09ICovXG5cbmV4cG9ydCBmdW5jdGlvbiB1cGxvYWQoZmlsZW5hbWU6IHN0cmluZywgYm9keTogQm9keSk6IFByb21pc2U8U2VuZERhdGE+IHtcbiAgZmlsZW5hbWUgPSBwYXRoLmpvaW4oYXdzQ29uZmlnLmFtYXpvblMzLnJvb3QsIGZpbGVuYW1lKTtcbiAgbG9nKGNoYWxrLmdyZWVuKFwidXBsb2FkXCIpLCBmaWxlbmFtZSk7XG4gIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgYXdhaXQgbWFrZURpcnMocGF0aC5qb2luKFwiYXdzLXVwbG9hZFwiLCBmaWxlbmFtZSkpO1xuICAgIGF3YWl0IHdyaXRlRmlsZUFzeW5jKHBhdGguam9pbihcImF3cy11cGxvYWRcIiwgZmlsZW5hbWUpLCBib2R5KTtcbiAgICByZXR1cm4gczMudXBsb2FkKHtcbiAgICAgIEJ1Y2tldDogYXdzQ29uZmlnLmFtYXpvblMzLmJ1Y2tldCxcbiAgICAgIEtleTogZmlsZW5hbWUsXG4gICAgICAvLyBDb250ZW50VHlwZTogY29udGVudFR5cGUsXG4gICAgICBCb2R5OiBib2R5LFxuICAgIH0pLnNlbmQoKGVyciwgZGF0YSkgPT4ge1xuICAgICAgLy8gbG9nKGNoYWxrLmJsdWUoXCJzZW5kXCIpLCBcImZpbGVuYW1lXCIsIGZpbGVuYW1lLCBcImRhdGFcIiwgZGF0YSwgXCJlcnJcIiwgZXJyKTtcbiAgICAgIGVyciA/IHJlamVjdChlcnIpIDogcmVzb2x2ZShkYXRhKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsaXN0KHN1YmRpcj86IHN0cmluZyk6IFByb21pc2U8TGlzdE9iamVjdHNWMk91dHB1dD4ge1xuICBzdWJkaXIgPSBwYXRoLmpvaW4oYXdzQ29uZmlnLmFtYXpvblMzLnJvb3QsIHN1YmRpciB8fCBcIlwiKTtcbiAgbG9nKGNoYWxrLmdyZWVuKFwibGlzdFwiKSwgc3ViZGlyKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXR1cm4gczMubGlzdE9iamVjdHNWMih7XG4gICAgICBCdWNrZXQ6IGF3c0NvbmZpZy5hbWF6b25TMy5idWNrZXQsXG4gICAgICBQcmVmaXg6IHN1YmRpcixcbiAgICB9KS5zZW5kKChlcnIsIGRhdGEpID0+IHtcbiAgICAgIC8vIGxvZyhjaGFsay5ibHVlKFwic2VuZFwiKSwgXCJmaWxlTmFtZVwiLCBmaWxlTmFtZSwgXCJkYXRhXCIsIGRhdGEsIFwiZXJyXCIsIGVycik7XG4gICAgICBlcnIgPyByZWplY3QoZXJyKSA6IHJlc29sdmUoZGF0YSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWQoZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8R2V0T2JqZWN0T3V0cHV0PiB7XG4gIGZpbGVuYW1lID0gcGF0aC5qb2luKGF3c0NvbmZpZy5hbWF6b25TMy5yb290LCBmaWxlbmFtZSk7XG4gIGxvZyhjaGFsay5ncmVlbihcImRvd25sb2FkXCIpLCBmaWxlbmFtZSk7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmV0dXJuIHMzLmdldE9iamVjdCh7XG4gICAgICBCdWNrZXQ6IGF3c0NvbmZpZy5hbWF6b25TMy5idWNrZXQsXG4gICAgICBLZXk6IGZpbGVuYW1lLFxuICAgIH0pLnNlbmQoYXN5bmMgKGVyciwgZGF0YSkgPT4ge1xuICAgICAgLy8gbG9nKGNoYWxrLmJsdWUoXCJzZW5kXCIpLCBcImZpbGVuYW1lXCIsIGZpbGVuYW1lLCBcImRhdGFcIiwgZGF0YSwgXCJlcnJcIiwgZXJyKTtcbiAgICAgIGF3YWl0IG1ha2VEaXJzKHBhdGguam9pbihcImF3cy1kb3dubG9hZFwiLCBmaWxlbmFtZSkpO1xuICAgICAgYXdhaXQgd3JpdGVGaWxlQXN5bmMocGF0aC5qb2luKFwiYXdzLWRvd25sb2FkXCIsIGZpbGVuYW1lKSwgZGF0YS5Cb2R5KTtcbiAgICAgIGVyciA/IHJlamVjdChlcnIpIDogcmVzb2x2ZShkYXRhKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbi8vXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gY29weShidWNrZXQ6IEJ1Y2tldE5hbWUsIHNvdXJjZTogQ29weVNvdXJjZSwgdGFyZ2V0OiBPYmplY3RLZXkpIHtcbi8vICAgY29uc29sZS5sb2coXCJjb3B5XCIsIFwiQnVja2V0XCIsIGJ1Y2tldCwgXCJzb3VyY2VcIiwgc291cmNlLCBcInRhcmdldFwiLCB0YXJnZXQpO1xuLy8gICByZXR1cm4gYXdhaXQgczMuY29weU9iamVjdCh7XG4vLyAgICAgQnVja2V0OiBidWNrZXQsXG4vLyAgICAgS2V5OiB0YXJnZXQsXG4vLyAgICAgQ29weVNvdXJjZTogc291cmNlLFxuLy8gICB9KTtcbi8vIH1cbi8vXG4vLyBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVtb3ZlKGJ1Y2tldDogQnVja2V0TmFtZSwga2V5OiBPYmplY3RLZXkpIHtcbi8vICAgY29uc29sZS5sb2coXCJyZW1vdmVcIiwgXCJCdWNrZXRcIiwgYnVja2V0LCBcIktleVwiLCBrZXkpO1xuLy8gICByZXR1cm4gYXdhaXQgczMuZGVsZXRlT2JqZWN0KHtcbi8vICAgICBCdWNrZXQ6IGJ1Y2tldCxcbi8vICAgICBLZXk6IGtleSxcbi8vICAgfSk7XG4vLyB9XG5cbi8vIC8qICA9PT09PT09PT09PT09PT09PT09PT09XG4vLyAgLy8gIERFTEVURSBGVU5DVElPTlNcbi8vICAvLyAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xuLy8gLy8gYXdzU2VydmljZS5kZWxldGVGaWxlcyA9IGZ1bmN0aW9uIChvYmpBcnIpIHtcbi8vIC8vICAgICB2YXIgZGVmZXJyZWQgPSBxLmRlZmVyKCk7XG4vLyAvLyAgICAgdmFyIHBhcmFtcyA9IHtcbi8vIC8vICAgICAgICAgQnVja2V0OiBjb25maWcuYW1hem9uUzMuYnVja2V0LFxuLy8gLy8gICAgICAgICBEZWxldGU6IHsgT2JqZWN0czogb2JqQXJyIH1cbi8vIC8vICAgICB9O1xuLy8gLy8gICAgIHMzLmRlbGV0ZU9iamVjdHMocGFyYW1zLCBmdW5jdGlvbihlcnIsIGRhdGEpIHtcbi8vIC8vICAgICAgICAgaWYgKGVycikge1xuLy8gLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLCBlcnIuc3RhY2spOyAvLyBhbiBlcnJvciBvY2N1cnJlZFxuLy8gLy8gICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KCk7XG4vLyAvLyAgICAgICAgIH0gZWxzZSB7XG4vLyAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVsZXRlJywgZGF0YSk7ICAgICAgICAgICAvLyBzdWNjZXNzZnVsIHJlc3BvbnNlXG4vLyAvLyAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4vLyAvLyAgICAgICAgIH1cbi8vIC8vICAgICB9KTtcbi8vIC8vXG4vLyAvLyAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4vLyAvLyB9O1xuIl19