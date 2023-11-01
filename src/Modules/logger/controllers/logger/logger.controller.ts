import { Controller, Get, Inject } from '@nestjs/common';
import { LoggerService } from '../../services/logger/logger.service';

@Controller('logger')
export class LoggerController {
    constructor(@Inject(LoggerService) private logger: LoggerService) {}

  @Get()
  getData() {
    this.logger.log('This is a log message.');
    this.logger.error('This is an error message.', 'ErrorStackTrace');
    this.logger.debug('this is debug');
    // Other log levels: warn, debug
    return 'Data';
  }
}
