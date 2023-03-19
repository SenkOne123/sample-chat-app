import { Role } from './roles.model';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role-dto';
export declare class RolesController {
    private rolesService;
    constructor(rolesService: RolesService);
    getRoles(): Promise<Role[]>;
    createRole(roleDto: CreateRoleDto): Promise<Role>;
    getRoleByValue(value: string): Promise<Role>;
}
