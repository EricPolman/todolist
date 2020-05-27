import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CoreModule
  ],
  controllers: [AuthController],
  providers: [JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
