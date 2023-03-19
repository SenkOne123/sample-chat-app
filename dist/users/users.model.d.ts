import { Model } from 'sequelize-typescript';
import { Role } from '../roles/roles.model';
interface UserCreationAttributes {
    username: string;
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAttributes> {
    id: number;
    username: string;
    email: string;
    password: string;
    banned: boolean;
    banReason: string;
    roles: Role[];
}
export {};
