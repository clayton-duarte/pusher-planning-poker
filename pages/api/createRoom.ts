import { NextApiHandler } from "next";

import { dbConnect, RoomModel } from "../../libs/mongoose";

const handler: NextApiHandler = async (req, res) => {
  try {
    await dbConnect();
    const newRoom = await RoomModel.create({
      crew: [],
    });
    return res.json(newRoom);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default handler;
