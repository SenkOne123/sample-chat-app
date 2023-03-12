import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'username', description: 'Логин пользователя', required: true })
    public readonly username: string;
    @ApiProperty({ example: 'user@gmail.com', description: 'Адрес электронной почты', required: true })
    public readonly email: string;
    @ApiProperty({ example: '12345678qW', description: 'Пароль', required: true })
    public readonly password: string;
}