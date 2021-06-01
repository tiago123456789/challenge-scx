import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { CodeException } from './common/exceptions/code.exception';
import { HandlerException } from './common/exceptions/handler.exception';
import { NotFoundException } from './common/exceptions/not-found.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // @UseFilters(new HandlerException())
  // getHello(): string {
  //   throw new NotFoundException(CodeException.NOT_FOUND);
  //   return this.appService.getHello();
  // }
}
