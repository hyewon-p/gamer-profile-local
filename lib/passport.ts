import passport from "passport";
import passportSteam from "passport-steam";

const SteamStrategy = passportSteam.Strategy;

export interface SteamProfile {
  displayName: string;
  id: string;
  identifier: string;
  photos: Image;
  provider: string;
}

interface Image {
  value: string;
}
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj: SteamProfile, done) {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: `${process.env.BASE_URL}/api/auth/return`,
      realm: `${process.env.BASE_URL}`,
      apiKey: `${process.env.STEAM_KEY}`,
    },
    (
      identifier: string,
      profile: SteamProfile,
      done: (a: null | string, b: SteamProfile) => typeof done
    ) => {
      // Fetch any more information to populate
      //   profile.identifier = identifier;
      return done(null, profile);
    }
  )
);

export default passport;
