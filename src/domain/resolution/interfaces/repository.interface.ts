import { ResolutionEntity } from '../entity/resolution.entity';
import { IResolution } from './resolution.interface';

export interface IResolutionRepository {
  createResolution: (resolution: IResolution) => Promise<ResolutionEntity>;
  updateResolution: (
    id: string,
    diagnosis: string,
    purpose: string,
  ) => Promise<ResolutionEntity>;
  deleteResolution: (id: string) => Promise<void>;
}
