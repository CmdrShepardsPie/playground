// setup dependencies
import awsConfig from "@config/aws.config";
import {makeDirs, writeFileAsync} from "fs-helpers";
import * as AWS from "aws-sdk";
import {Body, GetObjectOutput, ListObjectsV2Output} from "aws-sdk/clients/s3";
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;
import chalk from "chalk";
import * as path from "path";
import {createLog} from "./node-logger";

// set config for upload.
AWS.config.update({
  accessKeyId: awsConfig.amazonS3.key,
  secretAccessKey: awsConfig.amazonS3.secret,
  region: awsConfig.amazonS3.region,
});

const s3 = new AWS.S3({apiVersion: "2006-03-01"});

const log = createLog("AWS Service");
/*  ======================
 //  UPLOAD FUNCTIONS
 //  ====================== */

export function upload(filename: string, body: Body): Promise<SendData> {
  filename = path.join(awsConfig.amazonS3.root, filename);
  log(chalk.green("upload"), filename);
  return new Promise(async (resolve, reject) => {
    await makeDirs(path.join("aws-upload", filename));
    await writeFileAsync(path.join("aws-upload", filename), body);
    return s3.upload({
      Bucket: awsConfig.amazonS3.bucket,
      Key: filename,
      // ContentType: contentType,
      Body: body,
    }).send((err, data) => {
      // log(chalk.blue("send"), "filename", filename, "data", data, "err", err);
      err ? reject(err) : resolve(data);
    });
  });
}

export function list(subdir?: string): Promise<ListObjectsV2Output> {
  subdir = path.join(awsConfig.amazonS3.root, subdir || "");
  log(chalk.green("list"), subdir);
  return new Promise((resolve, reject) => {
    return s3.listObjectsV2({
      Bucket: awsConfig.amazonS3.bucket,
      Prefix: subdir,
    }).send((err, data) => {
      // log(chalk.blue("send"), "fileName", fileName, "data", data, "err", err);
      err ? reject(err) : resolve(data);
    });
  });
}

export function download(filename: string): Promise<GetObjectOutput> {
  filename = path.join(awsConfig.amazonS3.root, filename);
  log(chalk.green("download"), filename);
  return new Promise((resolve, reject) => {
    return s3.getObject({
      Bucket: awsConfig.amazonS3.bucket,
      Key: filename,
    }).send(async (err, data) => {
      // log(chalk.blue("send"), "filename", filename, "data", data, "err", err);
      await makeDirs(path.join("aws-download", filename));
      await writeFileAsync(path.join("aws-download", filename), data.Body);
      err ? reject(err) : resolve(data);
    });
  });
}

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
