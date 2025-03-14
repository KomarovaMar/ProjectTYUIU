import { api } from './axios';
import {
  CreateUpdateProjectDto,
  ProjectDto,
  SecuredUser,
} from '../../../backend/src/common/types';


export async function getProjects(): Promise<ProjectDto[]> {
  const response = await api.get('/projects');
  if (response.status === 200) {
    return response.data;
  }
  return [];
}


export async function createProject(
  newProject: CreateUpdateProjectDto
): Promise<string | undefined> {
  const response = await api.post('/projects', newProject);
  if (response.status === 201) {
    return response.data.id; // Предполагаем, что сервер возвращает ID созданного проекта
  }
  return undefined;
}


export async function updateProject(
  id: number,
  payload: CreateUpdateProjectDto
): Promise<SecuredUser | undefined> {
  const response = await api.patch('/projects/' + id, payload);
  if (response.status === 200) {
    return response.data;
  }
  return undefined;
}


export async function deleteProject(
  id: number
): Promise<SecuredUser | undefined> {
  const response = await api.delete('/projects/' + id);
  if (response.status === 200) {
    return response.data;
  }
  return undefined;
}