import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { SignUpDTO } from '../../DTOs/signUpDTO';
import { LoginDTO } from '../../DTOs/logInDTO';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // @Post('signUp')
  // async signUp(@Body() signUpDTO : SignUpDTO) : Promise<{token : string}>{
  //     return this.authService.signUp(signUpDTO);
  // }

  @Get('login')
  async logInUser(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    return this.authService.logInUser(loginDTO, response);
  }
}
