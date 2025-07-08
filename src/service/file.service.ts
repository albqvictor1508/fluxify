import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  async convertToWebp(imageBuffer: Buffer): Promise<Buffer> {
    return sharp(imageBuffer).webp({ quality: 80 }).toBuffer();
  }

  //WARN: Procurar formas de converter: SVG, PDF, DOCX. pensando em um MVP, dps posso criar soluções na mão
  async convertToSvg(imageBuffer: Buffer) {
  }

  //WARN: tem algumas soluções, como cloudConverter e API's de conversão de arquivos
  async convertToPdf(fileBuffer: Buffer) {
  }

  async convertToJpeg(imageBuffer: Buffer): Promise<Buffer> {
    return sharp(imageBuffer).jpeg({ quality: 80 }).toBuffer();
  }

  async convertToJpg(imageBuffer: Buffer) { }
}
