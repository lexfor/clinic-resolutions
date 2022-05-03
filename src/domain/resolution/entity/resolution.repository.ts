import { Inject, Injectable } from '@nestjs/common';
import { ResolutionMapper } from '../mapper/resolution.mapper';
import { ResolutionEntity } from './resolution.entity';
import { IResolutionRepository } from '../interfaces/repository.interface';
import { IResolution } from '../interfaces/resolution.interface';

@Injectable()
export class ResolutionRepository implements IResolutionRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: ResolutionMapper,
  ) {}

  async createResolution(resolution: IResolution): Promise<ResolutionEntity> {
    const sql = `INSERT INTO resolutions (
                 id, 
                 diagnosis,
                 purpose,
                 appointment_id
                 ) VALUES ($1, $2, $3, $4);`;
    await this.pool.query(sql, [
      resolution.id,
      resolution.diagnosis,
      resolution.purpose,
      resolution.appointment_id,
    ]);

    return this.mapper.toEntity(resolution);
  }

  async updateResolution(
    id: string,
    diagnosis: string,
    purpose: string,
  ): Promise<ResolutionEntity> {
    const sql = `UPDATE resolutions 
                 SET diagnosis = $2, purpose = $3
                 WHERE id = $1;`;
    console.log(id, diagnosis, purpose);
    const { rows } = await this.pool.query(sql, [id, diagnosis, purpose]);
    console.log(rows);
    return this.mapper.toEntity(rows);
  }

  async deleteResolution(id: string): Promise<void> {
    const sql = `DELETE FROM resolutions WHERE id = $1`;
    await this.pool.query(sql, [id]);
  }
}
