import request from 'supertest';
import { prismaMock } from '@/test/prisma';
import App from '@/app';

const requestBody = {
  fullName: 'botak',
  email: 'budis@gmail.com',
  password: 'budis@gmail.com',
};

describe('POST /auth/register', () => {
  const { app } = new App();
  it('should register user successfully', async () => {
    // expect(true).toBe(true);
    prismaMock.user.findFirst.mockResolvedValueOnce(null);
    prismaMock.user.create.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullname',
      email: 'mock email',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    console.log(response);
    expect(response.status).toBe(200);
  });

  it('should return error if email already exist', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      id: 1,
      fullName: 'mock fullname',
      email: 'mock email',
      password: 'mock password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Email already exist');
    // console.log(response);
  });
});
