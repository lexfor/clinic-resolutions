import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { IResolutionRepository } from '../../interfaces/repository.interface';
import { DeleteResolutionCommandUsecase } from '../commands/delete-resolution.command.usecase';

@CommandHandler(DeleteResolutionCommandUsecase)
export class DeleteResolutionHandlerUsecase
  implements ICommandHandler<DeleteResolutionCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('RESOLUTION_REPOSITORY')
    private readonly appointmentRepository: IResolutionRepository,
  ) {}

  async execute(command: DeleteResolutionCommandUsecase): Promise<void> {
    await this.appointmentRepository.deleteResolution(command.resolutionID);

    this.client.emit('delete.resolution', {
      actionID: uuidv4(),
      appointmentID: command.resolutionID,
    });
  }
}
