import { HandlerWithSession } from "../../types";
import { withSession } from "../../libs/session";

const handler: HandlerWithSession = async (req, res) => {
  // Destroying session data
  await req.session.destroy();

  // Returning response
  return res.json({ isSuccess: true });
};

export default withSession(handler);
