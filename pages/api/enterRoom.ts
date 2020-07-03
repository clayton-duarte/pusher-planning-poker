import { dbConnect, RoomModel, UserModel } from "../../libs/mongoose";
import { HandlerWithSession } from "../../types";
import { withSession } from "../../libs/session";

const handler: HandlerWithSession = async (req, res) => {
  try {
    // Setting room
    const { roomId } = req.body;
    req.session.set("roomId", roomId);

    // Getting user
    const user = req.session.get("user");

    // Registering user to room
    await dbConnect();
    const room = await RoomModel.updateOne(
      { _id: roomId },
      { $push: { crew: user } }
    );

    // Returning new room
    return res.json(room);
  } catch (err) {
    // TODO error handling
    return res.status(500).json(err);
  }
};

export default withSession(handler);
