import { Module } from '@nestjs/common';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { CryptographerService } from './cryptographer.service';

@Module({
  providers: [AuthService, JwtStrategy, LocalStrategy, CryptographerService],
  controllers: [AuthController],
  imports: [UsersModule]
})

export class AuthModule { }