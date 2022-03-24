import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productsService.create(product);
  }

  @Get(':productId')
  async get(@Param('productId') productId: string) {
    return this.productsService.get(productId);
  }

  @Put(':productId')
  async update(
    @Param('productId') productId: string,
    @Body() product: UpdateProductDto,
  ) {
    return this.productsService.update(productId, product);
  }

  @Delete(':productId')
  async delete(@Param('productId') productId: string) {
    return this.productsService.delete(productId);
  }
}
