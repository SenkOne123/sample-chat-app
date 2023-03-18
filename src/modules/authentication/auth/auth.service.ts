import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user-dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';
import { Token } from './models/token';
import { LoginUserDto } from '../users/dto/login-user-dto';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    public async login(userDto: LoginUserDto): Promise<Token> {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    public async registration(userDto: CreateUserDto): Promise<Token> {
        await this.checkEmailExistence(userDto.email);
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({ ...userDto, password: hashPassword });
        return this.generateToken(user);
    }

    private async checkEmailExistence(email: CreateUserDto['email']): Promise<void> {
        const candidate = await this.usersService.getUserByEmail(email);
        if (candidate) {
            throw new HttpException(
                'Пользователь с таким email уже существует!',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    private async validateUser(userDto: LoginUserDto): Promise<User> {
        const existingUser = await this.usersService.getUserByUsername(userDto.username);
        if (!existingUser || !userDto.password) throw new UnauthorizedException({ message: 'Некорректный логин или пароль!' });
        const passwordEquals = await bcrypt.compare(userDto.password, existingUser.password);
        if (passwordEquals) {
            return existingUser;
        } else {
            throw new UnauthorizedException({ message: 'Некорректный логин или пароль!' });
        }
    }

    private generateToken(user: User): Token {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        const token = this.jwtService.sign(payload);
        return { token };
    }
}
