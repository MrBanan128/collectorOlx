const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('./db/models/note');

// Upewnij się, że masz wartości clientID i clientSecret
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "TWÓJ_GOOGLE_CLIENT_ID";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "TWÓJ_GOOGLE_SECRET";

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || "TWÓJ_FACEBOOK_APP_ID";
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || "TWÓJ_FACEBOOK_SECRET";

// Serializacja użytkownika
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
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:10000/auth/google/callback',
        scope: ['profile', 'email'], // Dodajemy odpowiednie zakresy
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Sprawdzenie czy użytkownik już istnieje
        let user = await User.findOne({ email: profile.emails[0].value });
    
        if (!user) {
          // Jeśli użytkownik nie istnieje, tworzysz nowe konto
          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: '', // Możesz nie przechowywać hasła, bo użytkownik loguje się przez Google
          });
          await user.save(); // Zapisz nowego użytkownika w bazie danych
        }
    
        // Zwracasz użytkownika (czy to nowego, czy już istniejącego)
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }));

// Facebook OAuth
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:10000/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'emails'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Sprawdzamy, czy użytkownik już istnieje
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // Jeśli użytkownik nie istnieje, tworzymy nowe konto
          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: '', // Możesz nie przechowywać hasła, bo użytkownik loguje się przez Facebooka
          });
          await user.save(); // Zapisujemy użytkownika w bazie danych
        }

        done(null, user); // Zwracamy użytkownika (czy to nowego, czy już istniejącego)
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;

