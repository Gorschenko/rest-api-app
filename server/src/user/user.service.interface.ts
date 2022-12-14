import { AuthLoginDto } from '../auth/dto/auth-login.dto'
import { AuthRegisterDto } from '../auth/dto/auth-register.dto'
import { User } from './user.entity'

export interface IUSerService {
  createUser: (dto: AuthRegisterDto) => Promise<boolean>
  validateUser: (dto: AuthLoginDto) => Promise<boolean>
  getUserInfo: (email: string) => Promise<User | null>
  updateLabels: (email: string, type: string, courseId: string) => Promise<User | null>
}
