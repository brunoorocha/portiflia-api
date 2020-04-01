import { Injectable } from "@nestjs/common";
import { MulterOptionsFactory, MulterModuleOptions } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor (private readonly configService: ConfigService) {}

  createMulterOptions (): MulterModuleOptions {
    return {
      dest: this.configService.get<string>('app.filesDirectory')
    }
  }
}
