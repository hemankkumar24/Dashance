import mongoose from "mongoose";

// we require to cache the connection so that we dont see a connection request repeatedly

// getting the mongo db uri
const MONGODB_URI = process.env.MONGODB_URI;

// global has a type defined for mongoose which contains conn and promise
let cached = global.mongoose;
// connect to the database
export async function connectDB() {

    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is missing");
    }

    if (!cached) {
        cached = global.mongoose = {
            conn: null,
            promise: null,
        };
    }


    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        // basically when you connect with mongo the promise is an instant connection that is basically ensuring that you will get the connection and it loads in the background
        cached.promise = mongoose.connect(MONGODB_URI);
    }

    try {
        // then you store the connection using that promise
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null; // Allow retry on the next call
        throw error;
    }

    return cached.conn;
}