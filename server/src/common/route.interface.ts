import { Request, Response, NextFunction, Router} from 'express'

export interface IControllerRoute {
  path: string
  func: (req: Request, res: Response, next: NextFunction) => void
  // Берет из Router передаваемые значения и создает новый интерфейс
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
}