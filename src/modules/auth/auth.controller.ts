import {Controller, Post, Req, Body, HttpStatus, HttpCode, Get, UseGuards, Render, Res} from '@nestjs/common';
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

  @Get('sign-in')
  @Render('auth/views/sign_in')
  public async signIn() {}

  @Post('sign-in')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req, @Res() res) {
    console.log(req.jwtSession.toJSON());
    req.jwtSession.payload = {
      user_id: req.user.id,
      role: req.user.role
    };
    let claims = {
      iss: "leverX-jira",
      aud: "localhost:30000"
    };
    req.jwtSession.create(claims, function(error, token){
      res.send({ token: token });
    });
  }

}