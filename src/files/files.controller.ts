import {
  BadRequestException,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './Helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './Helpers/fileNamer.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName')
    imageName: string,
  ) {
    const path = this.filesService.getStaticProductImage(imageName);
    return res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
      //limits: { fieldSize}
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file)
      throw new BadRequestException('Make sure that the file is an image');

    const SecureUrl = `${this.configService.get('HOST_API')}/files/product/${
      file.filename
    }`;
    return { SecureUrl };
  }
}
