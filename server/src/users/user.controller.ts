import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Put, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Response } from 'express';


@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getUsers();
  }
  @UseGuards(JwtAuthGuard)
 @Get('profile')
  getUser(@Req() req) {
    const user = req.user; 
    return this.userService.GetUser(user.email);
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
   @Get('/logout')
  async UserLogout(@Res() res: Response) {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully!' });
  }
}

