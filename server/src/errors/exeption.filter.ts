import e, { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import { IExeptionFilter } from './exeption.filters.interface'
import { HTTPError } from './http-error.class'
import 'reflect-metadata'

// Говорит о том, что класс можно положить в контейнер
@injectable()
export class ExeptionFilter implements IExeptionFilter {
  // Благодаря inject подставится инстанс Логгера
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HTTPError) {
      this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`)
      res.status(err.statusCode).send({
        ok: true,
        err: err.message,
        payload: null,
      })
    } else {
      this.logger.error(`${err.message}`)
      res.status(500).send({
        ok: true,
        err: err.message,
        payload: null,
      })
    }
  }
}
