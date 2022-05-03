import { Inject, Injectable } from '@nestjs/common';
import { IResolutionFetcher } from '../interfaces/fetcher.interface';
import { ResolutionEntity } from '../entity/resolution.entity';
import { PatientResolutionViewDto } from '../dto/view/patient.resolution.view.dto';
import { DoctorResolutionViewDto } from '../dto/view/doctor.resolution.view.dto';

@Injectable()
export class ResolutionFetcher implements IResolutionFetcher {
  constructor(@Inject('DATABASE_POOL') private pool) {}

  async getDoctorResolutions(id: string): Promise<DoctorResolutionViewDto[]> {
    const sql = `SELECT 
                    users.first_name as firstname,
                    users.last_name as lastname,
                    appointments.date,
                    appointments.complaints,
                    resolutions.id,
                    resolutions.diagnosis,
                    resolutions.purpose
                    FROM resolutions
                    INNER JOIN appointments ON resolutions.appointment_id = appointments.id
                    INNER JOIN doctors ON appointments.doctor_id = doctors.id
                    INNER JOIN users ON appointments.patient_id = users.id
                    WHERE doctors.user_id = $1`;
    const { rows } = await this.pool.query(sql, [id]);
    return rows;
  }

  async getPatientResolutions(id: string): Promise<PatientResolutionViewDto[]> {
    const sql = `SELECT 
                    resolutions.diagnosis,
                    resolutions.purpose,
                    appointments.date,
                    specializations.name as specialization
                    FROM resolutions
                    INNER JOIN appointments ON resolutions.appointment_id = appointments.id
                    INNER JOIN doctors ON appointments.doctor_id = doctors.id
                    INNER JOIN specializations ON doctors.specialization_id = specializations.id
                    WHERE appointments.patient_id = $1`;
    const { rows } = await this.pool.query(sql, [id]);
    return rows;
  }

  async getResolution(id: string): Promise<ResolutionEntity> {
    const sql = `SELECT resolutions.* FROM resolutions
                    WHERE resolutions.id = $1`;
    const { rows } = await this.pool.query(sql, [id]);
    const [resolution] = rows;
    return resolution;
  }
}
