import { withIronSession } from "next-iron-session";

export function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SESSION_PASSWORD,
    cookieName: "planning-poker-iron-session",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}
