import { axiosClient } from '@/config';

export type Notification = {
  id: number;
  title: string;
  redirectUrl: string;
  isRead: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type GetNotificationsResponse = Notification[];

export const getNotifications = async () => {
  const { data } =
    await axiosClient.get<GetNotificationsResponse>('/notifications');

  return data;
};
