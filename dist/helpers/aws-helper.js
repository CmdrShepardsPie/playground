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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@config/aws.config", "aws-sdk", "chalk", "fs-helpers", "path", "./node-logger"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.download = exports.list = exports.upload = void 0;
    // setup dependencies
    const aws_config_1 = __importDefault(require("@config/aws.config"));
    const AWS = __importStar(require("aws-sdk"));
    const chalk_1 = __importDefault(require("chalk"));
    const fs_helpers_1 = require("fs-helpers");
    const path = __importStar(require("path"));
    const node_logger_1 = require("./node-logger");
    // set config for upload.
    AWS.config.update({
        accessKeyId: aws_config_1.default.amazonS3.key,
        secretAccessKey: aws_config_1.default.amazonS3.secret,
        region: aws_config_1.default.amazonS3.region,
    });
    const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
    const log = node_logger_1.createLog("AWS Service");
    /*  ======================
     //  UPLOAD FUNCTIONS
     //  ====================== */
    function upload(filename, body) {
        filename = path.join(aws_config_1.default.amazonS3.root, filename);
        log(chalk_1.default.green("upload"), filename);
        return new Promise(async (resolve, reject) => {
            await fs_helpers_1.makeDirs(path.join("aws-upload", filename));
            await fs_helpers_1.writeFileAsync(path.join("aws-upload", filename), body);
            return s3.upload({
                Bucket: aws_config_1.default.amazonS3.bucket,
                Key: filename,
                // ContentType: contentType,
                Body: body,
            }).send((err, data) => {
                // log(chalk.blue("send"), "filename", filename, "data", data, "err", err);
                err ? reject(err) : resolve(data);
            });
        });
    }
    exports.upload = upload;
    function list(subdir) {
        subdir = path.join(aws_config_1.default.amazonS3.root, subdir || "");
        log(chalk_1.default.green("list"), subdir);
        return new Promise((resolve, reject) => {
            return s3.listObjectsV2({
                Bucket: aws_config_1.default.amazonS3.bucket,
                Prefix: subdir,
            }).send((err, data) => {
                // log(chalk.blue("send"), "fileName", fileName, "data", data, "err", err);
                err ? reject(err) : resolve(data);
            });
        });
    }
    exports.list = list;
    function download(filename) {
        filename = path.join(aws_config_1.default.amazonS3.root, filename);
        log(chalk_1.default.green("download"), filename);
        return new Promise((resolve, reject) => {
            return s3.getObject({
                Bucket: aws_config_1.default.amazonS3.bucket,
                Key: filename,
            }).send(async (err, data) => {
                // log(chalk.blue("send"), "filename", filename, "data", data, "err", err);
                await fs_helpers_1.makeDirs(path.join("aws-download", filename));
                await fs_helpers_1.writeFileAsync(path.join("aws-download", filename), data.Body);
                err ? reject(err) : resolve(data);
            });
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
