import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class PatientResolutionViewDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly date: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly diagnosis?: string;

  @ApiModelProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly purpose: string;

  @ApiModelProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly specialization: string;
}
