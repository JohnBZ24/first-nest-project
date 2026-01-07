import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
  console.log('DATABASE_PORT:', process.env.DATABASE_PORT);
  console.log('DATABASE_NAME:', process.env.DATABASE_NAME);
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  app.enableCors({ origin: 'http://localhost:5174' });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
