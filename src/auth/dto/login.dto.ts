import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email del usuario',
    example: 'admin@admin.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    minLength: 4,
    example: '123456',
  })
  @IsString()
  @MinLength(4)
  password: string;
}