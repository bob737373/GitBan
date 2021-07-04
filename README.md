# GitBan
Kanban board with GitHub integration

If you intend to run a page with live server or live preview, you will need to change the linked files (css, js, imgs, etc) to be relative to the .html file itself and not relative to the server.

To run the server through app.js, run the following in the terminal: 
    "npm run start-server"

To update dependencies, run the following in the terminal: 
    "npm install"

.env should contain 4 variables:
    DB_CONNECTION,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    SESSION_SECRET

DB_CONNECTION is used to connect to the MongoDB.
GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are used to authenticate with a user's GitHub account.
SESSION_SECRET is used to store authentication so it persists across pages and tabs.