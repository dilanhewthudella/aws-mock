import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return 'Hello World!';
  }
  get awsAccessKeyId(): string {
    return this.configService.get<string>('AWS_ACCESS_KEY_ID');
  }

  get awsSecretAccessKey(): string {
    return this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
  }

  get awsRegion(): string {
    return this.configService.get<string>('AWS_REGION');
  }

  get s3BucketName(): string {
    return this.configService.get<string>('AWS_S3_BUCKET_NAME');
  }
}
