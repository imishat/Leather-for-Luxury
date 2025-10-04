import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { logger, errorlogger } from "./app/shared/logger";
import { Server } from "http";
process.on("uncaughtException", (error) => {
  console.log(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`🛢   Database is connected successfully`);
    // console.log(`🛢   Database is connected successfully`);

    server = app.listen(config.port, () => {
      console.log(`Application  listening on port ${config.port}`);
      console.log(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("Failed to connect database", err);
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        // console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();
