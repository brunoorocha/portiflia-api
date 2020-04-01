import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MulterOptionsFactory, MulterModuleOptions } from "@nestjs/platform-express";
import { OnlyImagesFilter } from "src/modules/project/middlewares/only-images.filter";
import { GenerateImageName } from "src/modules/project/middlewares/generate-image-name";
import * as MulterCloudinaryStorage from 'multer-storage-cloudinary';
import * as cloudinary from 'cloudinary';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor (private readonly configService: ConfigService) {}

  createMulterOptions (): MulterModuleOptions {
    const cloudinaryFolderName = this.configService.get<string>('cloudinary.folder');

    const cloudinaryStorage = MulterCloudinaryStorage({
      cloudinary: cloudinary,
      folder: cloudinaryFolderName,
      filename: GenerateImageName
    });

    return {
      fileFilter: OnlyImagesFilter,
      storage: cloudinaryStorage
    }
  }
}
