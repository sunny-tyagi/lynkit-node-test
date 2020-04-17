# lynkit-node-test

This project uses the Node, express & mongodb to test a server-based app to solve the questions provide by lynkit.

## Required Software
The following are pre-requisites and defined for the Windows platform. These instructions are valid for the versions specified as of 16 Apr 2020. May be updated to account for future versions. 

| Software|Version|Download Link | Command Line Test | Additional Notes
|---|---|---|---|---
|Node |12.16.2 LTS |https://nodejs.org/en/| `node --version`
|Express | 4.17.1 | Install via `npm`: `npm install -g express`| `express --version`
|Visual Studio Code | 1.3.0 |https://code.visualstudio.com/download | `code .` in any new folder
|Postman | 7.22.1 |https://www.postman.com/downloads/| -

## Usage
1. Navigate into the lynkit-node-test folder via the command line. Start Visual Studio code:
```
C:\lynkit-node-test> code .
```
3. Start a new terminal and type `npm install` to download and install dependencies specified in `package.json`.
4. Type `npm run dev` to run a dev server listening on port 5000.
5. Import postman collection shared in postman folder. Please find the path: 'lynkit-node-test\postman\Lynkit-Node-Test.postman_collection.json'
6. Import postman enviornment shared in postman folder. Please find the path: 'lynkit-node-test\postman\Lynkit-Node-Test.postman_environment.json' 

## Questions
1. Write a program in node js, as per above diagram, if Promise A resolve then only B & C will be
called and once (B+C) resolve, then D -> E if any error occurred in E then again D will be called
till E is resolved.

Solution: I have created an Api. Please find the path of the function or Api: 'controllers/usersCtrl/addDetails' and you can check the response via postman Api: "Ques-1".

2. Write a program to, fetch data from the above URL and write all data into a single file
(append mode, use URL as a separator while appending data into a single file).

Solution. I have created an Api. Please find the path of the function or Api: 'controllers/usersCtrl/getAndAppendData' and you can check the response via postman Api: "Ques-2".

3. A) Write a program to read data from database (mongodb [mongoose] ) having nested
loop.

Solution: I have created an Api. Please find the path of the function or Api: 'controllers/usersCtrl/getUsersDetails' and you can check the response via postman Api: "Ques-3".

B) Write a program to demonstrate mongoose pre hook save.

Solution: I have created a pre hook save in user model. Please find the path of the file: 'models/users.js' and visit line no: 34.

C) Design a schema in mongoose for : [ Category, Product, Product _Details].

Solution: Please find all the schemas in "models" folder as required.