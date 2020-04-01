import { Controller, Get, Res, Param, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Controller('images')
export class ImagesController {
  constructor (private readonly configService: ConfigService) {}

  @Get(':imageName')
  async getImage(@Res() res, @Param('imageName') imageName: string) {
    const imagesDirectory = this.configService.get<string>('app.filesDirectory');
    const imagePath = `${imagesDirectory}/${imageName}`;

    fs.access(imagePath, (err) => {
      if (err) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: `The image ${imageName} could not be found` });
      }

      return res.sendFile(imageName, { root: imagesDirectory })
    });
  }
}
