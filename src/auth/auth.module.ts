import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

import { AddressSchema, Address } from './entities/address.entity';
import { JwtUtilities } from './utilities/jwt-utilities';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtUtilities],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Address.name,
        schema: AddressSchema
      }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: {expiresIn: '6h'},
    }),
  ]
    
})
export class AuthModule {}
