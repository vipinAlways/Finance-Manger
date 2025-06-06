import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

export default async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGOOSE_URL || "", {});
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("db connection failed", error);
    process.exit(1);
  }
}

export async function dbDisconnect(): Promise<void> {
  if (connection.isConnected) {
    return;
  }
  try {
 await mongoose.disconnect();
  } catch (error) {
    console.error("db connection failed", error);
    process.exit(1);
  }
}
