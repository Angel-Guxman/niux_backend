import { AuthService } from './auth.service';
import { LoginUserDto, CreateUserDto, SocialLoginDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { Auth, GetHeader, GetUser } from './decorators/index';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles.interface';
import { CreateSocialUserDto } from './dto/create-social-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('get-all-users')
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.authService.getAllUsers(paginationDto);
  }

  @Get('find-user/:id')
  findUser(@Param('id') id: string) {
    return this.authService.findUser(id);
  }

  @Post('social-user-exists')
  socialUserAlreadyExists(@Body() verifyUserDto: VerifyUserDto) {
    return this.authService.socialUserAlreadyExists(verifyUserDto);
  }

  @Post('social-login')
  socialLogin(@Body() socialLoginDto: SocialLoginDto) {
    return this.authService.socialLogin(socialLoginDto);
  }

  @Post('social-register')
  socialRegister(@Body() createSocialUser: CreateSocialUserDto) {
    return this.authService.createSocialUser(createSocialUser);
  }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Patch('update/:id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') email: string,
    @GetHeader() headers: string[],
  ) {
    return {
      ok: true,
      message: 'This route is private',
      user,
      email,
      headers,
    };
  }
  // @SetMetadata('roles', ['admin'])

  @Get('private2')
  @RoleProtected(ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      message: 'This route is private',
      user,
    };
  }

  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      message: 'This route is private',
      user,
    };
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
