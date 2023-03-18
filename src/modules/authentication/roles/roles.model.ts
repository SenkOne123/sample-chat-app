import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttributes {
    value: string;
    description: string;
}

@Table({
    tableName: 'roles',
    createdAt: false,
    updatedAt: false,
})
export class Role extends Model<Role, RoleCreationAttributes> {

    @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    public id: number;

    @ApiProperty({ example: 'ADMIN', description: 'Значение роли пользователя' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    public value: string;

    @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public description: string;

    @BelongsToMany(() => User, () => UserRoles)
    public users: User[];
}