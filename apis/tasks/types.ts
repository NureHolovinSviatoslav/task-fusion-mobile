import { TaskPriority, TaskStatus } from '@/types/enums';
import { PasswordlessUser } from '../projects';

export type Task = {
  id: number;
  title: string;
  description: string;
  taskPriority: TaskPriority;
  taskStatus: TaskStatus;
  projectId: number;
  developerId: number;
  deadline: Date;
  users: PasswordlessUser[];
  createdAt: Date;
  updatedAt: Date;
};

export type TasksResponse = Task[];

export type TaskResponse = Task;
