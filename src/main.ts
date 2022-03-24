import './dotenv';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ProductsModule } from './products/products.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(function (req, res, buf, next) {
    req.rawBody = buf.toString();
    next();
  });

  app.use(function (req, res, next) {
    res.header('x-powered-by', 'Martynas');
    res.header('Cache-Control', 'no-cache');
    res.header('Pragma', 'no-cache');
    next();
  });

  const configForClient = new DocumentBuilder()
    .setTitle('Client')
    .setDescription(
      `New data structure ! DTOs + Entities, Changes in: [Products: GET, UPDATE, DELETE], version - ${new Date()}`,
    )
    .setVersion('1.000.1')
    .addTag(`${new Date()}`)
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, configForClient, {
    include: [ProductsModule],
  });
  SwaggerModule.setup('api/v1/swagger', app, swaggerDocument);

  app.use(helmet());
  await app.listen(config.port);
  console.log(`service was started on ${config.port}`);
}

bootstrap().then();
