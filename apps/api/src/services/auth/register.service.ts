import { hashedPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';

export const registerService = async (
  body: Pick<User, `email` | `fullName` | `password`>,
) => {
  try {
    const { email, password } = body;
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error(`Email already exist`);
    }
    const hashPassword = await hashedPassword(password);

    return await prisma.user.create({
      data: { ...body, password: hashPassword },
    });
  } catch (error) {
    throw error;
  }
};
