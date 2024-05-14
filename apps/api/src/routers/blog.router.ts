import { BlogController } from '@/controllers/blog.controller';
import { SampleController } from '@/controllers/sample.controller';
import { verifyToken } from '@/lib/jswt';
import { uploader } from '@/lib/uploader';
import { Router } from 'express';

export class BlogRouter {
  private router: Router;
  private blogController: BlogController;

  constructor() {
    this.blogController = new BlogController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      '/',
      verifyToken,
      uploader('img', '/images').array('thumbnail', 1),
      this.blogController.createBlogController,
    );
    this.router.get('/', this.blogController.getssBlogController);
    this.router.get('/:id', this.blogController.getsBlogController);
    this.router.patch(
      '/:id',
      verifyToken,
      uploader('IMG', '/images').array('thumbnail', 1),
      this.blogController.updateBlogController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
