import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CollaboratorService } from './collaborador.service';
import { Collaborator } from './collaborator.entity';
import { CodeException } from '../common/exceptions/code.exception';

class CollaboratorRepositoryFake {
    public create(): void { }
    public async save(): Promise<void> { }
    public async update(): Promise<void> { }
    public async remove(): Promise<void> { }
    public async findOne(): Promise<void> { }
    public async find(): Promise<void> { }
    public async getOne(): Promise<void> { }
    public async query(): Promise<void> { }
}

describe('Unit tests of collaborator', () => {
    let collaboratorService: CollaboratorService;
    let collaboratorRepository: Repository<Collaborator>;
    const resultFake: Collaborator = {
        id: "89fc08f9-7469-4900-9915-ee349dd009fb",
        name: "fake",
        active: true
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CollaboratorService,
                {
                    provide: getRepositoryToken(Collaborator),
                    useClass: CollaboratorRepositoryFake,
                },
            ],
        }).compile();

        collaboratorService = module.get(CollaboratorService);
        collaboratorRepository = module.get(getRepositoryToken(Collaborator));
    });

    it('Should return all 2 itens', async () => {
        const resultsFake = [
            {
                id: "89fc08f9-7469-4900-9915-ee349dd009fb",
                name: "fake",
            },
            {
                id: "89fc08f9-7469-4900-9915-ee349dd009fb",
                name: "fake",
            }
        ];

        // @ts-ignore
        jest.spyOn(collaboratorRepository, "find").mockImplementation(() => resultsFake);

        expect(await collaboratorService.getAll()).toBe(resultsFake);
    });

    it('Should inactive collaborator', async () => {
        // @ts-ignore
        jest.spyOn(collaboratorRepository, "findOne").mockImplementation(() => resultFake);
        jest.spyOn(collaboratorRepository, "update").mockImplementation(() => null);

        await collaboratorService.inactive(resultFake.id)
        expect(collaboratorRepository.update).toHaveBeenCalledTimes(1);
    });

    it('Should throw NotFoundException when try inactive collaborator not exist', async () => {
        try {
            jest.spyOn(collaboratorRepository, "findOne").mockImplementation(() => null);
            await collaboratorService.inactive(resultFake.id);
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_COLLABORATOR))
                .toBe(error.message);
        }
    });


    it('Should throw NotFoundException when try update collaborator not exist', async () => {
        try {
            // @ts-ignore
            jest.spyOn(collaboratorRepository, "findOne").mockImplementation(() => null);
            await collaboratorService.update(resultFake.id, resultFake);
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_COLLABORATOR))
                .toBe(error.message);
        }
    });

    it('Should try update collaborator success', async () => {
        const resultFake: Collaborator = {
            id: "89fc08f9-7469-4900-9915-ee349dd009fb",
            name: "fake",
            active: true
        };
        // @ts-ignore
        jest.spyOn(collaboratorRepository, "findOne").mockImplementation(() => resultFake);
        // @ts-ignore
        jest.spyOn(collaboratorRepository, "update").mockImplementationOnce(() => null);
        await collaboratorService.update(resultFake.id, resultFake);
        expect(collaboratorRepository.update).toHaveBeenCalledTimes(1);
    });
});
