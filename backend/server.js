const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDb = require("./Config/dbConnect");
const postRouter = require("./Routes/postRoutes");
const getRouter = require("./Routes/getRoutes");

const app = express();
const path = require('path');

app.use('/uploads/images',express.static(path.join('uploads', 'images')));
app.use(express.json());
app.use(cors());

connectDb();

app.use("/api/post", postRouter);
app.use("/api/get", getRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
