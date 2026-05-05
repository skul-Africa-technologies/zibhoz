import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);

  // 🔒 Basic security
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 200, // increase a bit for dev testing
    }),
  );

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT') || 3001;

  // 🌍 CORS (allow all during testing)
  app.enableCors({
    origin: '*', // 👈 allow all origins for now
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: false, // keep false since origin is '*'
  });

  // 🌐 Global API prefix
  app.setGlobalPrefix('api/v1');

  // 🧰 Global ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // 📘 Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SkulAfrica API')
    .setDescription('API documentation for SkulAfrica backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, '0.0.0.0');
  console.log(`🚀 Server running on http://localhost:${PORT}/api/v1`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api`);
}

bootstrap();
