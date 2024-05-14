import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { createBlogService } from '@/services/blog/create-blog.service';
import { getBlogService } from '@/services/blog/get-blog.service';
import { getBlogsService } from '@/services/blog/get-blogs.service';
import { updateBlogService } from '@/services/blog/update-blog.service';
// import { updateBlogService } from '@/services/blog/update-blog.service';

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
  async getssBlogController(req: Request, res: Response, next: NextFunction) {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 10,
        page: Number(req.query.page) || 1,
        sortBy: (req.query.sortBy as string) || 'createdAt',
        sortOrder: (req.query.sortOrder as string) || 'desc',
        search: (req.query.search as string) || '',
      };
      const result = await getBlogsService(query);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateBlogController(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];

      const result = await updateBlogService(
        Number(req.params.id),
        req.body,
        files[0],
      );
    } catch (error) {}
  }
}
