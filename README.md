# feco-api

This project uses the MEAN stack to test a web-based app to manage Fecobionics Studies as a mock server for testing.

## Required Software
The following are pre-requisites and defined for the Windows platform. These instructions are valid for the versions specified as of 25 Mar 2019. May be updated to account for future versions. 

| Software|Version|Download Link | Command Line Test | Additional Notes
|---|---|---|---|---
|Node |10.15.0 LTS |https://nodejs.org/en/| `node --version`
|Express | 4.16.0 | Install via `npm`: `npm install -g express`| `express --version`
|Visual Studio Code | 1.3.0 |https://code.visualstudio.com/download | `code .` in any new folder |

## Usage
1. Navigate into the feco-mock-wtu-api- folder via the command line. Start Visual Studio code:
```
C:\feco-mock-wtu-api> code .
```
3. Start a new terminal and type `npm install` to download and install dependencies specified in `package.json`.
4. Type `npm run dev` to run a dev server listening on port 3000.

