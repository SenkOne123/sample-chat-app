import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
    @ApiProperty({ example: 'admin', description: 'Значение роли', required: true })
    readonly value: string;
    @ApiProperty({ example: 1, description: 'Id пользователя', required: true })
    readonly userId: number;
}