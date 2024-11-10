import "dotenv/config";
import app from "./src/app.js";
import environment from "./src/config/environment.js";

const PORT = environment.port;

app.listen(PORT, () => {
    console.log("Fala que eu tô te escutando!!");
});
