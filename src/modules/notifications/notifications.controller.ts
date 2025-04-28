import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('')
export class NotificationsController {

    constructor(private notificationsService: NotificationsService){}

    @Post('/sendWh')
    async sendWhatssappMessage(@Body() body: { phone: string, msg: string }) {
        const { phone, msg } = body;

        if (!phone || !msg) {
            throw new BadRequestException('Phone y msg son requeridos');
        }

        return this.notificationsService.sendWhatssappMessage({ phone, msg });
    }
}
