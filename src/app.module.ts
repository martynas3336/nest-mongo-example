import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost:27017/main`, {
      connectionName: 'cdbProducts',
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
