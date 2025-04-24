import { Module } from '@nestjs/common';
import { NotificationsController } from './modules/notifications/notifications.controller';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [NotificationsModule, DatabaseModule, AuthModule],
  controllers: [NotificationsController],
  providers: [],
})
export class AppModule {}
