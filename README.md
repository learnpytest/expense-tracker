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
### Index page
- Listing all expense records.  The records content include:
  - Name
  - Category
  - Date
  - Amount
  - isPublic

- Sorting expense records based on category
- Create, Edit and Delete each expense record
- Review total amount of listed expense records

### New page
- The name, category, date, amount, isPublic are required for creating a new expense record

### Filtering
- User can filter and dislpay expense records based on selected category.

## Error and exception handling
- Error message pops up if user enter incorrect input when creating and editing expense record and will show user correct example
- Confirm window pops up before deleting expense record
- API error handling:
  - Reply 4xx code responding to illeagal API requests
  - Reply 500 code responding to internal server error

### Specifications
- MongoDB
- Express
- Seed data: expense.json
- Using Bootstrap, RWD
- Using RESTFUL API
- Using express-validator
- Custom error handling
- The app has scalabilities to dynamically add more record and category

