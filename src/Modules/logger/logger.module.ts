import { Module } from '@nestjs/common';
import { LoggerService } from './services/logger/logger.service';
import { LoggerController } from './controllers/logger/logger.controller';

@Module({
  controllers:[LoggerController],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}