// import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';
// import { RefreshDto } from './dto/refresh.dto';
// import { JwtAuthGuard } from './jwt-auth.guard';
//
// @Controller('auth')
// export class AuthController {
//     constructor(private auth: AuthService) {}
//
//     @Post('login')
//     login(@Body() dto: LoginDto) {
//         return this.auth.login(dto.email, dto.password);
//     }
//
//     @Post('refresh')
//     refresh(@Body() dto: RefreshDto) {
//         return this.auth.refresh(dto.refreshToken);
//     }
//
//     @UseGuards(JwtAuthGuard)
//     @Get('me')
//     me(@Req() req: any) {
//         // validate() из JwtStrategy вернул payload в req.user
//         return { id: req.user.sub, email: req.user.email };
//     }
// }

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { JwtAccessPayload } from './jwt.strategy';

type AuthedRequest = Request & { user: JwtAccessPayload };

@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {}

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.auth.login(dto.email, dto.password);
    }

    @Post('refresh')
    refresh(@Body() dto: RefreshDto) {
        return this.auth.refresh(dto.refreshToken);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@Req() req: AuthedRequest) {
        return { id: req.user.sub, email: req.user.email };
    }
}
