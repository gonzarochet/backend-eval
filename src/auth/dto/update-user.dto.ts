import { IsEmail, IsOptional, IsString, IsUrl, MinLength, ValidateNested } from 'class-validator';
import { UpdateAuthDto } from './update-auth.dto';
import { Type } from 'class-transformer';

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

export class UpdateUserDTO{

    @IsString()
    id:string

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

    @ValidateNested()
    @Type(()=> Address)
    address : Address; 
    

}