import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Role } from './roles.model';
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role-dto';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {
    }

    @ApiOperation({ summary: 'Получение списка всех ролей пользователей' })
    @ApiResponse({ status: 200, type: [Role] })
    @Get()
    public async getRoles(): Promise<Role[]> {
        return await this.rolesService.getRoles();
    }

    @ApiOperation({ summary: 'Создание роли' })
    @ApiResponse({ status: 200, type: Role })
    @Post()
    public async createRole(@Body() roleDto: CreateRoleDto): Promise<Role> {
        return await this.rolesService.createRole(roleDto);
    }

    @ApiOperation({ summary: 'Поиск по названию роли' })
    @ApiResponse({ status: 200, type: Role })
    @Get('/:value')
    public async getRoleByValue(@Param('value') value: string): Promise<Role> {
        return await this.rolesService.getRoleByValue(value);
    }
}
