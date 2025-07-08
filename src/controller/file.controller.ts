import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../service/file.service';
import type { Response } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('webp')
  @UseInterceptors(FileInterceptor('file'))
  async convertToWebp(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }
    const webpBuffer = await this.fileService.convertToWebp(file.buffer);

    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Content-Disposition', 'attachment; filename=converted.webp');
    return res.send(webpBuffer);
  }

  @Post("svg")
  @UseInterceptors(FileInterceptor('file'))
  async convertToSvg(@UploadedFile() file: Express.Multer.File, @Res() response: Response) {
    if (!file) return response.status(400).send("No file provided");

    const svgBuffer = await this.fileService.convertToSvg(file.buffer);

    response.setHeader("Content-Type", "image/svg");
    response.setHeader("Content-Disposition", value = 'attachment; filename=converted.svg');
    return response.send(svgBuffer);
  }
}
