import { comparePassword, hashedPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { jwtSecretKey } from '../../config';

export const keeploginService = async (id: number) => {
  try {
    // const { email, password } = body;
    const existingUser = await prisma.user.findFirst({
      where: { id },
    });

    if (!existingUser) {
      throw new Error(`Invalid userid`);
    }

    return {
      message: 'keep login success',
      data: existingUser,
    };
  } catch (error) {
    throw error;
  }
};
