import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { promises as fsPromises } from 'fs';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class S3Storage {
  private client: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.client = new AWS.S3({
      region: configService.getOrThrow<string>('AWS_REGION'),
      accessKeyId: configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.getOrThrow<string>('AWS_SECRET_KEY_ID'),
    });
  }

  async saveFile(file: any, bucket?: string): Promise<string> {
    try {
      const { filename, mimetype, path } = file;

      if (!bucket) {
        bucket = this.configService.getOrThrow<string>('AWS_BUCKET');
      }

      const fileContent = await fsPromises.readFile(path);

      await this.client
        .putObject({
          Bucket: bucket,
          Key: filename,
          ACL: 'public-read',
          Body: fileContent,
          ContentType: mimetype,
        })
        .promise();

      await fsPromises.unlink(path);

      const objectUrl = `https://${bucket}.s3.${this.client.config.region}.amazonaws.com/${filename}`;

      return objectUrl;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Erro ao salvar o arquivo no S3');
    }
  }

  async deleteBucket(object_key: string): Promise<void> {
    const match = object_key.match(/([^\/]+)$/);
    if (!match) {
      throw new InternalServerErrorException(
        'Invalid object key format to match in S3',
      );
    }
    const name = match[0];

    try {
      await this.client
        .deleteObject({
          Bucket: this.configService.getOrThrow<string>(
            'CASA_DAS_BICICLETAS_AWS_BUCKET',
          ),
          Key: name,
        })
        .promise();
    } catch (error) {
      console.error('Erro ao excluir o bucket:', error);
      throw new InternalServerErrorException('Erro ao excluir o bucket do S3');
    }
  }
}
