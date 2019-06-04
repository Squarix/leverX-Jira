import {Controller, Post, Req, Body, HttpStatus, HttpCode, Get, UseGuards, Render} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from  '../users/dto/create-user.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { callback } from './passport/local.strategy';
import {User} from "../users/user.entity";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('sign-up')
  @Render('auth/views/sign_up')
  public async singUp() {}

  @Post('sign-up')
  public async signUp(@Body(new ValidationPipe()) user: CreateUserDto) {
    return await this.authService.signUp(user);
  }
  
  @Post('login')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req) {
    return await this.authService.createToken(req.user);
  }

}