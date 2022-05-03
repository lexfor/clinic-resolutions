import { ResolutionEntity } from '../entity/resolution.entity';
import { PatientResolutionViewDto } from '../dto/view/patient.resolution.view.dto';
import { DoctorResolutionViewDto } from '../dto/view/doctor.resolution.view.dto';

export interface IResolutionFetcher {
  getDoctorResolutions: (id: string) => Promise<DoctorResolutionViewDto[]>;
  getPatientResolutions: (id: string) => Promise<PatientResolutionViewDto[]>;
  getResolution: (id: string) => Promise<ResolutionEntity>;
}
