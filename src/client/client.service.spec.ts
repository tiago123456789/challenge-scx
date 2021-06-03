import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CodeException } from '../common/exceptions/code.exception';

class ClientRepositoryFake {
    public create(): void { }
    public async save(): Promise<void> { }
    public async update(): Promise<void> { }
    public async remove(): Promise<void> { }
    public async findOne(): Promise<void> { }
    public async find(): Promise<void> { }
    public async getOne(): Promise<void> { }
    public async query(): Promise<void> { }
}

describe('Unit tests of client', () => {
    let clientService: ClientService;
    let clientRepository: Repository<Client>;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClientService,
                {
                    provide: getRepositoryToken(Client),
                    useClass: ClientRepositoryFake,
                },
            ],
        }).compile();

        clientService = module.get(ClientService);
        clientRepository = module.get(getRepositoryToken(Client));
    });

    it('Should return all 3 itens', async () => {
        const resultsFake = [
            {
                id: "89fc08f9-7469-4900-9915-ee349dd009fb",
                name: "fake",
                email: "fake@gmail.com",
                cpf: "715.312.750-01",
                cellphone: "(89) 18291-6114"
            },
            {
                id: "89fc08f9-7469-4900-9915-ee349dd009fb",
                name: "fake",
                email: "fake@gmail.com",
                cpf: "715.312.750-01",
                cellphone: "(89) 18291-6114"
            },
            {
                id: "89fc08f9-7469-4900-9915-ee349dd009fb",
                name: "fake",
                email: "fake@gmail.com",
                cpf: "715.312.750-01",
                cellphone: "(89) 18291-6114"
            }
        ];

        // @ts-ignore
        jest.spyOn(clientRepository, "find").mockImplementation(() => resultsFake);

        expect(await clientService.getAll()).toBe(resultsFake);
    });

    it('Should inactive client', async () => {
        const resultFake = {
            id: "89fc08f9-7469-4900-9915-ee349dd009fb",
            name: "fake",
            email: "fake@gmail.com",
            cpf: "715.312.750-01",
            cellphone: "(89) 18291-6114"
        };

        // @ts-ignore
        jest.spyOn(clientRepository, "findOne").mockImplementation(() => resultFake);
        jest.spyOn(clientRepository, "update").mockImplementation(() => null);

        await clientService.inactive(resultFake.id)
        expect(clientRepository.update).toHaveBeenCalledTimes(1);
    });

    it('Should throw NotFoundException when try inactive client not exist', async () => {
        try {
            jest.spyOn(clientRepository, "findOne").mockImplementation(() => null);
            await clientService.getAll();
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_CLIENT))
                .toBe(error.message);
        }
    });

    it('Should throw BusinessException when try create client with email used', async () => {
        try {
            const resultFake: Client = {
                id: "89fc08f9-7469-4900-9915-ee349dd009fb",
                name: "fake",
                email: "fake@gmail.com",
                cpf: "715.312.750-01",
                cellphone: "(89) 18291-6114",
                active: true
            };
            // @ts-ignore
            jest.spyOn(clientRepository, "query").mockImplementation(() => resultFake);
            await clientService.create(resultFake);
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.EMAIL_USED_ANOTHER_CLIENT))
                .toBe(error.message);
        }
    });

    it('Should throw BusinessException when try create client with cellphone used', async () => {
        try {
            const resultFake: Client = {
                id: "89fc08f9-7469-4900-9915-ee349dd009fb",
                name: "fake",
                email: "fake@gmail.com",
                cpf: "715.312.750-01",
                cellphone: "(89) 18291-6114",
                active: true
            };
            jest.spyOn(clientRepository, "query").mockImplementationOnce(() => null);
            // @ts-ignore
            jest.spyOn(clientRepository, "query").mockImplementation(() => resultFake);
            await clientService.create(resultFake);
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.CELLPHONE_USED_ANOTHER_CLIENT))
                .toBe(error.message);
        }
    });


    it('Should try create client success', async () => {
        const resultFake: Client = {
            id: "89fc08f9-7469-4900-9915-ee349dd009fb",
            name: "fake",
            email: "fake@gmail.com",
            cpf: "715.312.750-01",
            cellphone: "(89) 18291-6114",
            active: true
        };
        jest.spyOn(clientRepository, "save").mockImplementationOnce(() => null);
        await clientService.create(resultFake);
        expect(clientRepository.save).toHaveBeenCalledTimes(1);
    });

    it('Should throw BusinessException when try update client with email used', async () => {
        try {
            const resultFake: Client = {
                id: "89fc08f9-7469-4900-9915-ee349dd009fb",
                name: "fake",
                email: "fake@gmail.com",
                cpf: "715.312.750-01",
                cellphone: "(89) 18291-6114",
                active: true
            };

            // @ts-ignore
            jest.spyOn(clientRepository, "findOne").mockImplementation(() => resultFake);
            // @ts-ignore
            jest.spyOn(clientRepository, "query").mockImplementation(() => resultFake);

            await clientService.update(resultFake.id, resultFake);
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.EMAIL_USED_ANOTHER_CLIENT))
                .toBe(error.message);
        }
    });

    it('Should throw BusinessException when try update client with cellphone used', async () => {
        try {
            const resultFake: Client = {
                id: "89fc08f9-7469-4900-9915-ee349dd009fb",
                name: "fake",
                email: "fake@gmail.com",
                cpf: "715.312.750-01",
                cellphone: "(89) 18291-6114",
                active: true
            };

            // @ts-ignore
            jest.spyOn(clientRepository, "findOne").mockImplementation(() => resultFake);
            // @ts-ignore
            jest.spyOn(clientRepository, "query").mockImplementationOnce(() => null);
            // @ts-ignore
            jest.spyOn(clientRepository, "query").mockImplementation(() => resultFake);
            await clientService.update(resultFake.id, resultFake);
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.CELLPHONE_USED_ANOTHER_CLIENT))
                .toBe(error.message);
        }
    });

    it('Should try update client success', async () => {
        const resultFake: Client = {
            id: "89fc08f9-7469-4900-9915-ee349dd009fb",
            name: "fake",
            email: "fake@gmail.com",
            cpf: "715.312.750-01",
            cellphone: "(89) 18291-6114",
            active: true
        };
        // @ts-ignore
        jest.spyOn(clientRepository, "findOne").mockImplementation(() => resultFake);
        // @ts-ignore
        jest.spyOn(clientRepository, "query").mockImplementation(() => null);
        jest.spyOn(clientRepository, "update").mockImplementationOnce(() => null);
        await clientService.update(resultFake.id, resultFake);
        expect(clientRepository.update).toHaveBeenCalledTimes(1);
    });
});
