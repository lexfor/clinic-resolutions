import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ResolutionEntity } from '../entity/resolution.entity';
import { CreateResolutionFormDto } from '../dto/form/create-resolution.form.dto';
import { CreateResolutionCommandUsecase } from '../usecase/commands/create-resolution.command.usecase';
import { DeleteResolutionCommandUsecase } from '../usecase/commands/delete-resolution.command.usecase';
import { IResolutionFetcher } from '../interfaces/fetcher.interface';
import { PatientResolutionViewDto } from '../dto/view/patient.resolution.view.dto';
import { DoctorResolutionViewDto } from '../dto/view/doctor.resolution.view.dto';
import { UpdateResolutionFormDto } from '../dto/form/update-resolution.form.dto';
import { UpdateResolutionCommandUsecase } from '../usecase/commands/update-resolution.command.usecase';

@Injectable()
export class ResolutionService {
  constructor(
    private commandBus: CommandBus,
    @Inject('RESOLUTION_FETCHER')
    private appointmentFetcher: IResolutionFetcher,
  ) {}

  async createResolution(
    form: CreateResolutionFormDto,
  ): Promise<ResolutionEntity> {
    return await this.commandBus.execute(
      new CreateResolutionCommandUsecase(
        form.diagnosis,
        form.purpose,
        form.appointmentID,
      ),
    );
  }

  async updateResolution(
    id: string,
    form: UpdateResolutionFormDto,
  ): Promise<ResolutionEntity> {
    return await this.commandBus.execute(
      new UpdateResolutionCommandUsecase(id, form.diagnosis, form.purpose),
    );
  }

  async deleteResolution(id: string): Promise<ResolutionEntity[]> {
    return await this.commandBus.execute(
      new DeleteResolutionCommandUsecase(id),
    );
  }

  async getPatientResolutions(id: string): Promise<PatientResolutionViewDto[]> {
    return await this.appointmentFetcher.getPatientResolutions(id);
  }

  async getDoctorResolutions(id: string): Promise<DoctorResolutionViewDto[]> {
    return await this.appointmentFetcher.getDoctorResolutions(id);
  }

  async getResolution(id: string): Promise<ResolutionEntity> {
    return await this.appointmentFetcher.getResolution(id);
  }
}
