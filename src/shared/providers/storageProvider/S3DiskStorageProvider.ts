import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

export default class DiskStorageProvider {
  public client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file); //pegando o caminho do arquivo

    const ContentType = mime.getType(originalPath); //Pegando o tipo do arquivo

    if (!ContentType) {
      throw new Error('File not Found!');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file, //Nome do arquivo
        ACL: 'public-read', //Permissão para esse arquivo
        Body: fileContent, //Conteudo do arquivo
        ContentType,
      })
      .promise(); // Realizando o envio do arquivo

    await fs.promises.unlink(originalPath); //Apagando o arquivo do disk local

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file, //Nome do arquivo
      })
      .promise();
  }
}
