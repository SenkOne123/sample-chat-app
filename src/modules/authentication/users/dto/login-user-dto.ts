import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({ example: 'username', description: 'Логин пользователя', required: true })
    public readonly username: string;

    @ApiProperty({ example: '12345678qW', description: 'Пароль', required: true })
    public readonly password: string;
}