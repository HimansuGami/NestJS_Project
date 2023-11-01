import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpDTO{
    @IsNotEmpty()
    @IsString()
    readonly name : string;

    @IsEmail({},{message : 'please enter valid email'})
    @IsNotEmpty()
    readonly email : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password : string;
}