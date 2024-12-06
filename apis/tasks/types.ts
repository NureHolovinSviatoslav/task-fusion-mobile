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

export type TaskAction = {
  id: number;
  title: string;
  taskId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: PasswordlessUser;
};

export type TaskActionsResponse = TaskAction[];

export type TaskComment = {
  id: number;
  taskId: number;
  text: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TaskCommentResponse = TaskComment & { user: PasswordlessUser };

export type TaskCommentsResponse = TaskCommentResponse[];
