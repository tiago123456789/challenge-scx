import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StoreService } from './store.service';
import { Store } from './store.entity';
import { CodeException } from '../common/exceptions/code.exception';

class StoreRepositoryFake {
    public create(): void { }
    public async save(): Promise<void> { }
    public async update(): Promise<void> { }
    public async remove(): Promise<void> { }
    public async findOne(): Promise<void> { }
    public async find(): Promise<void> { }
    public async getOne(): Promise<void> { }
    public async query(): Promise<void> { }
    public async createQueryBuilder(): Promise<void> { }
}

describe('Unit tests of Store', () => {
    let storeService: StoreService;
    let storeRepository: Repository<Store>;
    const resultFake: Store = {
        id: "89fc08f9-7469-4900-9915-ee349dd009fb",
        name: "fake",
        active: true,
        is_matrix: true,
        // @ts-ignore
        matrix: {
            id: "89fc08f9-7469-4900-9915-ee349dd009db",
            name: "fake",
            active: true,
            is_matrix: false,
        }
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StoreService,
                {
                    provide: getRepositoryToken(Store),
                    useClass: StoreRepositoryFake,
                },
            ],
        }).compile();

        storeService = module.get(StoreService);
        storeRepository = module.get(getRepositoryToken(Store));
    });

    it('Should inactive store', async () => {
        // @ts-ignore
        jest.spyOn(storeRepository, "findOne").mockImplementation(() => resultFake);
        jest.spyOn(storeRepository, "update").mockImplementation(() => null);

        await storeService.inactiveUnit(resultFake.matrix.id, resultFake.id)
        expect(storeRepository.update).toHaveBeenCalledTimes(1);
    });

    it('Should throw NotFoundException when try inactive store unit no have store matrix', async () => {
        try {
            jest.spyOn(storeRepository, "findOne").mockImplementationOnce(() => null);
            await storeService.inactiveUnit(resultFake.matrix.id, resultFake.id);
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_STORE_MATRIX_OR_UNIT))
                .toBe(error.message);
        }
    });


    it('Should throw NotFoundException when try inactive store unit no exist', async () => {
        try {
            // @ts-ignore
            jest.spyOn(storeRepository, "findOne").mockImplementationOnce(() => resultFake);
            // @ts-ignore
            jest.spyOn(storeRepository, "findOne").mockImplementation(() => resultFake);
            await storeService.inactiveUnit(resultFake.matrix.id, resultFake.id);
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_STORE_MATRIX_OR_UNIT))
                .toBe(error.message);
        }
    });

    it('Should create matrix store succes', async () => {
        // @ts-ignore
        jest.spyOn(storeRepository, "save").mockImplementationOnce(() => resultFake);
        expect(await storeService.create({ name: resultFake.name, matrixId: null }))
            .toBe(resultFake);
    });

    it('Should throw NotFoundException when try create store unit no have store matrix', async () => {
        try {
            // @ts-ignore
            jest.spyOn(storeRepository, "findOne").mockImplementationOnce(() => null);
            await storeService.createUnit({
                name: resultFake.name, matrixId: resultFake.matrix.id
            });
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_STORE_MATRIX_OR_UNIT))
                .toBe(error.message);
        }
    });

    it('Should create store unit success', async () => {
        // @ts-ignore
        jest.spyOn(storeRepository, "findOne").mockImplementationOnce(() => resultFake);
        jest.spyOn(storeRepository, "save").mockImplementationOnce(() => null);
        await storeService.createUnit({
            name: resultFake.name, matrixId: resultFake.matrix.id
        })
        expect(storeRepository.save).toHaveBeenCalledTimes(1);
    });

    it('Should try update store unit success', async () => {
        // @ts-ignore
        jest.spyOn(storeRepository, "findOne").mockImplementation(() => resultFake);
        // @ts-ignore
        jest.spyOn(storeRepository, "update").mockImplementationOnce(() => null);
        await storeService.updateUnit(
            resultFake.matrix.id, resultFake.id,
            { name: resultFake.name, matrixId: resultFake.matrix.id });
        expect(storeRepository.update).toHaveBeenCalledTimes(1);
    });

    it('Should throw NotFoundException when try update store unit no have store matrix existent', async () => {
        try {
            // @ts-ignore
            jest.spyOn(storeRepository, "findOne").mockImplementationOnce(() => null);
            await storeService.updateUnit(
                resultFake.matrix.id, resultFake.id,
                { name: resultFake.name, matrixId: resultFake.matrix.id });
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_STORE_MATRIX_OR_UNIT))
                .toBe(error.message);
        }
    });

    it('Should throw NotFoundException when try update store unit no exist', async () => {
        try {
            // @ts-ignore
            jest.spyOn(storeRepository, "findOne").mockImplementationOnce(() => resultFake);
            jest.spyOn(storeRepository, "findOne").mockImplementationOnce(() => null);

            await storeService.updateUnit(
                resultFake.matrix.id, resultFake.id,
                { name: resultFake.name, matrixId: resultFake.matrix.id });
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_STORE_MATRIX_OR_UNIT))
                .toBe(error.message);
        }
    });
});
