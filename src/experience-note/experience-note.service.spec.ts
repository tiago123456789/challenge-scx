import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CodeException } from '../common/exceptions/code.exception';
import { ExperienceNoteService } from './experience-note.service';
import { ExperienceNote } from './experience-note.entity';
import { Client } from '../client/client.entity';
import { Store } from '../store/store.entity';
import { Collaborator } from '../collaborator/collaborator.entity';
import { ClientService } from '../client/client.service';
import { StoreService } from '../store/store.service';
import { CollaboratorService } from '../collaborator/collaborador.service';
import { ExperienceNoteDto } from './experience-note.dto';

describe('Unit tests of ExperienceNote', () => {
    const idFake = "89fc08f9-7469-4900-9915-ee349dd009fb";
    const resultFake: ExperienceNoteDto = {
        clientId: "89fc08f9-7469-4900-9915-ee349dd009cc",
        collaboratorId: "89fc08f9-7469-4900-9915-ee349dd0abc55",
        storeId: "89fc08f9-7469-4900-9915-ee349dd08426",
        note: 5,
        comment: "Fake comment"
    };

    let clientRepository;
    let clientService;
    let storeRepository;
    let storeService;
    let collaboratorRepository;
    let collaboratorService;
    let experienceNoteRepository;

    beforeEach(() => {
        clientRepository = new Repository<Client>();
        clientService = new ClientService(clientRepository);
        storeRepository = new Repository<Store>();
        storeService = new StoreService(storeRepository);
        collaboratorRepository = new Repository<Collaborator>();
        collaboratorService = new CollaboratorService(collaboratorRepository);
        experienceNoteRepository = new Repository<ExperienceNote>();
    })

    it('Should throw NotFoundException when try update experience note not exist', async () => {
        try {
            jest.spyOn(experienceNoteRepository, "findOne").mockImplementation(() => null);
            const experienceNoteService = new ExperienceNoteService(
                experienceNoteRepository, storeService, clientService, collaboratorService
            );

            await experienceNoteService.update(idFake, resultFake)
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_EXPERIENCE_NOTE))
                .toBe(error.message);
        }
    });

    it('Should throw NotFoundException when try update experience note with client not exist', async () => {
        try {
            jest.spyOn(experienceNoteRepository, "findOne").mockImplementation(() => resultFake);
            jest.spyOn(clientRepository, "findOne").mockImplementation(() => null);

            const experienceNoteService = new ExperienceNoteService(
                experienceNoteRepository, storeService, clientService, collaboratorService
            );

            await experienceNoteService.update(idFake, resultFake)
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_CLIENT))
                .toBe(error.message);
        }
    });

    it('Should throw NotFoundException when try update experience note with collaborator not exist', async () => {
        try {
            jest.spyOn(experienceNoteRepository, "findOne").mockImplementation(() => resultFake);
            jest.spyOn(clientRepository, "findOne").mockImplementation(() => resultFake);
            jest.spyOn(collaboratorRepository, "findOne").mockImplementation(() => null);
            const experienceNoteService = new ExperienceNoteService(
                experienceNoteRepository, storeService, clientService, collaboratorService
            );

            await experienceNoteService.update(idFake, resultFake)
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_COLLABORATOR))
                .toBe(error.message);
        }
    });

    it('Should throw NotFoundException when try update experience note with store not exist', async () => {
        try {
            jest.spyOn(clientRepository, "findOne").mockImplementation(() => resultFake);
            jest.spyOn(collaboratorRepository, "findOne").mockImplementation(() => resultFake);
            jest.spyOn(storeRepository, "findOne").mockImplementation(() => null);

            const experienceNoteService = new ExperienceNoteService(
                experienceNoteRepository, storeService, clientService, collaboratorService
            );

            await experienceNoteService.create(resultFake);
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_STORE_MATRIX_OR_UNIT))
                .toBe(error.message);
        }
    });

    it('Should update experience note with success', async () => {
        jest.spyOn(clientRepository, "findOne").mockImplementation(() => resultFake);
        jest.spyOn(collaboratorRepository, "findOne").mockImplementation(() => resultFake);
        jest.spyOn(storeRepository, "findOne").mockImplementation(() => resultFake);
        jest.spyOn(experienceNoteRepository, "findOne").mockImplementation(() => resultFake);
        jest.spyOn(experienceNoteRepository, "update").mockImplementation(() => null);

        const experienceNoteService = new ExperienceNoteService(
            experienceNoteRepository, storeService, clientService, collaboratorService
        );

        await experienceNoteService.update(idFake, resultFake);
        expect(experienceNoteRepository.update).toHaveBeenCalledTimes(1);
    });

    it('Should throw NotFoundException when try create experience note with client not exist', async () => {
        try {
            jest.spyOn(clientRepository, "findOne").mockImplementation(() => null);
            const experienceNoteService = new ExperienceNoteService(
                experienceNoteRepository, storeService, clientService, collaboratorService
            );

            await experienceNoteService.create(resultFake)
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_CLIENT))
                .toBe(error.message);
        }
    });

    it('Should throw NotFoundException when try create experience note with collaborator not exist', async () => {
        try {
            jest.spyOn(clientRepository, "findOne").mockImplementation(() => resultFake);
            jest.spyOn(collaboratorRepository, "findOne").mockImplementation(() => null);

            const experienceNoteService = new ExperienceNoteService(
                experienceNoteRepository, storeService, clientService, collaboratorService
            );

            await experienceNoteService.create(resultFake)
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_COLLABORATOR))
                .toBe(error.message);
        }
    });

    it('Should throw NotFoundException when try create experience note with store not exist', async () => {
        try {
            jest.spyOn(clientRepository, "findOne").mockImplementation(() => resultFake);
            jest.spyOn(collaboratorRepository, "findOne").mockImplementation(() => resultFake);
            jest.spyOn(storeRepository, "findOne").mockImplementation(() => null);

            const experienceNoteService = new ExperienceNoteService(
                experienceNoteRepository, storeService, clientService, collaboratorService
            );

            await experienceNoteService.create(resultFake)
        } catch (error) {
            expect(CodeException.getMessageByKey(CodeException.NOT_FOUND_STORE_MATRIX_OR_UNIT))
                .toBe(error.message);
        }
    });

    it('Should create experience note with success', async () => {
        jest.spyOn(clientRepository, "findOne").mockImplementation(() => resultFake);
        jest.spyOn(collaboratorRepository, "findOne").mockImplementation(() => resultFake);
        jest.spyOn(storeRepository, "findOne").mockImplementation(() => resultFake);
        jest.spyOn(experienceNoteRepository, "save").mockImplementation(() => null);

        const experienceNoteService = new ExperienceNoteService(
            experienceNoteRepository, storeService, clientService, collaboratorService
        );

        await experienceNoteService.create(resultFake);
        expect(experienceNoteRepository.save).toHaveBeenCalledTimes(1);
    });


});
