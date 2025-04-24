import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('')
export class NotificationsController {

    constructor(private notificationsService: NotificationsService){}
    @Post('/sendWh')
      async sendWhatssappMessage(@Body() body: { phone:string }) {
        const {phone} = body;
      
      
        return this.notificationsService.sendWhatssappMessage({phone}); 
      }
}
