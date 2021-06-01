import { Module } from '@nestjs/common';
import { HandlerException } from './exceptions/handler.exception';
@Module({
  imports: [],
  // controllers: [AppController],
  providers: [HandlerException],
})
export class CommonModule {}
