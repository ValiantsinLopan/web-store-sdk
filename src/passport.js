/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

/**
 * Sign in with Facebook.
 */
passport.use(
  new FacebookStrategy(
    {
      clientID: '139957829376223',
      clientSecret: '3b3b4eef4f7a842c5b9d833465dadc09',
      callbackURL: '/login/facebook/return',
      profileFields: [
        'displayName',
        'name',
        'email',
        'link',
        'locale',
        'timezone',
      ],
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      /* eslint-disable no-underscore-dangle, no-unused-vars */
      const loginName = 'facebook';
      const claimType = 'urn:facebook:access_token';
      done();
    },
  ),
);

export default passport;
