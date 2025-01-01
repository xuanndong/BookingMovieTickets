const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");

require("dotenv").config();

const pay = require("./routes/payment");
const auth = require("./routes/auth");
const cinema = require("./routes/cinema");
const theater = require("./routes/theater");
const movie = require("./routes/movie");
const showtime = require("./routes/showtime");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE, { autoIndex: true })
  .then(() => {
    console.log("mongoose connected!");
  })
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

// app.use(mongoSanitize()) //lọc sạch cac ký tự tự đặc biệt và các đoạn mã độc có thể gây hại
// app.use(helmet()) // cung cấp một số tiêu đề bảo vệ khỏi các tấn công
// app.use(xss()) ngăn chặn các cuộc tấn công cross-site-scripting

app.use("/auth", auth);
app.use("/cinema", cinema);
app.use("/theater", theater);
app.use("/movie", movie);
app.use("/showtime", showtime);
app.use("/payment", pay);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Start server in port http://localhost:${port}`);
});
