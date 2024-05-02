import { comparePassword, hashedPassword } from '@/lib/bcrypt';
import prisma from '@/prisma';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { BASE_URL_NEXT, jwtSecretKey } from '../../config';
import { transporter } from '@/lib/nodemailer';

export const forgotPasswordService = async (body: Pick<User, `email`>) => {
  try {
    const { email } = body;
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (!existingUser) {
      throw new Error(`Invalid email address`);
    }

    const token = sign({ id: existingUser.id }, jwtSecretKey, {
      expiresIn: '38s',
    });

    const link = BASE_URL_NEXT + `/reset-password?token=${token}`;

    await transporter.sendMail({
      from: 'Admin',
      to: email,
      subject: 'Link Reset Password',
      html: `<a href="${link}" target="_blank">Reset Password Here</a>`,
    });
  } catch (error) {
    throw error;
  }
};
