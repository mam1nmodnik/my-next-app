
const isProduction = process.env.NODE_ENV === "production";
const defaultApiUrl = "http://localhost:4200";

export const env = {
  port: Number(process.env.PORT ?? 4200),
  databaseUrlDev: process.env.NEXT_PUBLIC_DATABASE_URL_DEV ?? defaultApiUrl,
  databaseUrlProd: process.env.NEXT_PUBLIC_DATABASE_URL_PROD ?? "",
};

export const NEXT_PUBLIC_DATABASE_URL_DEV = isProduction
  ? env.databaseUrlProd || env.databaseUrlDev
  : env.databaseUrlDev;
