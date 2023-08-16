const fs = require("fs");
const path = require("path");
const JwtStrtegy = require("passport-jwt").Strategy;
const User = require("../modules/user");

const pupKeyPath = path.join(__dirname, "./.env/.id_rsa_pup.pem");
const PUP_KEY = fs.readFileSync(pupKeyPath, "utf-8");
// some method to get the token
/*
 *  fromUrlQueryParameter;
 *  fromAuthHeader;
 *  fromAuthHeaderAsBearerToken;
 *  fromAuthHeaderWithScheme;
 *  fromBodyField;
 *  fromHeader;
 *  const extractJwt = require("passport-jwt").ExtractJwt;
 */
// my owne token
const cookiesExtractor = (req) => {
  let jwt;
  if (!req.cookies["jwt"]) {
    return (jwt = null);
  }

  return (jwt = req.cookies.jwt);
};

const opts = {
  jwtFromRequest: cookiesExtractor,
  secretOrKey: PUP_KEY,
  algorithem: ["RS256"],
};

const strategy = new JwtStrtegy(opts, (payload, done) => {
  User.findById(payload.sub)
    .then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(new Error("user not found try to register"), false);
    })
    .catch((err) => done(err, false));
});

module.exports = strategy;
