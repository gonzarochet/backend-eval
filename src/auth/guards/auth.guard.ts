import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { JwtUtilities } from '../utilities/jwt-utilities';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtUtilities: JwtUtilities,
    private authService : AuthService,
  ) { }


  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await context.switchToHttp().getRequest();
  
    const token = this.jwtUtilities.extractTokenFromHeader()


    if (!token) {
      throw new UnauthorizedException('There is no bearer token');
    }
    try {

      const payload = await this.jwtUtilities.getPayload(token)

      const user = await this.authService.findUserById(payload.id)

      if(!user){
        throw new UnauthorizedException('User does not exists');
      }

      request['user'] = user

    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

}
