import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret_key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService,GoogleStrategy],
  exports: [AuthService, JwtModule], 
})
export class AuthModule {}
