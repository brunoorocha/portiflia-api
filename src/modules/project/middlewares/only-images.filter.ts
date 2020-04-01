import { BadRequestException } from "@nestjs/common";

export const OnlyImagesFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new BadRequestException({ message: 'Only images are allowed!' }), false);
  }

  callback(null, true);
}
