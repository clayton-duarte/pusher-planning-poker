import Pusher from "pusher-js";

Pusher.logToConsole = process.env.NODE_ENV === "development";

export default new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});
