import { app } from "./app.js";
import { connectDB } from "./config/mongodb.js";
// import { env } from "./utils/env.js";

const port = process.env.PORT || 3000;
try {
  await connectDB();
  app.listen(port, () => {
    console.log(`🐴 🐴 Server is running on port ${port}`);
  });
} catch (error) {
  console.error("Server start failed", error);
}
