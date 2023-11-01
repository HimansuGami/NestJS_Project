import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './Models/user.schema';
import { AuthModule } from './Modules/auth/auth.module';
import { LoggerModule } from './Modules/logger/logger.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Hims_21:Himansu_21@cluster0.cmigdgz.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{name:'user',schema:userSchema}]), 
    AuthModule,
    LoggerModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY, 
      signOptions : {expiresIn : '5'}
    }),
],
  controllers: [AppController],
  providers: [AppService,JwtService],
})
export class AppModule {
  
}
