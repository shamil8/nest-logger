import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { WinstonDefaultLogLevel } from '../enums/winston-default-log-level';
import { ParamsLoggerInterface } from '../interfaces/params-logger.interface';

@Injectable()
export class LoggerConfig {
  /**
   * Logger arguments
   */
  public readonly loggerParams: ParamsLoggerInterface;

  constructor(private readonly configService: ConfigService) {
    const isDev = this.configService.get<string>('APP_ENV')  === 'develop';
    const appName = this.configService
      .get<string>('APP_NAME', 'app-logs')
      .toLowerCase();

    this.loggerParams = {
      level: this.configService.get<WinstonDefaultLogLevel>(
        'LOGGER_LEVEL',
          isDev
          ? WinstonDefaultLogLevel.debug
          : WinstonDefaultLogLevel.info,
      ),
      isRotateLoggerFile: this.configService.get<boolean>(
        'IS_ROTATE_LOGGER_FILE',
        true,
      ),
      /** log files count */
      loggerMaxFile: this.configService.get<string>('LOGGER_MAX_FILE', '50'),
      loggerMaxSize: this.configService.get<string>(
        'LOGGER_MAX_SIZE',
        // max size '10MB'
        '10000000',
      ),
      loggerDirectory: this.configService.get<string>(
        'LOGGER_DIRECTORY',
        join(__dirname, '..', '..', '..', '..', '..', 'logs', appName),
      ),
    };
  }
}
