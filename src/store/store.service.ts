import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BusinessException } from "src/common/exceptions/business.exception";
import { CodeException } from "src/common/exceptions/code.exception";
import { NotFoundException } from "src/common/exceptions/not-found.exception";
import { Repository } from "typeorm";
import { StoreDto } from "./store.dto";
import { Store } from "./store.entity";

@Injectable()
export class StoreService {

    constructor(
        @InjectRepository(Store) private repository: Repository<Store>) {
    }
    
    async createUnit(storeDto: StoreDto) {
        const store = new Store();
        store.name = storeDto.name;
        if (storeDto.matrixId) {
            store.matrix = await this.findById(storeDto.matrixId);
        }
        store.is_matrix = false;
        return this.repository.save(store);
    }

    async create(storeDto: StoreDto) {
        const store = new Store();
        store.name = storeDto.name;
        store.is_matrix = true;
        return this.repository.save(store);
    }

    async getAllUnits(matrixId: string) {
        await this.findById(matrixId);
        return this.repository
            .createQueryBuilder("stores")
            .innerJoin("stores.matrix", "matrix")
            .where("matrix.id = :matrixId", { matrixId })
            .andWhere("stores.active = true")
            .getMany();


    }

    async updateUnit(matrixId: string, unitId: string, store: StoreDto) {
        await this.findById(matrixId);
        await this.findById(unitId);
        return this.repository.update({ id: unitId }, { name: store.name });
    }

    async inactiveUnit(matrixId: string, unitId: string) {
        await this.findById(matrixId);
        await this.findById(unitId);
        return this.repository.update({ id: unitId }, { active: false });
    }

    async findById(id: string)  {
        const register = await this.repository.findOne(id);
        if (!register) {
            throw new NotFoundException(CodeException.NOT_FOUND_STORE_MATRIX_OR_UNIT);
        }
        return register;
    }

}