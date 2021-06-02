import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientService } from "src/client/client.service";
import { CollaboratorService } from "src/collaborator/collaborador.service";
import { BusinessException } from "src/common/exceptions/business.exception";
import { CodeException } from "src/common/exceptions/code.exception";
import { NotFoundException } from "src/common/exceptions/not-found.exception";
import { StoreService } from "src/store/store.service";
import { Repository } from "typeorm";
import { ExperienceNoteDto } from "./experience-note.dto";
import { ExperienceNote } from "./experience-note.entity";

@Injectable()
export class ExperienceNoteService {

    constructor(
        @InjectRepository(ExperienceNote) private repository: Repository<ExperienceNote>,
        private storeService: StoreService,
        private clientService: ClientService,
        private collaboratorService: CollaboratorService,
    ) {
    }

    getAll() {
        return this.repository.find({});
    }

    async create(experienceNoteDto: ExperienceNoteDto) {
        const experienceNote = new ExperienceNote();
        experienceNote.note = experienceNoteDto.note;
        experienceNote.comment = experienceNoteDto.comment;
        experienceNote.client = await this.clientService.findById(experienceNoteDto.clientId);
        experienceNote.collaborator = await this.collaboratorService.findById(experienceNoteDto.collaboratorId);
        experienceNote.store = await this.storeService.findById(experienceNoteDto.storeId);
        return this.repository.save(experienceNote);
    }  

    async update(id: string, experienceNoteDto: ExperienceNoteDto) {
        await this.findById(id);
        const experienceNote = new ExperienceNote();
        experienceNote.note = experienceNoteDto.note;
        experienceNote.comment = experienceNoteDto.comment;
        experienceNote.client = await this.clientService.findById(experienceNoteDto.clientId);
        experienceNote.collaborator = await this.collaboratorService.findById(experienceNoteDto.collaboratorId);
        experienceNote.store = await this.storeService.findById(experienceNoteDto.storeId);
        return this.repository.update({ id }, experienceNote);
    }  

    private async findById(id: string) {
        const register = await this.repository.findOne(id);
        if (!register) {
            throw new NotFoundException(CodeException.NOT_FOUND_EXPERIENCE_NOTE);
        }
        return register;
    }

}