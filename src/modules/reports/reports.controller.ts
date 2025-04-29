import { Controller, Post, Get, Body, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Post('my')
    async getMyReport(@Body() body: any, @Res() res: Response) {
        console.log('Body:', body);
        try {
        const userId = body.user_id;
        
        if (!userId) {
            throw new Error('Debe proporcionar el ID de usuario (user_id)');
        }
        const result = await this.reportsService.getMyReport(Number(userId), String(body.startDate), String(body.endDate));
        return res.status(200).json(result);
        } catch (error) {
        return res.status(400).json({ message: error.message });
        }
    }     
}
