import { IsNumber, IsPositive } from 'class-validator';

export class CreateStoreProductDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  stock: number;
}
