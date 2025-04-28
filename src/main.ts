import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AuthMiddleware } from './modules/auth/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  dotenv.config();
  //app.use(AuthMiddleware)
}
bootstrap();
