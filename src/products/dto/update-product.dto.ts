import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ required: true, description: '' })
  @IsString()
  name: string;

  @ApiProperty({ required: true, description: '' })
  @IsString()
  description: string;

  @ApiProperty({ required: true, description: '' })
  @IsString()
  price: number;
}
