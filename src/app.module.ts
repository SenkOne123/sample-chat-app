import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/authentication/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './modules/authentication/roles/roles.module';
import { AuthModule } from './modules/authentication/auth/auth.module';
import { MainModule } from './modules/main/main.module';
import { User } from './modules/authentication/users/users.model';
import { Role } from './modules/authentication/roles/roles.model';
import { UserRoles } from './modules/authentication/roles/user-roles.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles],
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        MainModule,
    ],
})
export class AppModule { }