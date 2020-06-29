import Pusher from "pusher";

export default new Pusher({
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  appId: process.env.PUSHER_ID,
});
