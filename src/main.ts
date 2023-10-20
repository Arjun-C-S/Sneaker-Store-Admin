import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getApplicationPort, setupApplication } from './modules/common/setup/application';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApplication(app);

  const port = await getApplicationPort(app);
  await app.listen(port);
}
bootstrap();
