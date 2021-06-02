import { Body, Controller, Get, HttpCode, Inject, Param, Post, Put, UseFilters } from "@nestjs/common";
import { HandlerException } from "src/common/exceptions/handler.exception";
import { ExperienceNoteDto } from "./experience-note.dto";
import { ExperienceNoteService } from "./experience-note.service";


@Controller({ path: "/experience-notes" })
export class ExperienceNoteController {

  constructor(private service: ExperienceNoteService) { }

  @Put(":id")
  @UseFilters(new HandlerException())
  @HttpCode(204)
  async update(@Param("id") id: string, @Body() experienceNote: ExperienceNoteDto) {
    await this.service.update(id, experienceNote);
  }

  @Get()
  @UseFilters(new HandlerException())
  getAll(): Promise<any> {
    return this.service.getAll();
  }

  @Post()
  @UseFilters(new HandlerException())
  async create(@Body() experienceNote: ExperienceNoteDto) {
    return await this.service.create(experienceNote);
  }

}