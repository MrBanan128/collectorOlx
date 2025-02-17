const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../db/models/note'); // Załaduj model User

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: 'YOUR_GOOGLE_CLIENT_ID',
      clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
      callbackURL: 'http://localhost:10000/api/auth/google/callback',
    },
    async (token, tokenSecret, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: '', // Brak hasła, ponieważ logowanie przez Google
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Facebook OAuth
passport.use(
  new FacebookStrategy(
    {
      clientID: 'YOUR_FACEBOOK_APP_ID',
      clientSecret: 'YOUR_FACEBOOK_APP_SECRET',
      callbackURL: 'http://localhost:10000/api/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'emails'],
    },
    async (token, tokenSecret, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: '', // Brak hasła, ponieważ logowanie przez Facebook
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);
