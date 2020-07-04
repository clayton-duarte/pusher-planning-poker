import { dbConnect, RoomModel } from "../../libs/mongoose";
import { HandlerWithSession } from "../../types";
import { withSession } from "../../libs/session";

const handler: HandlerWithSession = async (req, res) => {
  const user = req.session.get("user");

  try {
    // Create room
    await dbConnect();
    const newRoom = await RoomModel.create({
      members: [user],
      host: user,
    });

    // Save and return
    req.session.set("roomId", newRoom._id);
    await req.session.save();
    return res.json(newRoom);
  } catch (err) {
    // TODO error handling
    return res.status(500).json(err);
  }
};

export default withSession(handler);
