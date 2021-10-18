import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserExistGuard } from 'src/guards/user-exist.guard';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(UserExistGuard)
  @Post('register')
  async register(@Body() create: CreateUserInput) {
    return this.authService.register(create);
  }
}
