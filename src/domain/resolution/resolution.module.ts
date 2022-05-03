import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateResolutionHandlerUsecase } from './usecase/handlers/create-resolution.handler.usecase';
import { poolFactory } from '../../factories/database.factory';
import { ResolutionRepository } from './entity/resolution.repository';
import { ResolutionFetcher } from './view/resolution.fetcher';
import { ResolutionMapper } from './mapper/resolution.mapper';
import { ResolutionService } from './services/resolution.service';
import { ResolutionController } from './controllers/resolution.controller';
import { DeleteResolutionHandlerUsecase } from './usecase/handlers/delete-resolution.handler.usecase';
import { UpdateResolutionHandlerUsecase } from './usecase/handlers/update-resolution.handler.usecase';

const handlers = [
  CreateResolutionHandlerUsecase,
  UpdateResolutionHandlerUsecase,
  DeleteResolutionHandlerUsecase,
];

@Module({
  imports: [ConfigModule.forRoot(), CqrsModule],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    {
      provide: 'RESOLUTION_REPOSITORY',
      useClass: ResolutionRepository,
    },
    {
      provide: 'RESOLUTION_FETCHER',
      useClass: ResolutionFetcher,
    },
    ResolutionMapper,
    ResolutionService,
    ...handlers,
  ],
  controllers: [ResolutionController],
  exports: [ResolutionMapper],
})
export class ResolutionModule {}
