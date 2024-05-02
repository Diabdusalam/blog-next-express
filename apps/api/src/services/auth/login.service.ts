import { comparePassword, hashedPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { jwtSecretKey } from '../../config';

export const loginService = async (body: Pick<User, `email` | `password`>) => {
  try {
    const { email, password } = body;
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (!existingUser) {
      throw new Error(`Invalid email address`);
    }

    const isPasswordValid = await comparePassword(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      throw new Error('incorect password');
    }

    const token = sign({ id: existingUser.id }, jwtSecretKey, {
      expiresIn: '2h',
    });

    return {
      message: 'login success',
      data: existingUser,
      token,
    };
  } catch (error) {
    throw error;
  }
};
