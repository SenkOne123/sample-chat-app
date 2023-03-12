import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {

    public static readonly tokenType = 'Bearer';

    constructor(private jwtService: JwtService) {
    }

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== JwtAuthGuard.tokenType || !token) {
                throw new UnauthorizedException({ message: 'Пользователь не авторизован!' });
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            return true;

        } catch (e) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован!' });
        }
    }
}