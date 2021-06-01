import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseFilters } from '@nestjs/common';
import { HandlerException } from 'src/common/exceptions/handler.exception';
import { CollaboratorService } from './collaborador.service';
import { Collaborator } from './collaborator.entity';

@Controller({ path: "/collaborators" })
export class CollaboratorController {

  constructor(private readonly service: CollaboratorService) {}

  @Get()
  @UseFilters(new HandlerException())
  getAll(): Promise<any> {
    return this.service.getAll();
  }

  @Post()
  @UseFilters(new HandlerException())
  @HttpCode(201)
  async create(@Body() collaborator: Collaborator) {
    return await this.service.create(collaborator);
  }

  @Put(":id")
  @UseFilters(new HandlerException())
  @HttpCode(204)
  async update(@Param("id") id: string, @Body() collaborator: Collaborator) {
    return await this.service.update(id, collaborator);
  }

  @Delete(":id")
  @UseFilters(new HandlerException())
  @HttpCode(204)
  inactive(@Param("id") id: string): Promise<any> {
    return this.service.inactive(id);
  }
}
