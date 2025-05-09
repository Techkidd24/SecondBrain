import dotenv from "dotenv";
dotenv.config();
const key = process.env.SECRET_KEY;
if (!key) {
  throw new Error("SECRET_KEY is not defined in the environment variables.");
}

export const secret_key = key;