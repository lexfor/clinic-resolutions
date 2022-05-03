import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { IResolutionRepository } from '../../interfaces/repository.interface';
import { UpdateResolutionCommandUsecase } from '../commands/update-resolution.command.usecase';

@CommandHandler(UpdateResolutionCommandUsecase)
export class UpdateResolutionHandlerUsecase
  implements ICommandHandler<UpdateResolutionCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('RESOLUTION_REPOSITORY')
    private readonly appointmentRepository: IResolutionRepository,
  ) {}

  async execute(command: UpdateResolutionCommandUsecase): Promise<void> {
    await this.appointmentRepository.updateResolution(
      command.id,
      command.diagnosis,
      command.purpose,
    );

    this.client.emit('update.resolution', {
      actionID: uuidv4(),
      resolutionID: command.id,
    });
  }
}
