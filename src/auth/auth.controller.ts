import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { LoginWithCredentialGuard } from 'src/guards/login-with-credential.guard';
import { UserExistGuard } from 'src/guards/user-exist.guard';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Login route
   * AuthGuard('local') -> check that users credential is correct
   * LoginWithCredentialGuard -> create and attach session cookie on response
   */
  @UseGuards(AuthGuard('local'), LoginWithCredentialGuard)
  @Post('login')
  login() {
    return { message: 'Logged in successfully' };
  }

  /**
   * Logout route
   * AuthenticatedGuard -> check that session cookie is sent and is valid
   */
  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  logout(@Req() req: any) {
    req.logOut();
    req.session.cookie.maxAge = 0;
    return { message: 'Logged out successfully' };
  }

  /**
   * Register route
   * UserExistGuard -> check if email is already in use
   */
  @UseGuards(UserExistGuard)
  @Post('register')
  async register(@Body() create: CreateUserInput) {
    const user = await this.authService.register(create);
    const { posts, password, created_at, ...rest } = user;
    return {
      ...rest,
      created_at: created_at.toDate(),
    };
    // No idea why fireorm is not returning an instance,
    // instead it returns an 'object' (json)
    // So, gotta do a bit of a manual serialization
  }

  /**
   * Verify authentication route
   * AuthenticatedGuard -> check that session cookie is sent and is valid
   */
  @UseGuards(AuthenticatedGuard)
  @Get('verify')
  check(@Req() req: any) {
    return {
      message: `You are authenticated as ${req.user.email}`,
      user: req.user,
    };
  }
}
