
import { IsEmail, IsOptional, IsString, IsUrl, MinLength, isDateString } from 'class-validator';


class Address{
    @IsString()
    street: string;

    @IsString()
    location : string;

    @IsString()
    city: string;

    @IsString()
    country: string;

    @IsString()
    cp: string;
}

export class RegisterUserDto{

    @IsString()
    name: string;

    @IsString()
    nickname : string;
    
    @IsOptional()
    @IsUrl()
    profilePicture : string; 

    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;
    
    @IsString()
    phone : string;

    @IsOptional()
    birthday: Date;

    address : Address; 
    

}