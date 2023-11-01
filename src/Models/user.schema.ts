import { Prop ,Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose"

import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserSchema>;
@Schema()
export class UserSchema{
    @Prop()
    userName : string;
    @Prop()
    description : string;
    @Prop({unique : [true , "Duplicate Email Entered"]})
    email : string;
    @Prop()
    password : string;
    @Prop({default : Date.now})
    add_date : Date;
}
export const userSchema = SchemaFactory.createForClass(UserSchema);