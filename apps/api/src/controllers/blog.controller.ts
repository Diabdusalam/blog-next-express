import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { createBlogService } from '@/services/blog/create-blog.service';
import { getBlogService } from '@/services/blog/get-blog.service';

export class BlogController {
  async createBlogController(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];
      const result = await createBlogService(req.body, files[0]);

      if (!files?.length) {
        throw new Error('no file uploaded');
      }

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getsBlogController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getBlogService(Number(req.params.id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
