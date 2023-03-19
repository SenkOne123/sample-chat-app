import { Model } from 'sequelize-typescript';
import { User } from '../users/users.model';
interface RoleCreationAttributes {
    value: string;
    description: string;
}
export declare class Role extends Model<Role, RoleCreationAttributes> {
    id: number;
    value: string;
    description: string;
    users: User[];
}
export {};
