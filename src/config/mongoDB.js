import mongoose from "mongoose";
import environment from "./environment.js";

class MongoDB {
  static async connectsToDB() {
    try {
      mongoose.connect(environment.mongodb.url);
      return mongoose.connection;
    } catch (err) {
      throw new Error("Erro ao conectar ao banco de dados: " + err.message);
    }
  }

  static async init() {
    const connection = await this.connectsToDB();

    connection.once("open", () => {
      console.log("Conexão com o banco de dados feita com sucesso!");
    });

    connection.on("error", (err) => {
      console.error(
        "Um erro ocorreu durante a conexão com o banco de dados: ",
        err
      );
    });
  }
}

export default MongoDB;
