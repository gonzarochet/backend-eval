import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


import { AuthModule } from './auth/auth.module';
import { JwtUtilities } from './auth/utilities/jwt-utilities';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot( process.env.MONGO_URI),
    AuthModule,
    

  ],
  controllers: [],
  providers: [JwtUtilities],
})
export class AppModule {

}
