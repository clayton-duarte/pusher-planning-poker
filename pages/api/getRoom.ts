import { dbConnect, RoomModel } from "../../libs/mongoose";
import { HandlerWithSession } from "../../types";
import { withSession } from "../../libs/session";
import pusher from "../../libs/pusher-server";

const handler: HandlerWithSession = async (req, res) => {
  try {
    // Setting room
    const { roomId } = req.body;
    req.session.set("roomId", roomId);
    await req.session.save();

    // Finding room
    await dbConnect();
    const roomFound = await RoomModel.findById(roomId);

    // Needs to register user?
    const user = req.session.get("user");
    if (!roomFound.members.find(({ _id }) => _id === user._id)) {
      await RoomModel.updateOne({ _id: roomId }, { $push: { members: user } });
      // Trigger room update
      console.log("update-room", roomId);
      pusher.trigger(roomId, "update-room", user);
    }

    // Returning new room data
    console.log(roomId, "update-room", { message: "works" });
    return res.json(roomFound);
  } catch (err) {
    // TODO error handling, room not found, db connect
    return res.status(500).json(err);
  }
};

export default withSession(handler);
