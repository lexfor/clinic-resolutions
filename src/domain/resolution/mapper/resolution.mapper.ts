import { ResolutionEntity } from '../entity/resolution.entity';
import { IResolution } from '../interfaces/resolution.interface';

export class ResolutionMapper {
  toEntity(resolution: IResolution): ResolutionEntity {
    return new ResolutionEntity(
      resolution.diagnosis,
      resolution.purpose,
      resolution.appointment_id,
      resolution.id,
    );
  }

  toRow(resolution: ResolutionEntity): IResolution {
    return {
      id: resolution.getID,
      diagnosis: resolution.getDiagnosis,
      purpose: resolution.getPurpose,
      appointment_id: resolution.getAppointmentID,
    };
  }
}
