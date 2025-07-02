// lib/utils.js
import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: "none",              // <- loosen for cross-site GET/POST
    secure: process.env.NODE_ENV !== "development",
    // domain: process.env.COOKIE_DOMAIN, // optionally pin to your API domain
    // path: "/",                        // the default is "/" so usually you don’t need to set this
  });

  return token;
};
