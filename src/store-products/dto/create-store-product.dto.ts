import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreProductDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  productId: number;
  
  @ApiProperty({ example: 25.50 })
  @IsNumber()
  @IsPositive()
  price: number;
  
  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsPositive()
  stock: number;
}
