import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResolutionService } from '../services/resolution.service';
import { CreateResolutionFormDto } from '../dto/form/create-resolution.form.dto';
import { ResolutionEntity } from '../entity/resolution.entity';
import { PatientResolutionViewDto } from '../dto/view/patient.resolution.view.dto';
import { DoctorResolutionViewDto } from '../dto/view/doctor.resolution.view.dto';
import { UpdateResolutionFormDto } from '../dto/form/update-resolution.form.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('resolutions')
export class ResolutionController {
  constructor(private readonly resolutionService: ResolutionService) {}

  @Post()
  async createResolution(
    @Body() form: CreateResolutionFormDto,
    @Request() req,
  ) {
    if (req.user.role === 'doctor') {
      return await this.resolutionService.createResolution(form);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Put(':id')
  async updateResolution(
    @Param('id') id: string,
    @Body() form: UpdateResolutionFormDto,
    @Request() req,
  ) {
    if (req.user.role === 'doctor') {
      return await this.resolutionService.updateResolution(id, form);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  async deleteResolution(@Param('id') id: string, @Request() req) {
    if (req.user.role === 'doctor') {
      return await this.resolutionService.deleteResolution(id);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Get('patient/:id')
  async getPatientResolutions(
    @Param('id') id: string,
    @Request() req,
  ): Promise<PatientResolutionViewDto[]> {
    if (req.user.role === 'patient') {
      return await this.resolutionService.getPatientResolutions(id);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Get('doctor/:id')
  async getDoctorResolutions(
    @Param('id') id: string,
    @Request() req,
  ): Promise<DoctorResolutionViewDto[]> {
    if (req.user.role === 'doctor') {
      return await this.resolutionService.getDoctorResolutions(id);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }

  @Get(':id')
  async getResolution(
    @Param('id') id: string,
    @Request() req,
  ): Promise<ResolutionEntity> {
    if (req.user.role === 'doctor') {
      return await this.resolutionService.getResolution(id);
    } else {
      throw new HttpException('wrong role', HttpStatus.FORBIDDEN);
    }
  }
}
