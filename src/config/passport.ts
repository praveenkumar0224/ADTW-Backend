import { Strategy as JwtStrategy, ExtractJwt, type VerifyCallback } from 'passport-jwt';
import config from './config.js';
import { userService } from '../services/user.service.js';
// import  * as prismaClient from '@prisma/client'

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    if (payload.type !== 'ACCESS') {
      throw new Error('Invalid token type');
    }
    const user = await userService.get({ user_id: payload.sub });
    if (!user) {
      done(null, false);
      return;
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
