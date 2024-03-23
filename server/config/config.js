import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const BACKEND = process.env.BACKEND;
const SALT = process.env.SALT;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const FRONTEND = process.env.FRONTEND;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXPIRY,
  BACKEND,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
  CLOUDINARY_URL,
  EMAIL,
  FRONTEND,
  MONGO_URL,
  PASSWORD,
  PORT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXPIRY,
  SALT,
};
