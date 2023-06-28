import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Estou funcionando!");
});

app.listen(8090, () => {
  console.log('Servidor online na porta 8090');
});
