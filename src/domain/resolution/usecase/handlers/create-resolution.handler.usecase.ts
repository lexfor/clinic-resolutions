import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { CreateResolutionCommandUsecase } from '../commands/create-resolution.command.usecase';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { IResolutionRepository } from '../../interfaces/repository.interface';
import { IResolution } from '../../interfaces/resolution.interface';

@CommandHandler(CreateResolutionCommandUsecase)
export class CreateResolutionHandlerUsecase
  implements ICommandHandler<CreateResolutionCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('RESOLUTION_REPOSITORY')
    private readonly appointmentRepository: IResolutionRepository,
  ) {}

  async execute(command: CreateResolutionCommandUsecase): Promise<void> {
    const resolution: IResolution = {
      id: uuidv4(),
      diagnosis: command.diagnosis,
      purpose: command.purpose,
      appointment_id: command.appointmentID,
    };

    await this.appointmentRepository.createResolution(resolution);

    this.client.emit('create.resolution', {
      actionID: uuidv4(),
      resolutionID: resolution.id,
    });
  }
}
