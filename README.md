# CSC3131 - Server
An express server with various devops features.

### Project Team
Sam Oldham, Newcastle University  ([s.l.oldham1@newcastle.ac.uk](mailto:s.l.oldham1@newcastle.ac.uk))   

## Built With

[ExpressJS](https://expressjs.com/)  
[NodeJS](https://nodejs.org/en/)  
[Docker](https://www.docker.com/)

## Getting Started

### Prerequisites

Node version 12,14 or 16

### Installation

npm install

### Running Locally

npm run dev

### Running Tests

npm test

## Deployment

### Local

docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build -V

## Contributing

### Main Branch
Protected and can only be pushed to via pull requests. Should be considered stable and a representation of production code.

### Dev Branch
Should be considered fragile, code should compile and run but features may be prone to errors.

### Feature Branches
A branch per feature being worked on.

https://nvie.com/posts/a-successful-git-branching-model/
