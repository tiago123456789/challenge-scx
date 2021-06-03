import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseFilters } from '@nestjs/common';
import { HandlerException } from '../common/exceptions/handler.exception';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller({ path: "/clients" })
export class ClientController {

  constructor(private readonly service: ClientService) {}

  @ApiOperation({ summary: 'Retorna os clientes' })
  @ApiResponse({ status: 200, description: 'Operação executada com sucesso.'})
  @Get()
  @UseFilters(new HandlerException())
  getAll(): Promise<any> {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Cria um cliente' })
  @ApiResponse({ status: 201, description: 'Operação executada com sucesso.'})
  @ApiResponse({ status: 409, description: 'Erro quando está tentando criar um cliente com cpf ou telefone que não podem ser utilizado.'})
  @ApiResponse({ status: 400, description: 'Não foi informado os dados que são obrigatórios para executar a operação.'})
  @Post()
  @UseFilters(new HandlerException())
  @HttpCode(201)
  async create(@Body() client: Client) {
    return await this.service.create(client);
  }

  @ApiOperation({ summary: 'Atualiza os dados de um cliente' })
  @ApiResponse({ status: 204, description: 'Operação executada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Não pode atualizar os dados de um cliente que não existe.'})
  @ApiResponse({ status: 409, description: 'Erro quando está tentando atualizar os dados um cliente com cpf ou telefone que não podem ser utilizado.'})
  @ApiResponse({ status: 400, description: 'Não foi informado os dados que são obrigatórios para executar a operação.'})
  @Put(":id")
  @UseFilters(new HandlerException())
  @HttpCode(204)
  async update(@Param("id") id: string, @Body() client: Client) {
    return await this.service.update(id, client);
  }

  @ApiOperation({ summary: 'Inativar um cliente' })
  @ApiResponse({ status: 204, description: 'Operação executada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Não pode inativar um cliente que não existe.'})
  @Delete(":id")
  @UseFilters(new HandlerException())
  @HttpCode(204)
  inactive(@Param("id") id: string): Promise<any> {
    return this.service.inactive(id); 
  }
}
