// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
//
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
//

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'node:path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors({ origin: true });

    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true }),
    );

    app.useStaticAssets(join(__dirname, '..', 'static'), {
        prefix: '/static',
    });

    const cs = app.get(ConfigService);
    await app.listen(Number(cs.get('PORT') ?? 4000), '127.0.0.1');
}

bootstrap();
