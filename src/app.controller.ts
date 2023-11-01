import { Body, Controller, Delete, Get, Param, Post, Put,UseGuards,Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { UserSchema } from './Models/user.schema';
import { userUpdateDTO } from './DTOs/userUpdateDTO'; 
import { AuthGuard } from '@nestjs/passport';
import {Query as ExpressQuery} from 'express-serve-static-core'
import {Request} from 'express'
@Controller('index')
export class AppController {
  constructor(private readonly appService: AppService ) {}

  @Get()
  async getUser(@Query() query : ExpressQuery,@Req() request : Request){
    return this.appService.readUser(query,request);
  }

  @Post('create')
  async createUser(@Body() userDTO : UserSchema){
    return this.appService.createUser(userDTO)
  }

  @Put('/:id')
  async updateUser(@Param('id') id : string,@Body() updateData : userUpdateDTO) : Promise<UserSchema>{
    return this.appService.updateUser(id,updateData);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id : string){
    return this.appService.removeUser(id);
  }
}
