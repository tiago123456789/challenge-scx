import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CodeException } from "src/common/exceptions/code.exception";
import { NotFoundException } from "src/common/exceptions/not-found.exception";
import { Repository } from "typeorm";
import { Collaborator } from "./collaborator.entity";

@Injectable()
export class CollaboratorService {

    constructor(
        @InjectRepository(Collaborator) private repository: Repository<Collaborator>) {
    }

    create(collabolator: Collaborator) {
        return this.repository.save(collabolator);
    }

    async update(id: string, collaborator: Collaborator) {
        await this.findById(id);
        return this.repository.update({ id }, { name: collaborator.name });
    }

    getAll(): Promise<any> {
        return this.repository.find({ active: true });
    }

    async inactive(id: string) {
        await this.findById(id);
        return this.repository.update({ id }, { active: false });
    }

    async findById(id: string)  {
        const register = await this.repository.findOne(id);
        if (!register) {
            throw new NotFoundException(CodeException.NOT_FOUND_COLLABORATOR);
        }
        return register;
    }
}