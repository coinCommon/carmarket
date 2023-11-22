import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(path.join(__dirname, '..', 'static'), {
    prefix: '/static/',
  });

  await app.listen(process.env.PORT).then(data => console.log(`The server started on ${process.env.PORT}`));
}

bootstrap();
