import app from "./src/app.js";
import config from "./src/config/index.js";
import connectDB from "./src/db/db.config.js";



const startServer = async () => {
    // Connect database
    await connectDB();
  
    const port = config.PORT || 8000;
  
    app.listen(port, () => {
      console.log(`🎯 Server listening on port: ${port}`);
    });
  };
  
  startServer();