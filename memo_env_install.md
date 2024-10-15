# 環境準備

## Docker
### Install Docker
Please reference Docker website :
https://docs.docker.com/engine/install/ubuntu/

### Docker 常用 Commands
* docker ps -a
* docker rm

## git
### "Help, I keep getting a 'Permission Denied (publickey) error' when I push!"
This means, on your local machine, you haven't made any SSH keys. Not to worry. Here's how to fix:

1. cd ~/.ssh. This will take you to the root directory for Git (Likely C:\Users\[YOUR-USER-NAME]\.ssh\ on Windows)
2. Within the .ssh folder, there should be these two files: id_rsa and id_rsa.pub. These are the files that tell your computer how to communicate with GitHub, BitBucket, or any other Git based service. Type ls to see a directory listing. If those two files don't show up, proceed to the next step. NOTE: Your SSH keys must be named id_rsa and id_rsa.pub in order for Git, GitHub, and BitBucket to recognize them by default.
3. To create the SSH keys, type `ssh-keygen -t rsa -C "your_email@example.com"`. This will create both id_rsa and id_rsa.pub files.
Now, go and open id_rsa.pub in your favorite text editor (you can do this via Windows Explorer or the OSX Finder if you like, typing open . will open the folder).
Copy the contents--exactly as it appears, with no extra spaces or lines--of id_rsa.pub and paste it into GitHub and/or BitBucket under the Account Settings > SSH Keys. NOTE: I like to give the SSH key a descriptive name, usually with the name of the workstation I'm on along with the date.
4. Now that you've added your public key to Github and/or BitBucket, try to git push again and see if it works. It should!

## Node.js
### Install Node.js
    sudo apt update
    sudo apt install nodejs
    node -v
        Output
        v10.19.0
    sudo apt install npm

## React
### Install React
要安裝一個高效的React環境，我們需要配置babel，webpack等工具，這些工具對於React世界的初學者來說配置起來很複雜。 `create-react-app` 可以簡化 procedure.

    sudo npm install -g create-react-app

verify

    create-react-app --version

以後就可以使用 `create-react-app` 來創建維護 react app

## bootstrap
### Install bootstrap
    cd test01/client_react
    npm install bootstrap
    npm install bootstrap react-bootstrap

## ant design
    npm install antd --save
