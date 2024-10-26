const corsAnywhere = require("cors-anywhere");
const port = 8080;
const host = "localhost";

corsAnywhere
  .createServer({
    originWhitelist: [],
  })
  .listen(port, host, () => {
    console.log("CORS Anywhere is running");
  });
