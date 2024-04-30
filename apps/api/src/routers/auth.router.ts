import { Router } from 'express';
import { AuthController } from '@/controllers/auth.controller';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.authController.authController);
  }

  getRouter(): Router {
    return this.router;
  }
}