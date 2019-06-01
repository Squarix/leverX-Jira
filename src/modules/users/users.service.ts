'use strict';

import {Injectable} from "@nestjs/common";
import {User} from "./user.entity";

@Injectable()
export class UsersService {
  public findOneByToken(token: string): User {
    return new User;
  }
}