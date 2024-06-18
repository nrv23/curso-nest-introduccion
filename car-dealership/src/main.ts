import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // aplicacion principlal

  app.useGlobalPipes( // validacion de pipes a nivel de aplicacion
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
    })
  )
  await app.listen(3000);
}
bootstrap();
