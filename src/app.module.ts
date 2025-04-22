import { Module } from '@nestjs/common';
import { NotificationsController } from './modules/notifications/notifications.controller';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [NotificationsModule, DatabaseModule],
  controllers: [NotificationsController],
  providers: [],
})
export class AppModule {}
