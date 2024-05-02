// import App from '@/app';
// import { prismaMock } from '@/test/prisma';
// import request from 'supertest';

// const requestBody = {
//   //   fullName: 'botak',
//   email: 'by@gmail.com',
//   password: 'by@gmail.com',
// };

// jest.mock('@/lib/bcrypt', () => ({
//   //   const { app } = new App();
//   comparePassword: jest.fn().mockResolvedValue(true),
// }));

// describe('POST /auth/login', () => {
//   const { app } = new App();

//   it('should login successfully', async () => {
//     prismaMock.user.findFirst.mockResolvedValueOnce({
//       id: 1,
//       fullName: 'mock fullname',
//       email: 'by@gmail.com',
//       password: 'by@gmail.com',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });

//     const response = await request(app)
//       .post('/api/auth/login')
//       .send(requestBody);

//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe('login success');
//     expect(response.body.data).toBeDefined();
//     expect(response.body.token).toBeDefined();

//     // console.log(response.text);
//   });

//   //   it('should return error if email no found', async () => {
//   //     prismaMock.user.findFirst.mockResolvedValueOnce(null);

//   //     const response = await request(app)
//   //       .post('/api/auth/login')
//   //       .send(requestBody);

//   //     expect(response.status).toBe(500);
//   //     expect(response.text).toBe('invalid email adress');
//   //   });
// });

import App from '@/app';
import { comparePassword } from '@/lib/bcrypt';
import { prismaMock } from '@/test/prisma';
import request from 'supertest';

const requestBody = {
  email: 'mock email',
  password: 'mock password',
};

jest.mock('@/lib/bcrypt', () => ({
  comparePassword: jest.fn().mockResolvedValue(true),
}));

describe('POST /auth/login', () => {
  const { app } = new App();

  it('should login successfully', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullname',
      email: 'mock password',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post('/api/auth/login')
      .send(requestBody);

    console.log(response.text);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('login success');
    expect(response.body.data).toBeDefined();
    expect(response.body.token).toBeDefined();
  });

  it('should return errror if email not found', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/api/auth/login')
      .send(requestBody);

    // console.log(response);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Invalid email address');
  });

  it('should return errror if password not match', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullname',
      email: 'mock password',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    (comparePassword as jest.Mock).mockResolvedValueOnce(false);

    const response = await request(app)
      .post('/api/auth/login')
      .send(requestBody);

    // console.log(response);

    expect(response.status).toBe(500);
    expect(response.text).toBe('incorect password');

    //   //     expect(response.text).toBe('invalid email adress');
  });
});
