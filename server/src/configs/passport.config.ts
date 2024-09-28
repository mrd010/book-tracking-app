import passport from 'passport';
import { Strategy, ExtractJwt, type StrategyOptions } from 'passport-jwt';
import { jwtSecret } from '../env-globals';
import User from '../models/User';

if (!jwtSecret) {
  throw new Error('JWT secret not defined!');
}

// strategy options
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

// jwt strategy
const jwtStrategy = new Strategy(opts, async (jwt_payload, done) => {
  // Here you would find the user in your database
  try {
    const user = await User.getUser({ userId: jwt_payload.id });
    if (!user) {
      return done(null, false);
    }
    // use just user essential information
    const sanitizedUser = { id: user.id, email: user.email };
    return done(null, sanitizedUser);
  } catch (err) {
    return done(err, false);
  }
});

// use strategy in passport
passport.use(jwtStrategy);
