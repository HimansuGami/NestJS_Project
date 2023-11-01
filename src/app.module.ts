import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './Models/user.schema';
import { LoggerModule } from './Modules/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { studentSchema } from './Models/student.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Hims_21:Himansu_21@cluster0.cmigdgz.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'user', schema: userSchema }]),
    MongooseModule.forFeature([{ name: 'student', schema: studentSchema }]),
    LoggerModule,
    JwtModule.register({
      secret: 'skfbaeuifbuo2354nfsadsfgadsghdgbf',
      signOptions: { expiresIn: 5000 },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
