import { NextApiHandler } from "next";

import pusher from "../../libs/pusher-server";

const handler: NextApiHandler = (req, res) => {
  const { roomId, message } = req.body;
  pusher.trigger(roomId, "broadcast", { message });
  res.json("ok");
};

export default handler;
