import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { Document, Model} from 'mongoose';


import * as bcryptjs from 'bcryptjs'
import { LoginDto } from './dto/login.user.dto';

import { LoginResponse } from './interfaces/login-response';
import { RegisterUserDto } from './dto/register.dto';
import { RegisterResponse } from './interfaces/register-response';

import { JwtUtilities } from './utilities/jwt-utilities';



@Injectable()
export class AuthService {


  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtUtilities : JwtUtilities,

  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    try {

      const { password, ...userData } = createUserDto;

      // 1 - Encriptar la constraseña y agregar direccion
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10),
        ...userData
      });


      // 2 - Guardar la contraseña 

      await newUser.save();

      const { password: _, ...user } = newUser.toJSON();

      return user;


    } catch (error) {



      if (error.code === 11000) {
        throw new BadRequestException(`${createUserDto.email} already exists!`)
      }
      throw new InternalServerErrorException('Something terrible happen!!!');

    }


  }



  async register(registerDto: RegisterUserDto): Promise<RegisterResponse> {

    try {
      const user = await this.create(registerDto)

      return {
        user: user,
        token: this.jwtUtilities.getJwtToken({ id: user.id })
      }


    } catch (error) {

      if (error instanceof BadRequestException) {
        throw new UnauthorizedException('User already exists')
      } else {

        throw new InternalServerErrorException('Something terrible happen!!!');
      }


    }


  }


  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email })

    if (!user) {
      throw new UnauthorizedException('Not valid credentials - email')
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Not valid credentials - password')
    }

    const { password: _, ...rest } = user.toJSON()

    return {
      user: rest,
      token: this.jwtUtilities.getJwtToken({ id: user.id }),
    }
  }

  findAll(): Promise<User[]> {
    return this.userModel.find()
  }


  async findUserById(id: string) {
    const user = await this.userModel.findById(id)
    const { password, ...rest } = user.toJSON();
    return rest
  }


  async findUserByIdReturnDocument(id: string) : Promise<User>{
      return await this.userModel.findById({id})
  }

  async findUserByEmail(email: string): Promise<Document> {
    return await this.userModel.findOne({ email }).exec();
  }

  async changeUserInfo(updateAuthDto: UpdateAuthDto) {

    try {

      const userId = await this.jwtUtilities.getId();
      const userComplete = await this.findUserById(userId)

      if(userComplete){
          const {email} = userComplete
          const userDcoument: Document<User> = await this.findUserByEmail(email); 

          
          userDcoument.set(updateAuthDto)

          userDcoument.set(updateAuthDto.profilePicture)

          await userDcoument.save()
    
          const { password, ...rest } = userDcoument.toObject();

         // console.log(rest)

    
          return rest

      }

       throw new NotFoundException('User not found')
      

      // const token = this.getJwtToken({id: user._id.toJSON()})


      // console.log(' User: ',user)

      // let addressUser ; 

      // if(user.address){

      //   

      //   const { address, ...rest} = user.toObject();

      // return {
      //   user: {rest},
      //   address: addressUser 
      // }
    } catch (error) {
      throw new UnauthorizedException(error.message)
    }

  }


  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }


  


}
