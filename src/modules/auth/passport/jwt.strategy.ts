import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'privetYaSecretKeyNaJire',
    });
  }

  async validate(payload, done: Function) {
    return await this.authService.verify(payload)
    .then(signedUser =>  done(null, signedUser))
    .catch( err => done(err, false))
  }
}
