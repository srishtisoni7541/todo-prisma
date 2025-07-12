
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload); 
  }

  async validateToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }
}
