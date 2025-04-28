import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { NotificationsService } from '../notifications/notifications.service';
@Module({
      controllers: [RequestsController],
      providers: [RequestsService, NotificationsService]
})
export class RequestsModule {}
