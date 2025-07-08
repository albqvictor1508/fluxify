import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  async convertToWebp(image: Buffer): Promise<Buffer> {
    return sharp(image).webp({ quality: 80 }).toBuffer();
  }

  //WARN: Procurar formas de converter: SVG, PDF, DOCX. pensando em um MVP, dps posso criar soluções na mão 
  async convertToSvg(image: Buffer): Promise<Buffer> {
  }
}
