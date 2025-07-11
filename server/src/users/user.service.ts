
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService,private authService:AuthService) {}

  getUsers() {
    return this.prisma.user.findMany();
  }

  async createUser(dto: CreateUserDto) {
    const { name, email, password: rawPassword, role } = dto;
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) return { msg: 'User already exists!' };

    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'USER',
      },
    });

    const { password, ...result } = user;
    return result;
  }

async LoginUser(loginDto: LoginDto) {
  const { email, password } = loginDto;

  const user = await this.prisma.user.findUnique({ where: { email } });
  if (!user) return { message: 'Invalid Credentials' };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { message: 'Invalid Credentials' };

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

const token = await this.authService.generateToken(payload)
  // console.log("token during login :",token);

  const { password: _, ...userData } = user;
  return {
    message: 'Login Successful',
    access_token: token,
    user: userData,
  };
}


  async UpdateUser(dto: CreateUserDto) {
    const { name, password: rawPassword } = dto;
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) return { message: 'User not found!' };

    const newPass = await bcrypt.hash(rawPassword, 10);
    const updated = await this.prisma.user.update({
      where: { email: dto.email },
      data: { name, password: newPass },
    });

    const { password, ...data } = updated;
    return data;
  }

  async DeleteUser(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) return { message: 'User not found!' };

    await this.prisma.user.delete({ where: { email: dto.email } });
    return { message: 'User Account Deleted Successfully!' };
  }
 
  async GetUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
       include: {
      todos: true,
    },
    });

    if (!user) {
      return { message: 'User not found!' };
    }

    return {
      message: 'User fetched successfully!',
      user,
    };
  }
}
