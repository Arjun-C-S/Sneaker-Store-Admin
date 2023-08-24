import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppConfig } from 'env.interface';
import { ConfigService } from '@nestjs/config';
import { SWAGGER, APPLICATION } from '../constants';

async function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(SWAGGER.APPLICATION_TITLE)
    .setDescription(SWAGGER.APPLICATION_DESCRIPTION)
    .setVersion(SWAGGER.APPLICATION_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(SWAGGER.SWAGGER_ENDPOINT, app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  return app;
}

export async function getApplicationPort(app: INestApplication) {
  return (
    +app
      .get<ConfigService>(ConfigService<AppConfig>)
      .get('PORT', { infer: true }) || APPLICATION.DEFAULT_PORT
  );
}

async function setupRequestPayloadValidation(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());

  return app;
}

export async function setupApplication(app: INestApplication) {
  app.use(cookieParser());
  await setupSwagger(app);
  await setupRequestPayloadValidation(app);
  return app;
}
