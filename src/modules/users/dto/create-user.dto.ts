import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import {Role, Status} from "../enum";

export class CreateUserDto {
  @IsEmail({}, { message: 'Not valid email' })
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}