export class CreateResolutionCommandUsecase {
  diagnosis: string;

  purpose: string;

  appointmentID: string;

  constructor(diagnosis, purpose, appointmentID) {
    this.diagnosis = diagnosis;
    this.purpose = purpose;
    this.appointmentID = appointmentID;
  }
}
