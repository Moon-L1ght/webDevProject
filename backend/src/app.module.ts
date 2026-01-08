import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (cs: ConfigService) => ({
                uri: cs.get<string>('MONGO_URI'),
            }),
        }),

        UsersModule,
        AuthModule,
        CoursesModule,
    ],
})
export class AppModule {}
