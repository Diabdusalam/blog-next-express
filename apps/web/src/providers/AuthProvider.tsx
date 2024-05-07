'use client';

import useKeepLogin from '@/hooks/api/auth/useKeepLogin';
import { FC, PropsWithChildren, useEffect } from 'react';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const { keeplogin } = useKeepLogin();

  useEffect(() => {
    keeplogin();
  }, []);

  return <>{children}</>;
};
