import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { PORT } from './env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('etag');
  app.disable('x-powered-by');
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('NodeJS recruitment test task API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        name: 'Authorization',
        type: 'http',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        in: 'Header',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(PORT);
}

bootstrap()
  .then(() => console.log(`Swagger: http://localhost:${PORT}/api-swagger/`))
  .catch((e) => console.error(e));
