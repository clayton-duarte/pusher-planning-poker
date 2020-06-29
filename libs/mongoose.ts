import mongoose from "mongoose";

function initializeModel<Type>(model, schema) {
  type Doc = Type & Document;
  if (mongoose.models[model]) return mongoose.model<Doc>(model);
  return mongoose.model<Doc>(model, schema);
}

// SCHEMAS
const RoomSchema = new mongoose.Schema({
  crew: Array,
});

// MODELS
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
