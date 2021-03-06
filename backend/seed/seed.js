const dotenv = require("dotenv").config({ path: "../../.env" });
const db = require("../db/index");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const questions = JSON.parse(
  fs.readFileSync(`${__dirname}/questions.json`, "utf-8")
);
const answers = JSON.parse(
  fs.readFileSync(`${__dirname}/answers.json`, "utf-8")
);

const seed = async () => {
  try {
    await db.query("DROP TABLE IF EXISTS users CASCADE");
    await db.query("DROP TABLE IF EXISTS questions CASCADE");
    await db.query("DROP TABLE IF EXISTS answers CASCADE");

    await db.query(`CREATE TABLE users (
        user_id INT GENERATED ALWAYS AS IDENTITY,
        name VARCHAR (50) NOT NULL,
        email VARCHAR (255) UNIQUE NOT NULL,
        password VARCHAR (200) NOT NULL,
        created_on TIMESTAMP NOT NULL DEFAULT Now(), PRIMARY KEY(user_id)
    )`);

    await db.query(`CREATE TABLE questions (
        question_id INT GENERATED ALWAYS AS IDENTITY,
        user_id INT,
        text VARCHAR (500),
        likes INT DEFAULT 0,
        dislikes INT DEFAULT 0,
        created_on TIMESTAMP NOT NULL DEFAULT Now(), 
        PRIMARY KEY(question_id),
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
    )`);

    await db.query(`CREATE TABLE answers (
        answer_id INT GENERATED ALWAYS AS IDENTITY,
        user_id INT,
        question_id INT,
        text VARCHAR (500),
        likes INT DEFAULT 0,
        dislikes INT DEFAULT 0,
        created_on TIMESTAMP NOT NULL DEFAULT Now(), 
        PRIMARY KEY(answer_id),
        FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE, 
        FOREIGN KEY(question_id) REFERENCES questions(question_id) ON DELETE CASCADE
    );`);
  } catch (error) {
    console.log(error);
  }

  try {
    for (user of users) {
      let hashedPassword = await bcrypt.hash(user.password, 10);
      await db.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) returning *",
        [user.name, user.email, hashedPassword]
      );
    }

    for (question of questions) {
      let randomRatingLikes = Math.floor(Math.random() * 20) + 1;
      let randomRatingDislikes = Math.floor(Math.random() * 20) + 1;
      let randomUserId = Math.floor(Math.random() * 5) + 1;
      let randomAnswerId = Math.floor(Math.random() * 10) + 1;
      const result = await db.query(
        "INSERT INTO questions (text, user_id, likes, dislikes) VALUES ($1, $2, $3, $4) returning *",
        [question.text, randomUserId, randomRatingLikes, randomRatingDislikes]
      );
    }

    for (answer of answers) {
      let randomRatingLikes = Math.floor(Math.random() * 20) + 1;
      let randomRatingDislikes = Math.floor(Math.random() * 20) + 1;
      let randomUserId = Math.floor(Math.random() * 5) + 1;
      let randomQuestionId = Math.floor(Math.random() * 10) + 1;
      const result = await db.query(
        "INSERT INTO answers (text, user_id, question_id, likes, dislikes) VALUES ($1, $2, $3, $4, $5) returning *",
        [
          answer.text,
          randomUserId,
          randomQuestionId,
          randomRatingLikes,
          randomRatingDislikes,
        ]
      );
    }

    console.log("Data Imported...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

seed();
