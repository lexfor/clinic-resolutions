import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UpdateResolutionFormDto } from './update-resolution.form.dto';

export class CreateResolutionFormDto extends UpdateResolutionFormDto {
  @ApiModelProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly appointmentID: string;
}
