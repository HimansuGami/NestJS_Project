import {
  Body,
  ConflictException,
  Injectable,
  NotFoundException,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserSchema } from './Models/user.schema';
import { userUpdateDTO } from './DTOs/userUpdateDTO';
import { Query } from 'express-serve-static-core';
import { EntityNotExist } from './custom-exception/entity-not-exist';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './Modules/auth/DTOs/logInDTO';
import * as bcrypt from 'bcryptjs';
import { InvalidCredentials } from './custom-exception/invalid-credentials';
import { Response } from 'express';
import { use } from 'passport';
import { SignUpDTO } from './Modules/auth/DTOs/signUpDTO';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDTO: SignUpDTO): Promise<{ user: UserDocument }> {
    const { userName, description, email, password } = signUpDTO;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      userName,
      description,
      email,
      password: hashPassword,
    });
    return { user };
  }

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

    const token = this.jwtService.sign({ id: user._id, name: user.userName });

    response.cookie('jwt', token, { httpOnly: true });

    return {
      message: 'Success fully loged in',
    };
  }

  async createUser(user: UserSchema): Promise<UserSchema> {
    const existingUser = await this.userModel.findOne({
      userName: user.userName,
      description: user.description,
    });
    console.log(existingUser);

    if (existingUser)
      throw new ConflictException('user with this name is already exist');
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async readUser(query: Query, @Req() request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verify(cookie);

    if (!data) throw new UnauthorizedException();
    const user = await this.userModel.findById(data.id);
    if (user) {
      const resPerPage = 3;
      const currentPage = Number(query.page) || 1;
      const skip = Number(resPerPage) * (currentPage - 1);
      const keyword = query.keyword
        ? {
            userName: {
              $regex: query.keyword,
              $options: 'i',
            },
          }
        : {};
      return await this.userModel
        .find({ ...keyword })
        .limit(resPerPage)
        .skip(skip)
        .then((user) => {
          return user;
        })
        .catch((err) => console.log(err));
    }
  }

  async updateUser(id: string, data: userUpdateDTO): Promise<UserSchema> {
    const userNotExist = await this.userModel.findById(id);
    if (!userNotExist)
      throw new EntityNotExist(`Entity with id :"${id}" not found`, 400);
    return await this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async removeUser(id: string) {
    const userNotExist = await this.userModel.findById(id);
    if (!userNotExist)
      throw new EntityNotExist(`Entity with id :"${id}" not found`, 400);
    return await this.userModel.findByIdAndRemove(id);
  }
}
