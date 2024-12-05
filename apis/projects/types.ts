import { UserType } from '@/types/enums';

export type PasswordlessUser = {
  id: number;
  email: string;
  name: string;
  description: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  clientUserId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectsResponse = Project[];

export type PmProjectResponse = (Project & {
  developerUsers: (PasswordlessUser & { userType: UserType.DEVELOPER })[];
})[];

export type DeveloperProjectResponse = (Project & {
  pmUser: PasswordlessUser & { userType: UserType.PM };
})[];

export type ClientProjectResponse = (Project & {
  users: PasswordlessUser[];
})[];
