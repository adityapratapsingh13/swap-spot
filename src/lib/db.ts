// import mongoose from "mongoose";

// export const connectMongoDB = async () => {
//   try {
//     const mongoDBUrl = process.env.MONGODB_URL as string;

//     if (!mongoDBUrl) {
//       throw new Error("MONGODB_URL is not defined");
//     }
//     await mongoose.connect(mongoDBUrl);

//     console.log("Connected to MongoDB");
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.log("Error:", error.message);
//     } else {
//       console.log("Error:", error);
//     }
//   }
// };
