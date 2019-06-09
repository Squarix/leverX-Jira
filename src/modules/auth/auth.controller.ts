import {Controller, Post, Req, Body, HttpStatus, HttpCode, Get, UseGuards, Render, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from  '../users/dto/create-user.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { callback } from './passport/local.strategy';
import {User} from "../users/user.entity";
import {LoginUserDto} from "../users/dto/login-user.dto";

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

  @Get('sign-in')
  @Render('auth/views/sign_in')
  public async signIn() {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async login(@Body(new ValidationPipe()) user: LoginUserDto, @Res() res) {
    this.authService.logIn(user.email, user.password)
      .then(user => Promise.resolve(this.authService.createToken(user)))
      .then(token => res.setHeader('Authorization', 'Bearer ' + token.access_token))
      .then( (token) => res.json(token))
      .catch(err => console.log(err));
  }

}