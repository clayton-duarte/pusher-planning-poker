import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";

interface RequestWithSession extends NextApiRequest {
  session: Session;
}

export type HandlerWithSession = (
  req: RequestWithSession,
  res: NextApiResponse
) => void | Promise<void>;

export interface User {
  name: string;
  _id?: string;
}

export interface Room {
  host: string;
  crew: User[];
  _id?: string;
}
