import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "PORTFOLIO",
    })
    .then(() => {
      console.log("connected to db");
    })
    .catch((error) => {
      console.log(`some error occurred while connecting to db ${error} `);
    });
};

export default dbConnection;
