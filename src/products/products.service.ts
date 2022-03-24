import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productRepository: Model<Product>,
  ) {}

  async create(product: CreateProductDto) {
    const response: Product = await new this.productRepository({
      ...product,
    }).save();

    return { id: response._id };
  }

  async get(productId: string) {
    const product: Product = await this.productRepository.findOne({
      _id: productId,
    });

    return product;
  }

  async update(productId: string, product: UpdateProductDto) {
    await this.productRepository.updateOne({ _id: productId }, product);
    return {};
  }

  async delete(id: string) {
    await this.productRepository.deleteOne({
      _id: id,
    });
    return null;
  }
}
