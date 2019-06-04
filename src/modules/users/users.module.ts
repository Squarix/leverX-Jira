import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CryptographerService } from '../auth/cryptographer.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, CryptographerService],
  exports:[UsersService]
})

export class UsersModule { }