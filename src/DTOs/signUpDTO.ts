import { Prop } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDTO {
  @Prop()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEmail({}, { message: 'please enter valid email' })
  @Prop({ unique: [true, 'Duplicate Email Entered'] })
  @IsString()
  @IsNotEmpty()
  email: string;
  
  @Prop()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}