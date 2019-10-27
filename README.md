# ping ponguin

![](https://github.com/bigjilm/ping-ponguin-react-app/blob/master/src/assets/pp-logo.png)

I developed **ping ponguin** as my final project during the [neuefische](https://www.neuefische.de) web developer bootcamp in fall 2019.

With ping ponguin you can find people to play ping pong with. You can sign up with your email. If you're signed in, you can see a list of the other registered players. The list can be filtered by residence and ability. If you want to play with someone you can start a chat.

## Tech stack

The app was built using [create-react-app](https://create-react-app.dev/) and a MERN Stack:

- MongoDB
- Express
- React
- Node.js

The chat was built with socket.io.

### Additional dependencies

- bcrypt
- cors
- mongoose
- prop-types
- react-router-dom
- react-scripts
- styled-components
- styled-icons
- use-socket.io-client

### Dev dependencies

- cypress
- eslint-plugin-cypress
- nodemon
- npm-run-all
- storybook
- storybook-react-router

## Usage

To run the app, you need to clone the project. Then run `npm install` in the project directory.

### Set up MongoDB

### Main scripts

```
npm start
```

Runs the app in the development mode and the server with [nodemon](https://github.com/remy/nodemon).
Open http://localhost:3000 to view it in the browser. The server runs on http://localhost:3333.

The page and the server will reload if you make edits.
You will also see any lint errors in the console.

```
npm run cypress
```

Opens [cypress](https://www.cypress.io/) for testing. Currently only a test for the sign in is implemented.

```
npm run storybook
```

Starts storybook. Currently only a small part of the app is in storybook.
