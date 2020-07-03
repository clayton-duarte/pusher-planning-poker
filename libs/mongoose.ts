import mongoose, { Document, Schema } from "mongoose";

import { User, Room } from "../types";

function initializeModel<Type extends Document>(name: string, schema: Schema) {
  if (mongoose.models[name]) return mongoose.model<Document>(name);
  return mongoose.model<Type>(name, schema);
}

// SCHEMAS
const UserSchema = new mongoose.Schema<User>({
  name: String,
});
const RoomSchema = new mongoose.Schema<Room>({
  host: String,
  crew: Array,
});

// MODELS
export const UserModel = initializeModel("User", UserSchema);
export const RoomModel = initializeModel("Room", RoomSchema);

// CONNECTION
export async function dbConnect() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB}`, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      w: "majority",
    });
  }

  return;
}
