# Question App

App is simple PERN stack app which allows registration, asking questions and sending answers.Users can also add rating (likes or dislikes to questions or answers). App support full CRUD on questions and answers, adding users and change users profile and password.

Check live version: https://mop-task-qa.herokuapp.com/

## Technologies

- Postgres SQL
- Node/Express
- JWT for authentication
- ReactJS with Bootstrap UI

## Installation

- Clone git repository on your local machine
- CD into MOP-TASK folder
- Enter in command line:

```
npm install
```

- CD into FRONTEND folder and enter to command line:

```
npm install
```

- In order to start application make sure you are in MOP-TASK folder. To run application from single terminal enter:

```
npm run dev
```

## Prerequisites

Please make sure you have running POSTGRES server in your local machine. Have in root folder .env file with following environmental variables which corresponds to your local POSTGRES settings:

- PORT
- JWT_SECRET
- PGUSER
- PGHOST
- PGPASSWORD
- PGDATABASE
- PGPORT

## Seed database

In order to seed database with users, questions and answers type in command line, in MOP-TASK folder:

```
npm run seed
```
