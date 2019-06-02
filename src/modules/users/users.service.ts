import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CryptographerService } from '../auth/cryptographer.service';
import { getRepository } from "typeorm";

@Injectable()
export class UsersService {

  constructor(
    private readonly cryptoService: CryptographerService,
  ){}

  private readonly userRepository = getRepository(User);

  public async create(user: CreateUserDto) {
    return this.userRepository.save(user)
      .then(user => Promise.resolve(user))
      .catch(err =>
        Promise.reject(new BadRequestException(err.toString()))
      )
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findOne(params): Promise<any> {
    return await this.userRepository.findOne(params)
      .then(user => {
        return (user)
          ? Promise.resolve(user)
          : Promise.reject('User not exist')
      })
      .catch(err => Promise.reject(new NotFoundException(err)))
  }

  public async update(id: string, payload: CreateUserDto) {
    return await this.findOne({_id: id })
      .then(
        async user => {
          user.name = payload.name;
          user.email = payload.email;
          //put this in a pre-save hook if you use Mongoose or BeforeInsert if use TypeOrm
          user.password = (await this.cryptoService.checkPassword(user.password, payload.password))
            ? user.password
            : await this.cryptoService.hashPassword(payload.password)
          //
          return user.save()
            .then(() =>
              Promise.resolve({ message: 'user has been updated'})
            )
            .catch(
              err => Promise.reject(new NotFoundException(err))
            )
        }
      )
  }

  public async delete(params): Promise<any> {
    return await this.findOne(params)
      .then(
        user => user.remove()
          .then(() => Promise.resolve({message: 'user has been deleted'})
          )
      )
  }
}