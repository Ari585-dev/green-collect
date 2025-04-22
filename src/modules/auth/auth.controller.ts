import { Body, Controller, Post, Res, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any, @Res() res: Response) {
    try {
      const result = await this.authService.register(body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
  
    if (!email || !password) {
      throw new BadRequestException('Email y password son requeridos');
    }
  
    return this.authService.login({ email, password }); 
  }
}