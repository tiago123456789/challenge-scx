import { Body, Controller, Delete, Get,
HttpCode, Param, Post, Put, UseFilters } from '@nestjs/common';
import { HandlerException } from 'src/common/exceptions/handler.exception';
import { StoreService } from './store.service';
import { StoreDto } from './store.dto';

@Controller({ path: "/stores" })
export class StoreController {

  constructor(private readonly service: StoreService) {}

  @Post()
  @UseFilters(new HandlerException())
  @HttpCode(201)
  async create(@Body() store: StoreDto) {
    return await this.service.create(store);
  }

  @Post("/:id/units")
  @UseFilters(new HandlerException())
  @HttpCode(201)
  async createUnit(@Param("id") matrixId: string, @Body() store: StoreDto) {
    store.matrixId = matrixId;
    return await this.service.createUnit(store);
  }

  @Get("/:id/units")
  @UseFilters(new HandlerException())
  async getAllUnits(@Param("id") matrixId: string) {
    return await this.service.getAllUnits(matrixId);
  } 

  @Delete("/:id/units/:unitId")
  @UseFilters(new HandlerException())
  @HttpCode(204)
  async inactiveUnit(@Param("id") matrixId: string, @Param("unitId") unitId: string) {
    await this.service.inactiveUnit(matrixId, unitId);
  } 

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
