
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Address, AddressSchema } from './address.entity';



export enum Role{
    USER = "USER",
    ADMIN = "ADMIN"
}


@Schema()
export class User {


    id?: string;

    @Prop({unique: true, required: true})
    email: string;

    @Prop({required: true})
    name: string;

    @Prop({unique: false, required: true})
    nickname :string; 

    @Prop()
    birthday: Date;
    
    @Prop()
    pictureProfile: string; 

    @Prop({required: true})
    phone: string

    @Prop({minlength: 6, required: true})
    password?: string;

    @Prop({default: true})
    isActive: boolean;

    @Prop({type: String, enum: Role, default: Role.USER}) 
    roles: Role; 

    @Prop({ type: AddressSchema})
    address: Address;
}


export const UserSchema = SchemaFactory.createForClass(User)
 