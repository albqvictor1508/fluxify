import { Module } from '@nestjs/common';
import { FileController } from './controller/file.controller';

@Module({
  imports: [],
  controllers: [FileController],
  providers: [], // onde fica os services
})
export class AppModule { }
