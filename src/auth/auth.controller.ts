import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { LoginUserDto } from '../users/dto/login-user-dto';

@ApiTags('Авторизация пользователя')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/login')
    public login(@Body() userDto: LoginUserDto) {
        return this.authService.login(userDto);
    }

    @Post('/registration')
    public registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlbmtvbmUwMTIzQGdtYWlsLmNvbSIsImlkIjo5LCJyb2xlcyI6W3siaWQiOjMsInZhbHVlIjoidXNlciIsImRlc2NyaXB0aW9uIjoi0J_QvtC70YzQt9C-0LLQsNGC0LXQu9GMIn1dLCJpYXQiOjE2Nzg2MzgyNTAsImV4cCI6MTY3ODcyNDY1MH0.kkNgj9p15Jx2of-aLMcu9CahuexK6SAD7Rt3q7dnl8g

}
