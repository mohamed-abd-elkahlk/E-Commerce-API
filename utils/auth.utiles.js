const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const jwt = require("jsonwebtoken");

const privKeyPath = path.join(__dirname, "../config/.env/.id_rsa_priv.pem");
const pupKeyPath = path.join(__dirname, "../config/.env/.id_rsa_pup.pem");
const PRIV_KEY = fs.readFileSync(privKeyPath, "utf-8");
const PUP_KEY = fs.readFileSync(pupKeyPath, "utf-8");
// generate password hash wiht salt and crypto using pbkdf2 algorithem
const genHash = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return {
    slat: salt,
    hash,
  };
};

const verifyPasswordHash = (password, salt, hash) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return hash === hashVerify;
};

const issueJWT = (user) => {
  const id = user._id;
  const expiresIn = "10d";
  const { role } = user;
  const payload = {
    sub: id,
    role,
    iat: Date.now(),
  };
  const token = jwt.sign(payload, PRIV_KEY, {
    expiresIn,
    algorithm: "RS256",
  });

  return token;
};
const varifyToken = (jwtToken) => {
  const decoded = jwt.verify(jwtToken, PUP_KEY);
  return decoded;
};
module.exports = { issueJWT, genHash, verifyPasswordHash, varifyToken };
