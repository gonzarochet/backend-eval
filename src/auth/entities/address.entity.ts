
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({_id: false})
export class Address {


    @Prop({required: true})
    street:   string;

    @Prop({required: true})
    location: string;

    @Prop({required: true})
    city:     string;

    @Prop({required: true})
    country:  string;

    @Prop({required: true, minlength: 4})
    cp:       string;
}


export const AddressSchema = SchemaFactory.createForClass(Address)