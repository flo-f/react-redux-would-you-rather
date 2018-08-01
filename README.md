# Would You Rather Project

This is the final assessment project for Udacity's React & Redux course by Florian Feigenbutz.

The `_DATA.js` file represents a mock database and it's API.

This app was built using the provided starter code with a React/Redux front end for the application. It was created using [Create React App](https://github.com/facebook/create-react-app) to bootstrap the project.

## Installing

The project used `npm`. Please execute the following command to install dependencies:

`$ npm install`

## Running

Please execute the following command to start the project:

`$ npm start` 

A server will be started at `http://localhost:3000` and a browser will be automatically started pointing to this location.

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

