import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/authentication/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './modules/authentication/users/users.model';
import { RolesModule } from './modules/authentication/roles/roles.module';
import { Role } from './modules/authentication/roles/roles.model';
import { UserRoles } from './modules/authentication/roles/user-roles.model';
import { AuthModule } from './modules/authentication/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles],
            autoLoadModels: true,
        }),
        UsersModule,
        RolesModule,
        AuthModule,
    ],
})
export class AppModule {

}