import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';  // ← IMPORTANTE
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, // ← SE INYECTA BIEN
    private readonly jwtService: JwtService,
  ) {}

async validateUser(email: string, pass: string) {
  console.log('Buscando usuario:', email);
  const user = await this.usersService.findByEmail(email);
  console.log('Usuario encontrado:', user);

  if (!user) throw new UnauthorizedException('Invalid credentials');

  const isMatch = await bcrypt.compare(pass, user.password);
  console.log('Comparación contraseña:', isMatch);

  if (!isMatch) throw new UnauthorizedException('Invalid credentials');

  return user;
}

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
