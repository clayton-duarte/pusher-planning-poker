import { HandlerWithSession } from "../../types";
import { withSession } from "../../libs/session";

const handler: HandlerWithSession = async (req, res) => {
  // Getting session data
  const roomId = req.session.get("roomId");
  const user = req.session.get("user");

  // Returning response
  return res.json({ user, roomId });
};

export default withSession(handler);
