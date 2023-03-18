import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';

interface UserCreationAttributes {
    username: string;
    email: string;
    password: string;
}

@Table({
    tableName: 'users',
})
export class User extends Model<User, UserCreationAttributes> {

    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    public id: number;

    @ApiProperty({ example: 'username', description: 'Логин пользователя' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    public username: string;

    @ApiProperty({ example: 'user@gmail.com', description: 'Адрес электронной почты' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    public email: string;

    @ApiProperty({ example: '12345678qW', description: 'Пароль' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public password: string;

    @ApiProperty({ example: true, description: 'Статус блокировки пользователя' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    public banned: boolean;

    @ApiProperty({ example: 'Ты мне не нравишься!', description: 'Причина блокировки' })
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    public banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    public roles: Role[];
}