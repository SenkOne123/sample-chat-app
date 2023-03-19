import { User } from './users.model';
import { UsersService } from './users.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<User[]>;
    addRole(userDto: AddRoleDto): Promise<User>;
    banUser(dto: BanUserDto): Promise<User>;
}
