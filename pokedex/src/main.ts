import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setear un prefijo en la ruta del api, por ejemplo /api

  app.setGlobalPrefix("api/v2")

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // esta opcion permite la transformacion implicita de los datos de entrada con el tipo
      // de dato del dto
      transformOptions: {
        enableImplicitConversion: true // permite la conversion implicita
      }
    }),
  );

  await app.listen(3000);
}
bootstrap();
