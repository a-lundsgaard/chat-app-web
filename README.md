# Chat App: Next.js + HTTP-Only Cookies for secure Authentication

A secure chat app application using HTTP-only cookies for authentication with Next.js.

## Run the project

To run this project you must install node.js (latest recommended)

1. Make sure to create the .env.local file with the correct variables at the root of the project
2. Navigate to the root of the project
3. Install the project dependencies:

```zsh
yarn install
```

4. Run the project:

```zsh
yarn dev
```

The project should now be running at `http://localhost:3000`


## Backend

The backend can be found at [chat-app-api](https://github.com/a-lundsgaard/chat-app-api)

## Demo

A live demo of the app can be found [my-chat.herokuapp.com](https://my-chat.herokuapp.com/). The demo is currently hosted on a Heroku dyno, so it may take a while to load (about 30 seconds).

### How to use

1. Create a user
2. Login
3. Create a chat by searching for a user and adding them to a chat
4. Click start chat

Now open a new incognito window and repeat the steps above with a different user. It is important that is incognito so a new cookie is created for the other user.

 Now you can chat between the two users with realtime updates!