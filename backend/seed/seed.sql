DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (50) NOT NULL,
    email VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR (200) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT Now(),
    PRIMARY KEY(user_id)
);
CREATE TABLE questions (
    question_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT,
    text VARCHAR (500),
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    created_on TIMESTAMP NOT NULL DEFAULT Now(),
    PRIMARY KEY(question_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE answers (
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
);