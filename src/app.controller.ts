import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDocument, UserSchema } from './Models/user.schema';
import { userUpdateDTO } from './DTOs/userUpdateDTO';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Request, Response } from 'express';
import { LoginDTO } from './DTOs/logInDTO';
import { SignUpDTO } from './DTOs/signUpDTO';
import { Student } from './Models/student.schema';
@Controller('index')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signUp')
  async signUp(@Body() signUpDTO: SignUpDTO): Promise<{ user: UserDocument }> {
    return this.appService.signUp(signUpDTO);
  }

  @Get('login')
  async logInUser(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    return this.appService.logInUser(loginDTO, response);
  }

  @Get()
  async getUser(@Query() query: ExpressQuery, @Req() request: Request) {
    return this.appService.readUser(query, request);
  }

  @Post('create')
  async createUser(@Body() userDTO: UserSchema, @Req() request: Request) {
    return this.appService.createUser(userDTO,request);
  }
  
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: userUpdateDTO,
  ): Promise<UserSchema> {
    return this.appService.updateUser(id, updateData);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    return this.appService.removeUser(id);
  }
}
