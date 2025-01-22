import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

export const secretKey = generateSecretKey();

export const generateJsonWebToken = (payload) => {
  return jwt.sign(payload, secretKey, {
    expiresIn: "50d",
  });
};
