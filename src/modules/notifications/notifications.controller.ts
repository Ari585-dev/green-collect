import { Controller, Get, Post } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('')
export class NotificationsController {

    constructor(private notificationsService: NotificationsService){}

    @Post('/sendWh')
    sendWhatssappMessage() {
        return this.notificationsService.sendWhatssappMessage();
    }
}
