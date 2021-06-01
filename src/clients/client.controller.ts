import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseFilters } from '@nestjs/common';
import { HandlerException } from 'src/common/exceptions/handler.exception';
import { ClientService } from './client.service';
import { Client } from './client.entity';

@Controller({ path: "/clients" })
export class CollaboratorController {

  constructor(private readonly service: ClientService) {}

  @Get()
  @UseFilters(new HandlerException())
  getAll(): Promise<any> {
    return this.service.getAll();
  }

  @Post()
  @UseFilters(new HandlerException())
  @HttpCode(201)
  async create(@Body() client: Client) {
    return await this.service.create(client);
  }

  @Put(":id")
  @UseFilters(new HandlerException())
  @HttpCode(204)
  async update(@Param("id") id: string, @Body() client: Client) {
    return await this.service.update(id, client);
  }

  @Delete(":id")
  @UseFilters(new HandlerException())
  @HttpCode(204)
  inactive(@Param("id") id: string): Promise<any> {
    return this.service.inactive(id);
  }
}
