import { IConfigService } from "./config.service.interface";
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv'
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config()
    if (result.error) {
      this.logger.error('[Config Service] Не удалось прочитать файл .env или он отсутствует')
    } else {
      this.logger.log('[Config Service] Конфигурация .env загружена')
      this.config = result.parsed as DotenvParseOutput
    }
  }
  get<T extends string> (key: string): string {
    return this.config[key]
  }
}