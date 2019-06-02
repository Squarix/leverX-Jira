import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import {Role, Status} from "../enum";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()	
  readonly name: string;

  @IsEmail({}, { message: 'Is not a valid email' })
  @IsNotEmpty()	
  readonly email: string;

  @IsString()
  @IsNotEmpty()	
  public password: string;

  public status: Status;
  public role: Role;
}