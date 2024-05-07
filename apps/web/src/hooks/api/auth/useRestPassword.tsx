'use client';

import { axiosInstance } from '@/lib/axios';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/userSlice';
import { User } from '@/types/user.type';
import axios, { AxiosError } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface ResetPasswordResponse {
  message: string;
}

const useResetPassword = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const resetPassword = async (password: string, token: string) => {
    try {
      setIsLoading(true);

      const { data } = await axios.patch<ResetPasswordResponse>(
        'http://localhost:8000/api/auth/reset-password',
        { password },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert(data.message);
      router.replace(`/`);
      // toast succes
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { resetPassword, isLoading };
};

export default useResetPassword;
