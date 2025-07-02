import { Controller, Post } from "@nestjs/common";

@Controller("file")
export class FileController {
  @Post()
  convertFile(): string {
    return "salve";
  }
}
