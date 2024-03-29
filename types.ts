import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-iron-session";
import { Channel } from "pusher-js";

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
  members: User[];
  host: string;
  connection?: string;
  channel?: Channel;
  _id?: string;
}
