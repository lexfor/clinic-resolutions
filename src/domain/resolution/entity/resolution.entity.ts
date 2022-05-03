import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class ResolutionEntity {
  @ApiProperty()
  private readonly id: string;
  @ApiProperty()
  private readonly diagnosis: string;
  @ApiProperty()
  private readonly purpose: string;
  @ApiProperty()
  private readonly appointmentID: string;

  constructor(
    diagnosis: string,
    purpose: string,
    appointmentID: string,
    id: string = uuidv4(),
  ) {
    this.diagnosis = diagnosis;
    this.purpose = purpose;
    this.appointmentID = appointmentID;
    this.id = id;
  }

  get getID(): string {
    return this.id;
  }

  get getDiagnosis(): string {
    return this.diagnosis;
  }

  get getPurpose(): string {
    return this.purpose;
  }

  get getAppointmentID(): string {
    return this.appointmentID;
  }
}
