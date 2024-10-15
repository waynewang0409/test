# Node.js

## `注意`
1. 注意視情況調整 db.js 裡面 ip & port 設定
2. firewall port 8800 must be opened.

## creare new nodejs APP
    mkdir server_nodejs
    cd server_nodejs
    npm init -y

## install express web framework 套件
    npm install --save express

## install mysql 套件
    npm install --save mysql

## install jsonwebtoken 套件
    npm install --save jsonwebtoken

## install cors 套件
    npm install cors

## start nodejs APP
    node index.js

## use nodemon to monitor file change and auto restart nodejs APP
    npm install --save-dev nodemon
    update package.json
        "scripts": {
        "start": "nodemon index.js"
    },
    npm start

## kill nodejs process
    npx kill-port 8800

## `docker 程序`

### docker build
    cd /home/tony/project/react/fullstack_lab_01/server_nodejs
    docker build . -t tonyhhc/fullstack_lab01_nodejs

### run nodejs docker image
    docker run --name fullstack_lab01_nodejs --rm -p 8800:8800 -d tonyhhc/fullstack_lab01_nodejs

### stop nodejs docker container
    docker kill fullstack_lab01_nodejs