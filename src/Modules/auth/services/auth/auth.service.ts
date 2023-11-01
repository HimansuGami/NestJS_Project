import { Body, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from '../../DTOs/signUpDTO';
import { LoginDTO } from '../../DTOs/logInDTO';
import { InvalidCredentials } from 'src/custom-exception/invalid-credentials';
import { EntityNotExist } from 'src/custom-exception/entity-not-exist';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  //   async signUp(signUpDTO : SignUpDTO) : Promise<{token : string}>{
  //      const {name , email , password} = signUpDTO;

  //      const hashPassword = await bcrypt.hash(password,10)

  //      const user = await this.userModel.create({
  //          name,
  //          email,
  //          password : hashPassword,
  //      })

  //      const token = this.jwtService.sign({id : user._id , name : user.name});
  //      return {token}
  //   }

  async logInUser(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    const { email, password } = loginDTO;

    const user = await this.userModel.findOne({ email });

    if (!user) throw new EntityNotExist('Email does not exist', 400);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      throw new InvalidCredentials('Incorrect Password', 401);

    const token = this.jwtService.sign({ id: user._id, name: user.name });

    response.cookie('jwt', token, { httpOnly: true });

    return {
      message: 'Success fully loged in',
    };
  }
}
