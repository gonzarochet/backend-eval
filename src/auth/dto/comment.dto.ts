import { IsOptional, IsString } from "class-validator";
import { Prop } from "@nestjs/mongoose";

export class CommentDTO{

    @IsOptional()
    @IsString()
    _id:string

    @IsString()
    idEpisode:string

    @IsString()
    text: string;

    @IsString()
    name:string; 

    @IsString()
    email:string;

    @IsString()
    nickname:string; 

    @IsOptional()
    @IsString()
    pictureProfile: string; 

    @IsOptional()
    isActive: boolean


}