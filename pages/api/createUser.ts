import { dbConnect, UserModel } from "../../libs/mongoose";
import { HandlerWithSession } from "../../types";
import { withSession } from "../../libs/session";

const handler: HandlerWithSession = async (req, res) => {
  const { name } = req.body;

  // Creating User
  try {
    await dbConnect();
    const newUser = await UserModel.create({
      name,
    });

    // Saving and return
    req.session.set("user", newUser);
    await req.session.save();
    return res.json(newUser);
  } catch (err) {
    // TODO error handling
    return res.status(500).json(err);
  }
};

export default withSession(handler);
