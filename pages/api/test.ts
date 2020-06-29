import { NextApiHandler } from "next";
import Pusher from "pusher";

const pusher = new Pusher({
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  appId: process.env.PUSHER_ID,
});

const handler: NextApiHandler = (req, res) => {
  pusher.trigger("my_channel", "my_event", {
    message: "hello world",
  });
  res.json("ok");
};

export default handler;
