import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from 'aws-sdk';
import { S3 } from 'aws-sdk';
import {
  S3Client,
  GetObjectCommand,
  GetObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Controller()
export class AppController {
  private bucketName: string;
  private s3: S3Client;
  constructor(
    private readonly appService: AppService,
    private readonly configService: AppService,
  ) {
    this.bucketName = 'rajikabucket';
    this.s3 = new S3Client({
      // region: 'us-east-1', // Change to your region
    });
  }

  @Get()
  async getHello() {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: 'db.json',
    });
    const response: GetObjectCommandOutput = await this.s3.send(command);
    console.log(`response`, response.Body);
    const stream = response.Body as Readable;
    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks).toString('utf-8');
    // return 'response';
  }

  // @Get(':key')
  // async getObject(@Param('key') key: string) {
  //   try {
  //     const params = {
  //       Bucket: this.bucketName,
  //       Key: key,
  //     };
  //     const data = await this.s3.getObject(params).promise();
  //     return {
  //       contentType: data.ContentType,
  //       body: data.Body.toString(),
  //     };
  //   } catch (error) {
  //     return { error: error.message };
  //   }
  // }
}
