import {Injectable, NgModule} from "@angular/core";
import * as AWS from "aws-sdk";
import { v4 as uuid } from "uuid";
import {CustomErrorHandlerService} from "./custom-error-handler.service";

@Injectable()
export class S3Service {
  private fileBaseUrl: string = "http://localhost:4569";
  private s3: AWS.S3 = new AWS.S3({
    s3ForcePathStyle: true,
    endpoint: this.fileBaseUrl,
    sslEnabled: false,
    accessKeyId: "123",
    secretAccessKey: "abc"
  });
  constructor(
    public errorHandler: CustomErrorHandlerService
  ) {
  }

  public async saveItem(item: any, userId: string): Promise<string> {
    const fileKey: string = uuid();

    try {
      await this.s3.putObject({
        Bucket: userId,
        Key: fileKey,
        ContentDisposition: `attachment; filename=${fileKey}`,
        Body: item,
        ACL: "public-read"
      }).promise();
    } catch (e) {
      this.errorHandler.handleError(e);
    }

    return `${this.fileBaseUrl}/${userId}/${fileKey}`;
  }
}

export function S3Factory(errorHandler: CustomErrorHandlerService) {
  return new S3Service(errorHandler);
}

@NgModule({
  providers: [
    {
      provide: S3Service,
      useFactory: S3Factory,
      deps: [CustomErrorHandlerService]
    }
  ]
})

export class S3Module {}
