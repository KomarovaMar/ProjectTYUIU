import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    VersionColumn,
    ManyToOne,
    DeleteDateColumn,
  } from 'typeorm';
  
  import { User } from './user.entity';
  import { ProjectDto, ProjectStatus } from 'src/common/types';
  
  @Entity()
  export class Project {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: '' })
    name: string;
  
    @Column({ default: '' })
    description: string;
  
    @Column({ default: 'active' })
    
    status: ProjectStatus;
  
    @ManyToOne(() => User, { eager: true })
    author: User;
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
  
    @DeleteDateColumn()
    deletedAt?: Date;
  
    @VersionColumn()
    version!: number;
  
    getDto(): ProjectDto {
      return {
        id: this.id,
        name: this.name,
        description: this.description,
        status: this.status,
        author: this.author.getSecuredDto(),
        createdAt: this.createdAt,
      };
    }
  }