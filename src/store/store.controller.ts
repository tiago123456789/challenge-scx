import { Body, Controller, Delete, Get,
HttpCode, Param, Post, Put, UseFilters } from '@nestjs/common';
import { HandlerException } from 'src/common/exceptions/handler.exception';
import { StoreService } from './store.service';
import { StoreDto } from './store.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Stores')
@Controller({ path: "/stores" })
export class StoreController {

  constructor(private readonly service: StoreService) {}

  @ApiOperation({ summary: 'Criar loja matrix' })
  @ApiResponse({ status: 201, description: 'Operação executada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Não pode criar uma unidade de uma loja matrix que não existe.'})
  @ApiResponse({ status: 400, description: 'Não foi informado os dados que são obrigatórios para executar a operação.'})
  @Post()
  @UseFilters(new HandlerException())
  @HttpCode(201)
  async create(@Body() store: StoreDto) {
    return await this.service.create(store);
  }

  @ApiOperation({ summary: 'Criar unidade de uma loja matrix' })
  @ApiResponse({ status: 201, description: 'Operação executada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Não pode criar uma unidade de uma loja matrix que não existe.'})
  @ApiResponse({ status: 400, description: 'Não foi informado os dados que são obrigatórios para executar a operação.'})
  @Post("/:id/units")
  @UseFilters(new HandlerException())
  @HttpCode(201)
  async createUnit(@Param("id") matrixId: string, @Body() store: StoreDto) {
    store.matrixId = matrixId;
    return await this.service.createUnit(store);
  }

  @ApiOperation({ summary: 'Retorna lista de unidades de uma loja matrix' })
  @ApiResponse({ status: 200, description: 'Operação executada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Não pode retorna unidades de uma loja matrix que não existe.'})
  @Get("/:id/units")
  @UseFilters(new HandlerException())
  async getAllUnits(@Param("id") matrixId: string) {
    return await this.service.getAllUnits(matrixId);
  } 

  @ApiOperation({ summary: 'Inativar uma unidade' })
  @ApiResponse({ status: 204, description: 'Operação executada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Não pode inativar uma unidade que não existe.'})
  @Delete("/:id/units/:unitId")
  @UseFilters(new HandlerException())
  @HttpCode(204)
  async inactiveUnit(@Param("id") matrixId: string, @Param("unitId") unitId: string) {
    await this.service.inactiveUnit(matrixId, unitId);
  } 

  @ApiOperation({ summary: 'Atualizar os dados de uma unidade' })
  @ApiResponse({ status: 204, description: 'Operação executada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Não pode atualizar os dados de uma unidade que não existe a unidade ou loja matrix.'})
  @ApiResponse({ status: 400, description: 'Não foi informado os dados que são obrigatórios para executar a operação.'})
  @Put("/:id/units/:unitId")
  @UseFilters(new HandlerException())
  @HttpCode(204)
  async updateUnit(
    @Param("id") matrixId: string, @Param("unitId") unitId: string,
    @Body() store: StoreDto
  ) {
    await this.service.updateUnit(matrixId, unitId, store);
  } 

}
