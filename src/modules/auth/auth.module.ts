import { Module } from '@nestjs/common';
//import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { CryptographerService } from './cryptographer.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./passport/jwt.strategy";

@Module({
  providers: [AuthService, JwtStrategy, CryptographerService],
  controllers: [AuthController],
  imports: [UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),],
  exports: [AuthService, PassportModule]
})

export class AuthModule { }