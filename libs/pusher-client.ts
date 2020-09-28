import Pusher from "pusher-js";

Pusher.logToConsole = process.env.NODE_ENV === "development";

export enum PusherEvents {
  STATE_CHANGE = "state_change",
  UPDATE_ROOM = "update-room",
}

const channel = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

export default channel;
