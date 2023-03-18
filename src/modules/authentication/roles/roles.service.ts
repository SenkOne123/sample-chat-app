import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role-dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role)
        public rolesRepository: typeof Role,
    ) {}

    public async getRoles(): Promise<Role[]> {
        return await this.rolesRepository.findAll();
    }

    public async createRole(dto: CreateRoleDto): Promise<Role> {
        return await this.rolesRepository.create(dto);
    }

    public async getRoleByValue(value: string): Promise<Role> {
        return await this.rolesRepository.findOne({ where: { value: value } })
    }
}
