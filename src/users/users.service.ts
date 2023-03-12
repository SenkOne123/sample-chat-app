import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user-dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
        private rolesService: RolesService,
    ) {}

    public async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue('user');
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    public async getAllUsers() {
        return await this.userRepository.findAll({ include: { all: true } });
    }

    public async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email }, include: { all: true } })
    }

    public async getUserByUsername(username: User['username']): Promise<User> {
        return await this.userRepository.findOne({ where: { username }, include: { all: true } })
    }

    public async addRole(dto: AddRoleDto): Promise<User> {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getRoleByValue(dto.value);
        const userHasRole = user.roles?.some(userRoles => userRoles.value === role.value) ?? false;
        if (user && role && !userHasRole) {
            await user.$add('roles', [role.id]);
        } else {
            throw new HttpException('Пользователь или роль не найдены!', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    public async banUser(dto: BanUserDto): Promise<User> {
        const existingUser = await this.userRepository.findByPk(dto.userId);
        if (!existingUser) {
            throw new HttpException('Пользователь не найден!', HttpStatus.NOT_FOUND);
        }
        existingUser.banned = true;
        existingUser.banReason = dto.banReason;
        return await existingUser.save();
    }
}
