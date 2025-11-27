import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({
    description: 'Nombre del producto',
    example: 'Camisa Deportiva',
    minLength: 2,
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiPropertyOptional({
  description: 'Descripción del producto',
  example: 'Tela fresca y ligera',
})
  @IsOptional()
  @IsString()
  description?: string;
}
