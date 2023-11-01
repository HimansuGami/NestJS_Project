import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type StudentDocument = HydratedDocument<Student>;
export class Student{
    @Prop()
    name : string;

    @Prop()
    rollNo : number;

    @Prop()
    description: string;

    @Prop({ unique: [true, 'Duplicate Email Entered'] })
    email: string;
}
export const studentSchema = SchemaFactory.createForClass(Student);