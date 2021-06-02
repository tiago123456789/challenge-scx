import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessException } from "src/common/exceptions/business.exception";
import { CodeException } from "src/common/exceptions/code.exception";
import { NotFoundException } from "src/common/exceptions/not-found.exception";
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
        const queryBuilder = this.repository.createQueryBuilder("clients");
        const register = await queryBuilder.where("email = :email", { email })
                           .andWhere("id != :id", { id })
                           .getOne();

        if (register) {
            throw new BusinessException(CodeException.EMAIL_USED_ANOTHER_CLIENT);
        }

    }

    private async checkIfCellphoneUsedPerIdDifferentMencionated(cellphone: string, id: string) {
        const queryBuilder = this.repository.createQueryBuilder("clients");
        const register = await queryBuilder.where("cellphone = :cellphone", { cellphone })
                           .andWhere("id != :id", { id })
                           .getOne();

        if (register) {
            throw new BusinessException(CodeException.CELLPHONE_USED_ANOTHER_CLIENT);
        }
                
    }

    private async checkIfEmailUsed(email: string) {
        const queryBuilder = this.repository.createQueryBuilder("clients");
        const register = await queryBuilder.where("email = :email", { email })
                           .getOne();

        if (register) {
            throw new BusinessException(CodeException.EMAIL_USED_ANOTHER_CLIENT);
        }

    }

    private async checkIfCellphoneUsed(cellphone: string) {
        const queryBuilder = this.repository.createQueryBuilder("clients");
        const register = await queryBuilder.where("cellphone = :cellphone", { cellphone })
                           .getOne();

        if (register) {
            throw new BusinessException(CodeException.CELLPHONE_USED_ANOTHER_CLIENT);
        }
    }
}