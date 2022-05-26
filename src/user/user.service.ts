import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IUser } from 'src/common/interfaces/user.interface';


@Injectable()
export class UserService {

  constructor(
    @InjectModel(USER.name)
    private readonly model: Model<IUser>
  ){}

  async hashPassword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(createUserDto: CreateUserDto) {
    const hash = await this.hashPassword(createUserDto.password);
    const newUser = new this.model({...createUserDto, password: hash});
    return await newUser.save();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
