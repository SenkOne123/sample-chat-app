import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user-dto';
import { RolesService } from '../roles/roles.service';

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

    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNlbmtvbmUxMjNAZ21haWwuY29tIiwiaWQiOjEwLCJyb2xlcyI6W3siaWQiOjIsInZhbHVlIjoiYWRtaW4iLCJkZXNjcmlwdGlvbiI6ItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAIn1dLCJpYXQiOjE2Nzg2Mzg3ODYsImV4cCI6MTY3ODcyNTE4Nn0.tD972Lp7QzeOxc2-4wEjXXjEySDHblMq3D6PYYFleiQ
}
