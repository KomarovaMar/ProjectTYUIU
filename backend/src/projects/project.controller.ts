import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { ProjectsService } from './project.service';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  import { CreateUpdateProjectDto } from 'src/common/types';
  
  @Controller('projects')
  export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createProjectDto: CreateUpdateProjectDto, @Req() request) {
      return this.projectsService.create(createProjectDto, request.user);
    }
  
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() request) {
      return this.projectsService.findAll(request.user);
    }
  
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
      return this.projectsService.findOne(+id);
    }
  
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateProjectDto: CreateUpdateProjectDto) {
      return this.projectsService.update(+id, updateProjectDto);
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
      return this.projectsService.remove(+id);
    }
  }