import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtServ } from './jwt/jwtServ.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtServ) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers
    if (!authorization || authorization.indexOf('Bearer') === -1) {
      throw new HttpException('Користувач не авторизований - відсутній токен', HttpStatus.UNAUTHORIZED)
    }
    const token = authorization.split(' ')[1]
    if (!token) {
      throw new HttpException('Користувач не авторизований - токен пустий', HttpStatus.UNAUTHORIZED)
    }

    request.user = this.jwtService.verifyToken(token)
    return true
  }
}
