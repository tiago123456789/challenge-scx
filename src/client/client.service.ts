import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessException } from "../common/exceptions/business.exception";
import { CodeException } from "../common/exceptions/code.exception";
import { NotFoundException } from "../common/exceptions/not-found.exception";
import { Repository } from "typeorm";
import { Client } from "./client.entity";

@Injectable()
export class ClientService {

    constructor(
        @InjectRepository(Client) private repository: Repository<Client>) {
    }

    async create(client: Client) {
        if (client.email) {
            await this.checkIfEmailUsed(
                client.email
            );
        }

        if (client.cellphone) {
            await this.checkIfCellphoneUsed(
                client.cellphone
            );
        }
        return this.repository.save(client);
    }

    async update(id: string, client: Client) {
        await this.findById(id);
        const dataModified = {...client};
        delete dataModified.id;

        if (dataModified.email) {
            await this.checkIfEmailUsedPerIdDifferentMencionated(
                dataModified.email, id
            );
        }

        if (dataModified.cellphone) {
            await this.checkIfCellphoneUsedPerIdDifferentMencionated(
                dataModified.cellphone, id
            );
        }
        return this.repository.update({ id }, dataModified);
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
            throw new NotFoundException(CodeException.NOT_FOUND_CLIENT);
        }
        return register;
    }

    private async checkIfEmailUsedPerIdDifferentMencionated(email: string, id: string) {
        const register = await this.repository.query("email = ? AND id != ?", [ email, id ])
        if (register) {
            throw new BusinessException(CodeException.EMAIL_USED_ANOTHER_CLIENT);
        }
    }

    private async checkIfCellphoneUsedPerIdDifferentMencionated(cellphone: string, id: string) {
        const register = this.repository.query("cellphone = ? AND id != ?", [ cellphone, id ])
        if (register) {
            throw new BusinessException(CodeException.CELLPHONE_USED_ANOTHER_CLIENT);
        }
                
    }

    private async checkIfEmailUsed(email: string) {
        const register = await this.repository.query("email = ?", [email]);

        if (register) {
            throw new BusinessException(CodeException.EMAIL_USED_ANOTHER_CLIENT);
        }

    }

    private async checkIfCellphoneUsed(cellphone: string) {
        const register = await this.repository.query("cellphone = :?", [cellphone]);

        if (register) {
            throw new BusinessException(CodeException.CELLPHONE_USED_ANOTHER_CLIENT);
        }
    }
}