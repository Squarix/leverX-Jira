import {Controller, Get, Post, Put, Delete, Req, Body, Param, UseGuards, Render} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { PassportModule} from "@nestjs/passport";

@Controller('users')
//@UseGuards(AuthGuard('local'))
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ){}

  @Get()
  @Render('users/views/index')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id): Promise<User> {
    return this.userService.findOne({id: id})
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id, @Body(new ValidationPipe()) payload:LoginUserDto) {
    return this.userService.update(id, payload)
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id) {
    return this.userService.delete({id  : id})
  }


  @Get('/projects/my')
  @UseGuards(AuthGuard('jwt'))
  @Render('users/views/projects')
  async projects(@Req() req) {
    return { projects: await this.userService.myProjects(req.user.id) };
  }

  @Get('/projects/own')
  @UseGuards(AuthGuard('jwt'))
  @Render('users/views/projects')
  async ownProjects(@Req() req) {
    return { projects: await this.userService.ownerProjects(req.user.id), owner: true};
  }

}