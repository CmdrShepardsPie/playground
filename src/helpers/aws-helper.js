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
