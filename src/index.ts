import "dotenv/config";

import connectDB from "./config/db";
import app from "./app";

const PORT = process.env.PORT || process.env.SERVER_PORT || 3001;

// Start Server
const startServer = async () => {
  try {
    // 1. DB connect first
    await connectDB();

    // 2. Start Express server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    // 3. Handle server errors
    server.on("error", (err: any) => {
      console.log("❌ Server Error:", err.message);
    });
  } catch (err: any) {
    console.log("❌ Startup Error:", err.message);
    process.exit(1);
  }
};

startServer();