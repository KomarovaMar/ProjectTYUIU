import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUpdateProjectDto } from 'src/common/types';
import { Project } from 'src/orm/project.entity';
import { User } from 'src/orm/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly usersService: UsersService,
  ) {}

  async create(createProjectDto: CreateUpdateProjectDto, user: any) {
    const authorUser = await this.usersService.findOneById(user.userId);
    const newProject = new Project();
    newProject.name = createProjectDto.name;
    newProject.description = createProjectDto.description;
    newProject.status = createProjectDto.status;
    newProject.author = authorUser;

    await this.projectRepository.save(newProject);

    return newProject.getDto();
  }

  async findAll(user: any) {
    return await this.projectRepository.find({
      where: { author: { id: user.userId } },
    });
  }

  async findOne(id: number) {
    return this.projectRepository.findOneBy({ id });
  }

  async update(id: number, updateProjectDto: CreateUpdateProjectDto) {
    const existedProject = await this.findOne(id);
    if (existedProject) {
      existedProject.name = updateProjectDto.name;
      existedProject.description = updateProjectDto.description;
      existedProject.status = updateProjectDto.status;

      await this.projectRepository.save(existedProject);

      return existedProject.getDto();
    }
  }

  async remove(id: number) {
    await this.projectRepository
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id })
      .execute();
  }
}