import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class DoctorResolutionViewDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly lastname: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly date: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly complaints: string;

  @ApiModelProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly diagnosis: string;

  @ApiModelProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  readonly purpose: string;
}
