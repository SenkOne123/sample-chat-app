import { CreateUserDto } from '../users/dto/create-user-dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Token } from './models/token';
import { LoginUserDto } from '../users/dto/login-user-dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(userDto: LoginUserDto): Promise<Token>;
    registration(userDto: CreateUserDto): Promise<Token>;
    private checkEmailExistence;
    private validateUser;
    private generateToken;
}
