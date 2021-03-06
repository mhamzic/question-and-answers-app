const dotenv = require("dotenv").config();
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));
app.use("/api/answers", require("./routes/answerRoutes"));

// Serve Frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Question App / MOP-Task API" });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
