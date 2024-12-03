import { axiosClient } from '@/config';

export const logout = async () => {
  const { data } = await axiosClient.post('/auth/logout');

  return data;
};
