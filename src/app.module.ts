import { Module } from '@nestjs/common';
import { ResolutionModule } from './domain/resolution/resolution.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './config/jwt.config';

@Module({
  imports: [
    ResolutionModule,
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
