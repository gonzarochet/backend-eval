import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Comment {

    

    @Prop({required: true})
    idEpisode: string

    @Prop({required: true})
    text:string; 

    @Prop({required: true})
    name:string; 

    @Prop({required: true})
    nickname:string; 

    @Prop({required: true})
    email:string;

    @Prop()
    pictureProfile: string; 

    @Prop({default: true})
    isActive: boolean


}

export const CommentSchema = SchemaFactory.createForClass(Comment)