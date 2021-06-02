import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from 'src/client/client.module';
import { CollaboratorModule } from 'src/collaborator/collaborator.module';
import { StoreModule } from 'src/store/store.module';
import { ExperienceNoteController } from './experience-note.controller';
import { ExperienceNote } from './experience-note.entity';
import { ExperienceNoteService } from './experience-note.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExperienceNote]),
    ClientModule, 
    CollaboratorModule,
    StoreModule
  ],
  controllers: [ExperienceNoteController],
  providers: [ExperienceNoteService],
})
export class ExperienceNoteModule {}
