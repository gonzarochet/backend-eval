import { Controller, Get, Post, Body, Patch, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

import { LoginDto } from './dto/login.user.dto';

import { AuthGuard } from './guards/auth.guard';
import { LoginResponse } from './interfaces/login-response';
import { User } from './entities/user.entity';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtUtilities } from './utilities/jwt-utilities';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private jwtUtilities : JwtUtilities
    
    ) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto)
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto){
    return this.authService.register(createUserDto)
  }
  

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: Request) {

   // const user = req['user']; 
    //return user; 

    return this.authService.findAll(); 
  }


  @UseGuards(AuthGuard)
  @Get('check-token')
  async checkToken(@Request() req: Request) : Promise<LoginResponse>{
    const user = req['user'] as User

    const oldertoken = this.jwtUtilities.getJwtToken({id: user.id })
    const newToken = await this.jwtUtilities.refreshToken(oldertoken);
    
    return {
      user,
      token: newToken
    }
  }




  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  @UseGuards(AuthGuard)
  @Patch('/user-profile')
  update(@Body( ) updateAuthDTO : UpdateAuthDto) {
    return this.authService.changeUserInfo(updateAuthDTO);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
