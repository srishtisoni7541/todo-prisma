import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getUsers();
  }

  @Post('/register')
   @UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  create(@Body() dto:CreateUserDto) {
    return this.userService.createUser(dto);
  }
  @Post('/login')
  Login(@Body() loginDto:LoginDto){
    return  this.userService.LoginUser(loginDto);

  }
  @Put('/update-user')
  updateUser(@Body() dto:CreateUserDto){
    return this.userService.UpdateUser(dto);
  }
  @Delete('/delete-account')
  DeleteUser(@Body() dto:CreateUserDto){
    return this.userService.DeleteUser(dto);
  }
}
