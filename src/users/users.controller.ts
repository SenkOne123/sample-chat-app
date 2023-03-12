import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from './users.model';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) {}

    @ApiOperation({ summary: 'Получение списка всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get()
    public async getUsers(): Promise<User[]> {
        return await this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Выдать роль' })
    @ApiResponse({ status: 200 })
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    public async addRole(@Body() userDto: AddRoleDto): Promise<User> {
        return await this.usersService.addRole(userDto);
    }

    @ApiOperation({ summary: 'Забанить пользователя' })
    @ApiResponse({ status: 200 })
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/ban')
    public async banUser(@Body() dto: BanUserDto): Promise<User> {
        return await this.usersService.banUser(dto);
    }
}
