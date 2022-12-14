import { Response, Request, NextFunction } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '../common/base.controller'
import { ValidateMiddleware } from '../common/validate.middleware'
import { HTTPError } from '../errors/http-error.class'
import { ILogger } from '../logger/logger.interface'
import { TYPES } from '../types'
import { ICourseController } from './course.controller.interface'
import { ICourseService } from './course.service.interface'
import { CourseCreateDto } from './dto/course-create.dto'
import { CourseEditDto } from './dto/course-edit.dto'

@injectable()
export class CourseController extends BaseController implements ICourseController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.CourseService) private courseService: ICourseService,
  ) {
    super(loggerService)
    this.bindRoutes(
      [
        {
          path: '/:id?',
          method: 'get',
          func: this.fetch,
          middlewares: [],
        },
        {
          path: '/',
          method: 'post',
          func: this.create,
          middlewares: [new ValidateMiddleware(CourseCreateDto)],
        },
        {
          path: '/:id',
          method: 'delete',
          func: this.delete,
          middlewares: [],
        },
        {
          path: '/',
          method: 'put',
          func: this.edit,
          middlewares: [new ValidateMiddleware(CourseEditDto)],
        },
      ],
      '/courses',
    )
  }

  async fetch(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.courseService.fetch(req.params.id)
    if (!result) {
      return next(new HTTPError(400, 'Ошибка', 'course'))
    }
    this.ok(res, result)
  }

  async create(
    req: Request<{}, {}, CourseCreateDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.courseService.create(req.body)
    if (!result) {
      return next(new HTTPError(400, 'Ошибка', 'create'))
    }
    this.ok(res, result)
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.courseService.delete(req.params.id)
    if (!result) {
      return next(new HTTPError(400, 'Ошибка', 'delete'))
    }
    this.ok(res, result)
  }

  async edit(
    req: Request<{}, {}, CourseEditDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.courseService.edit(req.body)
    if (!result) {
      return next(new HTTPError(400, 'Ошибка', 'edit'))
    }
    this.ok(res, result)
  }
}
