# Expense Tracker
A web application for tracking living expense with CRUD function

## Prerequisites
Make sure you have installed the following prerequisites:
- Node.js
- Dependencies - Make sure you've installed Node.js and npm first, then install depencies using npm:

$ npm install

## Initializing project
Make sure you've got all prerequisites, then initializing project by node using npm scripts:

$ npm run start

or initializing project by nodemon using:

$ npm run dev

Establish seed data to generate Category, Record and User:
$ npm run seed

## Usage
### Login/logout
- Using cookie session based authentication
- You can login as "user" or "admin" role

### User and role management
- As "user" role, you can visit your own dashboard and create, read, edit and delete your expense records
- As "admin role, you can visit admin portal to create new record and can also read, edit and delete all users' expense records
- Try below accounts to test:
  - "user": [
      {
        "firstName": "Steve",
        "email": "captain@hotmail.com",
        "password": "icandothisallday",
        "role": "admin"
      },
      {
        "firstName": "Peter",
        "email": "peter@parker.com",
        "password": "enajyram",
        "role": "user"
      }
    ]

### User Dashboard
- User can access owned user dashboard.  Here it is listing all your expense records.  The records content include:
  - Name
  - Category
  - Date
  - Amount
  - isCollab

- Filtering expense records based on category
- You can access "New" and "Edit" page from here 
- You can Delete each expense record
- You can check total amount of listed expense records

### New page
- On this page you can submit form to create new expense record.  The name, category, date, amount, isCollab are required for creating a new expense record

### Edit page
- On this page you can submit form to confirm edit for existing expense record.  The name, category, date, amount, isCollab are required for creating a new expense record

### Admin Portal
- Only "admin" account has access to admin portal. Here listing all users' expense records.  The records content include:
  - Name
  - Category
  - Date
  - Amount
  - isCollab
- You can access "User Management" from here
- Other features include filtering expense records, editing and deleting all users' expense records, creating and deleting new record

### User Management
- On this page, as "admin" role, you can see list of all users and users' information.  The information include:
  - firstName
  - email
  - role
  - records
- Clicking on each user's record, you can see summary of each user's expense records

## Error and exception handling
- Error message pops over if user enter incorrect input when creating and editing expense record and will show user correct example
- Confirm window pops over before deleting expense record
- API error handling for API requests that are not handled by express routing to avoid leaking information from backend:
  - Reply 4xx code responding to illeagal API requests
  - Reply 500 code responding to internal server error

### Specifications
- MongoDB
- Express
- Seed data: expense.json
- Using Bootstwatch, RWD
- Using RESTFUL API
- Using express-validator
- Custom error handling
- The app has scalabilities to dynamically add more record and category

