import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './client.service';
import { CollaboratorController } from './client.controller';
import { Client } from './client.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [CollaboratorController],
  providers: [ClientService],
})
export class ClientModule {}
