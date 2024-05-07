'use client';

import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.type';
import { AxiosError } from 'axios';

interface KeepLoginResponse {
  message: string;
  data: User;
}

const useKeepLogin = () => {
  const dispatch = useAppDispatch();
  const keeplogin = async () => {
    try {
      const { data } =
        await axiosInstance.get<KeepLoginResponse>('/auth/keep-login');

      dispatch(loginAction(data.data));
    } catch (error) {
      //   if (error instanceof AxiosError) {
      //     alert(error?.response?.data);
      //   }
    }
  };
  return { keeplogin };
};

export default useKeepLogin;
