import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin : 'http://localhost:4300',
    credentials : true,
  });
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe());
  const logger = new Logger();
  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();


