export class UpdateResolutionCommandUsecase {
  id: string;

  diagnosis: string;

  purpose: string;

  constructor(id, diagnosis, purpose) {
    this.id = id;
    this.diagnosis = diagnosis;
    this.purpose = purpose;
  }
}
