import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

function setupSwagger(app) {
  const configService: ConfigService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Foodiee Application')
    .setDescription('Online food delivery application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const swaggerPath = configService.get<string>('SWAGGER_PATH', 'docs');
  SwaggerModule.setup(swaggerPath, app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  if (configService.get('APP_ENV') === 'development') {
    setupSwagger(app);
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get<number>('PORT', 8080));
}
bootstrap();
