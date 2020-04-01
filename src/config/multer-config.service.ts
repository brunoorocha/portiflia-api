import { Injectable } from "@nestjs/common";
import { MulterOptionsFactory, MulterModuleOptions } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { OnlyImagesFilter } from "src/modules/project/middlewares/only-images.filter";
import * as multer from 'multer';
import { GenerateImageName } from "src/modules/project/middlewares/generate-image-name";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor (private readonly configService: ConfigService) {}

  createMulterOptions (): MulterModuleOptions {
    return {
      fileFilter: OnlyImagesFilter,
      storage: multer.diskStorage({
        destination: this.configService.get<string>('app.filesDirectory'),
        filename: GenerateImageName
      })
    }
  }
}
