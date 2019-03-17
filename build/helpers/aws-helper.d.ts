import { Body, GetObjectOutput, ListObjectsV2Output } from "aws-sdk/clients/s3";
import { ManagedUpload } from "aws-sdk/lib/s3/managed_upload";
import SendData = ManagedUpload.SendData;
export declare function upload(filename: string, body: Body): Promise<SendData>;
export declare function list(subdir?: string): Promise<ListObjectsV2Output>;
export declare function download(filename: string): Promise<GetObjectOutput>;
//# sourceMappingURL=aws-helper.d.ts.map