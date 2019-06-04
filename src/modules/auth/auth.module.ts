import { Module } from '@nestjs/common';
//import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { CryptographerService } from './cryptographer.service';
import {PassportModule} from "@nestjs/passport";

@Module({
  providers: [AuthService, LocalStrategy, CryptographerService],
  controllers: [AuthController],
  imports: [UsersModule, PassportModule.register({defaultStrategy: 'local'})],
  exports: [AuthService, PassportModule]
})

export class AuthModule { }