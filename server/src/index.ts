import app from "./app";
import { port } from "./config";

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
