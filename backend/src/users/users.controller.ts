import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req: any) {
    return { message: 'This is a protected route', user: req.user };
  }

  @Post('/signup')
  signUp(@Body() body: RegisterUserDto) {
    return this.usersService.signUp(body);
  }

  @Post('/signin')
  signIn(@Body() body: LoginUserDto) {
    return this.usersService.signIn(body);
  }

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }
}
