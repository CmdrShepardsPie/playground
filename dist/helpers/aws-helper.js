var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
        define(["require", "exports", "@config/aws.config", "aws-sdk", "chalk", "fs-helpers", "path", "./node-logger"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLWhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2F3cy1oZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEscUJBQXFCO0lBQ3JCLG9FQUEyQztJQUMzQyw2Q0FBK0I7SUFHL0Isa0RBQTBCO0lBQzFCLDJDQUFvRDtJQUNwRCwyQ0FBNkI7SUFDN0IsK0NBQXdDO0lBR3hDLHlCQUF5QjtJQUN6QixHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQixXQUFXLEVBQUUsb0JBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRztRQUNuQyxlQUFlLEVBQUUsb0JBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTTtRQUMxQyxNQUFNLEVBQUUsb0JBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTTtLQUNsQyxDQUFDLENBQUM7SUFFSCxNQUFNLEVBQUUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztJQUVsRCxNQUFNLEdBQUcsR0FBRyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXJDOztrQ0FFOEI7SUFFOUIsU0FBZ0IsTUFBTSxDQUFDLFFBQWdCLEVBQUUsSUFBVTtRQUNqRCxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEQsR0FBRyxDQUFDLGVBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLE1BQU0scUJBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sMkJBQWMs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QUFFO0FBQ0YscUVBQXFFO0FBQ3JFLHlEQUF5RDtBQUN6RCxtQ0FBbUM7QUFDbkMsc0JBQXNCO0FBQ3RCLGdCQUFnQjtBQUNoQixRQUFRO0FBQ1IsSUFBSTtBQUVKLDZCQUE2QjtBQUM3Qix3QkFBd0I7QUFDeEIsaUNBQWlDO0FBQ2pDLGtEQUFrRDtBQUNsRCxtQ0FBbUM7QUFDbkMsd0JBQXdCO0FBQ3hCLDZDQUE2QztBQUM3Qyx5Q0FBeUM7QUFDekMsWUFBWTtBQUNaLHdEQUF3RDtBQUN4RCx3QkFBd0I7QUFDeEIsbUVBQW1FO0FBQ25FLG9DQUFvQztBQUNwQyxzQkFBc0I7QUFDdEIsK0VBQStFO0FBQy9FLHFDQUFxQztBQUNyQyxlQUFlO0FBQ2YsYUFBYTtBQUNiLEtBQUs7QUFDTCxrQ0FBa0M7QUFDbEMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNldHVwIGRlcGVuZGVuY2llc1xuaW1wb3J0IGF3c0NvbmZpZyBmcm9tIFwiQGNvbmZpZy9hd3MuY29uZmlnXCI7XG5pbXBvcnQgKiBhcyBBV1MgZnJvbSBcImF3cy1zZGtcIjtcbmltcG9ydCB7Qm9keSwgR2V0T2JqZWN0T3V0cHV0LCBMaXN0T2JqZWN0c1YyT3V0cHV0fSBmcm9tIFwiYXdzLXNkay9jbGllbnRzL3MzXCI7XG5pbXBvcnQge01hbmFnZWRVcGxvYWR9IGZyb20gXCJhd3Mtc2RrL2xpYi9zMy9tYW5hZ2VkX3VwbG9hZFwiO1xuaW1wb3J0IGNoYWxrIGZyb20gXCJjaGFsa1wiO1xuaW1wb3J0IHttYWtlRGlycywgd3JpdGVGaWxlQXN5bmN9IGZyb20gXCJmcy1oZWxwZXJzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQge2NyZWF0ZUxvZ30gZnJvbSBcIi4vbm9kZS1sb2dnZXJcIjtcbmltcG9ydCBTZW5kRGF0YSA9IE1hbmFnZWRVcGxvYWQuU2VuZERhdGE7XG5cbi8vIHNldCBjb25maWcgZm9yIHVwbG9hZC5cbkFXUy5jb25maWcudXBkYXRlKHtcbiAgYWNjZXNzS2V5SWQ6IGF3c0NvbmZpZy5hbWF6b25TMy5rZXksXG4gIHNlY3JldEFjY2Vzc0tleTogYXdzQ29uZmlnLmFtYXpvblMzLnNlY3JldCxcbiAgcmVnaW9uOiBhd3NDb25maWcuYW1hem9uUzMucmVnaW9uLFxufSk7XG5cbmNvbnN0IHMzID0gbmV3IEFXUy5TMyh7YXBpVmVyc2lvbjogXCIyMDA2LTAzLTAxXCJ9KTtcblxuY29uc3QgbG9nID0gY3JlYXRlTG9nKFwiQVdTIFNlcnZpY2VcIik7XG5cbi8qICA9PT09PT09PT09PT09PT09PT09PT09XG4gLy8gIFVQTE9BRCBGVU5DVElPTlNcbiAvLyAgPT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdXBsb2FkKGZpbGVuYW1lOiBzdHJpbmcsIGJvZHk6IEJvZHkpOiBQcm9taXNlPFNlbmREYXRhPiB7XG4gIGZpbGVuYW1lID0gcGF0aC5qb2luKGF3c0NvbmZpZy5hbWF6b25TMy5yb290LCBmaWxlbmFtZSk7XG4gIGxvZyhjaGFsay5ncmVlbihcInVwbG9hZFwiKSwgZmlsZW5hbWUpO1xuICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGF3YWl0IG1ha2VEaXJzKHBhdGguam9pbihcImF3cy11cGxvYWRcIiwgZmlsZW5hbWUpKTtcbiAgICBhd2FpdCB3cml0ZUZpbGVBc3luYyhwYXRoLmpvaW4oXCJhd3MtdXBsb2FkXCIsIGZpbGVuYW1lKSwgYm9keSk7XG4gICAgcmV0dXJuIHMzLnVwbG9hZCh7XG4gICAgICBCdWNrZXQ6IGF3c0NvbmZpZy5hbWF6b25TMy5idWNrZXQsXG4gICAgICBLZXk6IGZpbGVuYW1lLFxuICAgICAgLy8gQ29udGVudFR5cGU6IGNvbnRlbnRUeXBlLFxuICAgICAgQm9keTogYm9keSxcbiAgICB9KS5zZW5kKChlcnIsIGRhdGEpID0+IHtcbiAgICAgIC8vIGxvZyhjaGFsay5ibHVlKFwic2VuZFwiKSwgXCJmaWxlbmFtZVwiLCBmaWxlbmFtZSwgXCJkYXRhXCIsIGRhdGEsIFwiZXJyXCIsIGVycik7XG4gICAgICBlcnIgPyByZWplY3QoZXJyKSA6IHJlc29sdmUoZGF0YSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdChzdWJkaXI/OiBzdHJpbmcpOiBQcm9taXNlPExpc3RPYmplY3RzVjJPdXRwdXQ+IHtcbiAgc3ViZGlyID0gcGF0aC5qb2luKGF3c0NvbmZpZy5hbWF6b25TMy5yb290LCBzdWJkaXIgfHwgXCJcIik7XG4gIGxvZyhjaGFsay5ncmVlbihcImxpc3RcIiksIHN1YmRpcik7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmV0dXJuIHMzLmxpc3RPYmplY3RzVjIoe1xuICAgICAgQnVja2V0OiBhd3NDb25maWcuYW1hem9uUzMuYnVja2V0LFxuICAgICAgUHJlZml4OiBzdWJkaXIsXG4gICAgfSkuc2VuZCgoZXJyLCBkYXRhKSA9PiB7XG4gICAgICAvLyBsb2coY2hhbGsuYmx1ZShcInNlbmRcIiksIFwiZmlsZU5hbWVcIiwgZmlsZU5hbWUsIFwiZGF0YVwiLCBkYXRhLCBcImVyclwiLCBlcnIpO1xuICAgICAgZXJyID8gcmVqZWN0KGVycikgOiByZXNvbHZlKGRhdGEpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkKGZpbGVuYW1lOiBzdHJpbmcpOiBQcm9taXNlPEdldE9iamVjdE91dHB1dD4ge1xuICBmaWxlbmFtZSA9IHBhdGguam9pbihhd3NDb25maWcuYW1hem9uUzMucm9vdCwgZmlsZW5hbWUpO1xuICBsb2coY2hhbGsuZ3JlZW4oXCJkb3dubG9hZFwiKSwgZmlsZW5hbWUpO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJldHVybiBzMy5nZXRPYmplY3Qoe1xuICAgICAgQnVja2V0OiBhd3NDb25maWcuYW1hem9uUzMuYnVja2V0LFxuICAgICAgS2V5OiBmaWxlbmFtZSxcbiAgICB9KS5zZW5kKGFzeW5jIChlcnIsIGRhdGEpID0+IHtcbiAgICAgIC8vIGxvZyhjaGFsay5ibHVlKFwic2VuZFwiKSwgXCJmaWxlbmFtZVwiLCBmaWxlbmFtZSwgXCJkYXRhXCIsIGRhdGEsIFwiZXJyXCIsIGVycik7XG4gICAgICBhd2FpdCBtYWtlRGlycyhwYXRoLmpvaW4oXCJhd3MtZG93bmxvYWRcIiwgZmlsZW5hbWUpKTtcbiAgICAgIGF3YWl0IHdyaXRlRmlsZUFzeW5jKHBhdGguam9pbihcImF3cy1kb3dubG9hZFwiLCBmaWxlbmFtZSksIGRhdGEuQm9keSk7XG4gICAgICBlcnIgPyByZWplY3QoZXJyKSA6IHJlc29sdmUoZGF0YSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vL1xuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvcHkoYnVja2V0OiBCdWNrZXROYW1lLCBzb3VyY2U6IENvcHlTb3VyY2UsIHRhcmdldDogT2JqZWN0S2V5KSB7XG4vLyAgIGNvbnNvbGUubG9nKFwiY29weVwiLCBcIkJ1Y2tldFwiLCBidWNrZXQsIFwic291cmNlXCIsIHNvdXJjZSwgXCJ0YXJnZXRcIiwgdGFyZ2V0KTtcbi8vICAgcmV0dXJuIGF3YWl0IHMzLmNvcHlPYmplY3Qoe1xuLy8gICAgIEJ1Y2tldDogYnVja2V0LFxuLy8gICAgIEtleTogdGFyZ2V0LFxuLy8gICAgIENvcHlTb3VyY2U6IHNvdXJjZSxcbi8vICAgfSk7XG4vLyB9XG4vL1xuLy8gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbW92ZShidWNrZXQ6IEJ1Y2tldE5hbWUsIGtleTogT2JqZWN0S2V5KSB7XG4vLyAgIGNvbnNvbGUubG9nKFwicmVtb3ZlXCIsIFwiQnVja2V0XCIsIGJ1Y2tldCwgXCJLZXlcIiwga2V5KTtcbi8vICAgcmV0dXJuIGF3YWl0IHMzLmRlbGV0ZU9iamVjdCh7XG4vLyAgICAgQnVja2V0OiBidWNrZXQsXG4vLyAgICAgS2V5OiBrZXksXG4vLyAgIH0pO1xuLy8gfVxuXG4vLyAvKiAgPT09PT09PT09PT09PT09PT09PT09PVxuLy8gIC8vICBERUxFVEUgRlVOQ1RJT05TXG4vLyAgLy8gID09PT09PT09PT09PT09PT09PT09PT0gKi9cbi8vIC8vIGF3c1NlcnZpY2UuZGVsZXRlRmlsZXMgPSBmdW5jdGlvbiAob2JqQXJyKSB7XG4vLyAvLyAgICAgdmFyIGRlZmVycmVkID0gcS5kZWZlcigpO1xuLy8gLy8gICAgIHZhciBwYXJhbXMgPSB7XG4vLyAvLyAgICAgICAgIEJ1Y2tldDogY29uZmlnLmFtYXpvblMzLmJ1Y2tldCxcbi8vIC8vICAgICAgICAgRGVsZXRlOiB7IE9iamVjdHM6IG9iakFyciB9XG4vLyAvLyAgICAgfTtcbi8vIC8vICAgICBzMy5kZWxldGVPYmplY3RzKHBhcmFtcywgZnVuY3Rpb24oZXJyLCBkYXRhKSB7XG4vLyAvLyAgICAgICAgIGlmIChlcnIpIHtcbi8vIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyciwgZXJyLnN0YWNrKTsgLy8gYW4gZXJyb3Igb2NjdXJyZWRcbi8vIC8vICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xuLy8gLy8gICAgICAgICB9IGVsc2Uge1xuLy8gLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZScsIGRhdGEpOyAgICAgICAgICAgLy8gc3VjY2Vzc2Z1bCByZXNwb25zZVxuLy8gLy8gICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuLy8gLy8gICAgICAgICB9XG4vLyAvLyAgICAgfSk7XG4vLyAvL1xuLy8gLy8gICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuLy8gLy8gfTtcbiJdfQ==