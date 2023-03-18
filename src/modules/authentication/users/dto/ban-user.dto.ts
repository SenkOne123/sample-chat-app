import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
    @ApiProperty({ example: 1, description: 'Id пользователя', required: true })
    public readonly userId: number;
    @ApiProperty({ example: 'Плохое поведение', description: 'Причина бана', required: true })
    public readonly banReason: string;
}