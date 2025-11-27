import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({ example: 'Tienda Centro' })
  @IsString()
  @IsString()
  name: string;

  @ApiProperty({
  example: 'Caracas, Av Principal',
  required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
  example: true,
  required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
