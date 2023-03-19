import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role-dto';
export declare class RolesService {
    rolesRepository: typeof Role;
    constructor(rolesRepository: typeof Role);
    getRoles(): Promise<Role[]>;
    createRole(dto: CreateRoleDto): Promise<Role>;
    getRoleByValue(value: string): Promise<Role>;
}
