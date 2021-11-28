# Interactive video annotator for recorded lectures
An interactive lecture viewing platform for online classes
- Front-end : React
- Back-end : Flask
- Database : Firebase + MongoDB

## Features
- Platform that integrates lecture viewing with an interactive component 
- Allows students to post their queries that will be time-stamped to track the location and context of the query within the lecture
- Allows teachers to upload and keep track of their lectures 
- Allows teachers to view the queries, understand the context and answer them accordingly

## Installation and Usage

Prerequisites : npm

1. Clone the github repository
```bash
$ git clone https://github.com/madhoo29/Video-annotator.git
```

2. Enter root directory and run the following command

```bash
$ cd react-flask-app
$ npm start
```
3. Run the following command in a new terminal

```bash
$ cd react-flask-app
$ cd api
$ python3 api.py
```
4. Run the following command in a new terminal

```bash
$ cd react-flask-app
$ cd auth-service
$ node server  
```
