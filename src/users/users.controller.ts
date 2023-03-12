import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) {}

    @ApiOperation({ summary: 'Получение списка всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    public async getUsers(): Promise<User[]> {
        return await this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    public async createUser(@Body() userDto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(userDto);
    }
}
