# capstoneProject
Home As Haven

Installation

To install and run the application, follow these steps:

Clone the repository to your local machine.

Navigate to the root directory of the project.

Run npm install to install all dependencies.

Navigate to the client directory and run npm install again to install client-side dependencies.

In the root directory of the project, create a .env file and add the following environment variables:

MONGO_URL=<your MongoDB Atlas connection string>

PASS_SEC=<your CryptoJS secret key>

JWT_SEC=<your JWT secret key>

MAILGUN_DOMAIN=<your Mailgun domain>

MAILGUN_API_KEY=<your Mailgun API key>



Run npm start to start the development server for both the client and server.

Usage

Once the application is running, you can access it by visiting http://localhost:3000 in your browser. 

The client-side code will be served by the React development server, while the server-side code will 

be served by the Node.js/Express server at http://localhost:5000.

Technologies Used

React.js

Node.js

Express.js

MongoDB Atlas

Mongoose

Mailgun


Future Improvements

Acknowledgements
