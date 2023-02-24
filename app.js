require("dotenv").config();
const express = require("express");
// const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST;

const authController = require("./controllers/auth");
const carController = require("./controllers/routes");
// app.use(cors());
console.log(__dirname);
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use("/user", authController);

app.use("/car", carController);

app.listen(PORT, HOST, () => {
  console.log(`[server] running on ${HOST}:${PORT}`);
});
