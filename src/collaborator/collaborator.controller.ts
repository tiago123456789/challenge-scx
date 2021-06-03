import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HandlerException } from '../common/exceptions/handler.exception';
import { CollaboratorService } from './collaborador.service';
import { Collaborator } from './collaborator.entity';

@ApiTags('Collaborators')
@Controller({ path: "/collaborators" })
export class CollaboratorController {

  constructor(private readonly service: CollaboratorService) {}

  @ApiOperation({ summary: 'Retorna os colaboradores' })
  @ApiResponse({ status: 200, description: 'Operação executada com sucesso.'})
  @Get()
  @UseFilters(new HandlerException())
  getAll(): Promise<any> {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Cadastrar os colaborador' })
  @ApiResponse({ status: 201, description: 'Operação executada com sucesso.'})
  @ApiResponse({ status: 400, description: 'Não foi informado os dados que são obrigatórios para executar a operação.'})
  @Post()
  @UseFilters(new HandlerException())
  @HttpCode(201)
  async create(@Body() collaborator: Collaborator) {
    return await this.service.create(collaborator);
  }

  @ApiOperation({ summary: 'Atualizar dados de um colaborador' })
  @ApiResponse({ status: 204, description: 'Operação executada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Tentando atualizar os dados de um colaborador que não existe.'})
  @ApiResponse({ status: 400, description: 'Não foi informado os dados que são obrigatórios para executar a operação.'})
  @Put(":id")
  @UseFilters(new HandlerException())
  @HttpCode(204)
  async update(@Param("id") id: string, @Body() collaborator: Collaborator) {
    return await this.service.update(id, collaborator);
  }

  @ApiOperation({ summary: 'Inativar um colaborador' })
  @ApiResponse({ status: 204, description: 'Operação executada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Tentando inativar os dados de um colaborador que não existe.'})
  @Delete(":id")
  @UseFilters(new HandlerException())
  @HttpCode(204)
  inactive(@Param("id") id: string): Promise<any> {
    return this.service.inactive(id);
  }
}
