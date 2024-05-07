import { hashedPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';

export const resetPasswordService = async (
  userId: number,
  password: string,
) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: userId } });

    if (!user) {
      throw new Error('account not found');
    }

    const hashPassword = await hashedPassword(password);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashPassword },
    });

    return { message: 'reset password success' };
  } catch (error) {
    throw error;
  }
};
