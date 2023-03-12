import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { LoginUserDto } from '../users/dto/login-user-dto';
import { Token } from './models/token';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({ summary: 'Авторизация пользователя' })
    @ApiResponse({ status: 200 })
    @Post('/login')
    public login(@Body() userDto: LoginUserDto): Promise<Token> {
        return this.authService.login(userDto);
    }

    @ApiOperation({ summary: 'Регистрация пользователя' })
    @ApiResponse({ status: 200 })
    @Post('/registration')
    public registration(@Body() userDto: CreateUserDto): Promise<Token> {
        return this.authService.registration(userDto);
    }

}
