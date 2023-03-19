import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { LoginUserDto } from '../users/dto/login-user-dto';
import { Token } from './models/token';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: LoginUserDto): Promise<Token>;
    registration(userDto: CreateUserDto): Promise<Token>;
}
