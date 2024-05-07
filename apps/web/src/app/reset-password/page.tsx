'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useLogin from '@/hooks/api/auth/useLogin';
import { useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import useForgotPassword from '@/hooks/api/auth/useForgotPassword';
import { notFound, useSearchParams } from 'next/navigation';
import useResetPassword from '@/hooks/api/auth/useRestPassword';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  if (!token) {
    notFound();
  }

  const { resetPassword, isLoading } = useResetPassword();

  const formik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema,

    onSubmit: ({ password }) => {
      resetPassword(password, token);
    },
  });

  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="flex justify-center items-center">
        <Card className="w-[350px] ">
          <CardHeader>
            <CardTitle>Reset password</CardTitle>
          </CardHeader>
          <form onSubmit={formik.handleSubmit}>
            {' '}
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="****************"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </div>
              </div>
            </CardContent>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="****************"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full" disabled={isLoading} type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                submit
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
