import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import {Role, Status} from "../enum";

export class LoginUserDto {
  @IsEmail({}, { message: 'Is not a valid email' })
  @IsNotEmpty()	
  readonly email: string;

  @IsString()
  @IsNotEmpty()	
  public password: string;
}