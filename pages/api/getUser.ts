import { HandlerWithSession } from "../../types";
import { withSession } from "../../libs/session";

const handler: HandlerWithSession = async (req, res) => {
  try {
    // Getting session data
    const user = req.session.get("user");
    console.log(user);
    // Returning response
    return res.json(user);
  } catch (err) {
    switch (err?.code) {
      case "ERR_INVALID_ARG_TYPE":
        return res.status(404).json(err);
      default:
        return res.status(500).json(err);
    }
  }
};

export default withSession(handler);
