import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UpdateResolutionFormDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly diagnosis: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly purpose?: string;
}
