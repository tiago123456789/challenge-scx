import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { CommonModule } from './common/common.module';
import { ExperienceNoteModule } from './experience-note/experience-note.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<any> => {
        return {
          type: configService.get("DB_TYPE"),
          host: configService.get("DB_HOST"),
          port: configService.get("DB_PORT"),
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_NAME"),
          autoLoadEntities: true,
          synchronize: true,
          logging: configService.get("ENV") == "dev" ? true : false
        };
      }
    }),
    CollaboratorModule,
    ClientModule,
    StoreModule,
    ExperienceNoteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
