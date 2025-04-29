// src/requests/requests.controller.ts
import { Controller, Post, Get, Body, Req, Res, UseGuards } from '@nestjs/common';
import { AuthMiddleware } from '../auth/auth.middleware'; 
import { RequestsService } from './requests.service';
import { Response, Request } from 'express';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post('create')
  @UseGuards(AuthMiddleware)  
  async createRequest(@Body() body: any, @Res() res: Response) {
    try {
      const result = await this.requestsService.createRequest(body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  // @Get('my')
  // async getMyRequests(@Req() req: Request, @Res() res: Response) {
  //   try {
  //     const userId = req.query.user_id as string;
  //     if (!userId) {
  //       throw new Error('Debe proporcionar el ID de usuario (user_id)');
  //     }
  //     const result = await this.requestsService.getMyRequests(Number(userId));
  //     return res.status(200).json(result);
  //   } catch (error) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // }

  @Post('my')
    async getMyRequests(@Body() body: any, @Res() res: Response) {
      console.log('Body:', body);
      try {
        const userId = body.user_id;
        
        if (!userId) {
          throw new Error('Debe proporcionar el ID de usuario (user_id)');
        }
        const result = await this.requestsService.getMyRequests(Number(userId), String(body.startDate), String(body.endDate));
        return res.status(200).json(result);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }     
}
