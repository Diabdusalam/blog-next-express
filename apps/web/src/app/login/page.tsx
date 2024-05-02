'use client';

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

const Login = () => {
  const { login } = useLogin();
  const formik = useFormik({
    initialValues: { email: '', password: '' },

    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="flex justify-center items-center">
        <Card className="w-[350px] ">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <form onSubmit={formik.handleSubmit}>
            {' '}
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="text"
                    placeholder="123@email.com"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="***********"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full" type="submit">
                Log in
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
