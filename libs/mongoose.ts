import mongoose, { Document, Schema } from "mongoose";

import { User, Room } from "../types";

function initializeModel<Type>(name: string, schema: Schema<Type>) {
  type DocumentType = Type & Document;
  if (mongoose.models[name]) return mongoose.model<DocumentType>(name);
  return mongoose.model<DocumentType>(name, schema);
}

// SCHEMAS
const UserSchema = new mongoose.Schema<User>({
  name: String,
});
const RoomSchema = new mongoose.Schema<Room>({
  members: Array,
  host: String,
});

// MODELS
export const UserModel = initializeModel<User>("User", UserSchema);
export const RoomModel = initializeModel<Room>("Room", RoomSchema);

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
