import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

type AccessPayload = { sub: string; email: string };
type RefreshPayload = { sub: string; type: 'refresh' };

@Injectable()
export class AuthService {
    constructor(
        private users: UsersService,
        private jwt: JwtService,
        private cs: ConfigService,
    ) {}

    async login(email: string, password: string) {
        const user = await this.users.findByEmail(email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        if (!bcrypt.compareSync(password, user.passwordHash)) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const userId = user._id.toString();

        const accessOpts: JwtSignOptions = {
            secret: this.cs.getOrThrow('JWT_ACCESS_SECRET'),
            expiresIn: this.cs.getOrThrow('JWT_ACCESS_TTL'), // "15m"
        };

        const refreshOpts: JwtSignOptions = {
            secret: this.cs.getOrThrow('JWT_REFRESH_SECRET'),
            expiresIn: this.cs.getOrThrow('JWT_REFRESH_TTL'), // "30d"
        };

        const accessToken = await this.jwt.signAsync<AccessPayload>(
            { sub: userId, email: user.email },
            accessOpts,
        );

        const refreshToken = await this.jwt.signAsync<RefreshPayload>(
            { sub: userId, type: 'refresh' },
            refreshOpts,
        );

        return {
            accessToken,
            refreshToken,
            user: { id: userId, email: user.email },
        };
    }

    async refresh(refreshToken: string) {
        const refreshSecret = this.cs.getOrThrow<string>('JWT_REFRESH_SECRET');

        let payload: { sub: string; type: 'refresh' };
        try {
            payload = await this.jwt.verifyAsync<{
                sub: string;
                type: 'refresh';
            }>(refreshToken, {
                secret: refreshSecret,
            });
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }

        if (payload.type !== 'refresh') {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const accessOpts: JwtSignOptions = {
            secret: this.cs.getOrThrow('JWT_ACCESS_SECRET'),
            expiresIn: this.cs.getOrThrow('JWT_ACCESS_TTL'), // "15m"
        };

        const accessToken = await this.jwt.signAsync(
            { sub: payload.sub },
            accessOpts,
        );

        return { accessToken };
    }
}
