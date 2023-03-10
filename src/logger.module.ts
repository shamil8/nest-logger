import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerConfig } from './config/logger.config';
import { LoggerService } from './services/logger.service';
import { WinstonService } from './services/winston.service';

@Module({
  imports: [ConfigModule],
  providers: [
    // configs
    LoggerConfig,

    // services
    WinstonService,
    LoggerService,
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
