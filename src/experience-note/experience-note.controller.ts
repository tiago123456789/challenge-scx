import { Body, Controller, Get, HttpCode, Inject, Param, Post, Put, UseFilters } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { HandlerException } from "src/common/exceptions/handler.exception";
import { ExperienceNoteDto } from "./experience-note.dto";
import { ExperienceNoteService } from "./experience-note.service";

@ApiTags('Experience notes')
@Controller({ path: "/experience-notes" })
export class ExperienceNoteController {

  constructor(private service: ExperienceNoteService) { }

  @ApiOperation({ summary: 'Atualizar dados de avalição de experiência' })
  @ApiResponse({ status: 200, description: 'Operação executada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Não pode atualizar os dados devido cliente, colaborator e loja informada não existe.'})
  @ApiResponse({ status: 400, description: 'Não foi informado os dados que são obrigatórios para executar a operação.'})
  @Put(":id")
  @UseFilters(new HandlerException())
  @HttpCode(204)
  async update(@Param("id") id: string, @Body() experienceNote: ExperienceNoteDto) {
    await this.service.update(id, experienceNote);
  }

  @ApiOperation({ summary: 'Retornar as avalições de experiência' })
  @ApiResponse({ status: 200, description: 'Operação executada com sucesso.'})
  @Get()
  @UseFilters(new HandlerException())
  getAll(): Promise<any> {
    return this.service.getAll();
  }

  @ApiOperation({ summary: 'Criar uma avalição de experiência' })
  @ApiResponse({ status: 201, description: 'Operação executada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Não pode atualizar os dados devido cliente, colaborator e loja informada não existe.'})
  @ApiResponse({ status: 400, description: 'Não foi informado os dados que são obrigatórios para executar a operação.'})
  @Post()
  @UseFilters(new HandlerException())
  async create(@Body() experienceNote: ExperienceNoteDto) {
    return await this.service.create(experienceNote);
  }

}