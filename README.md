## Tension Chat Server

### About the Project 
This is a school project that is a mock competitor to [Slack](https://slack.com/). It aims to mimic the chat room experience. 
### SQLite3 - IMDB DB
[SQLite3](https://www.sqlite.org/index.html) is a tool that can be used alongside Node.js to query a database with SQL. This allowed us to pull dynamic data for users and chatrooms.
### Node.js - Express.js
[Node.js](https://nodejs.org/en/) is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code server-side. This was used to execute commands with SQLite3 and serve files to the browser. [Express.js](https://expressjs.com/) is a web application framework for Node.js that allows for better management of requests made to the Node.js server.
### Bootstrap4 - Angular.js - jQuery
This site was created using both [Bootstrap 4](https://getbootstrap.com/) and [AngularJS](https://angularjs.org/). Bootstrap was used to format the page correctly using their grid system to section the page and provide some default CSS styling. Angular was used for sending requests to the Node.js server for dynamic data to populate and edit the pages. We also used jQuery for manipulation of the DOM.
### Socket.io
We used [Socket.io](https://socket.io/) to send messages from the server to users in chatrooms.
### CSS Emoticons
A JS library that converts simple text to emiticons. This allows the users to send and receive emoticons. More can be found [Here](https://os.alfajango.com/css-emoticons/).
