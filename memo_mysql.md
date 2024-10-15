# MySQL
## Install MySQL
### Download MySQL Docker image
    docker pull mysql

### Prepare local data volume for store MySql data
    mkdir mysql_data

### Start MySQL container
    docker run --name mysql_test01 --rm -e MYSQL_ROOT_PASSWORD=sa -d -v /home/tony/project/react/fullstack_lab_01/mysql_data:/var/lib/mysql -p 8816:3306 mysql
* 將會在 `home/tony/project/react/test01/mysql_data` 看到 MySql 的資料，未來 container 重啟資料會依然保存著
* mysql container 的 3306 port 會 export 到本機的 8816 port，所以 mysql client 可以透過連線至本機的 8816 來存取 mysql

### Stop MySQL container
    docker rm mysql_test01

## Install MySQL WorkBench

### Install
    apt update
    sudo snap install mysql-workbench-community

### Start MySQL workbench
    mysql-workbench-community

### commandline connect to MySQL docker image
    docker exec -it mysql_test01 bash
    mysql -u root -p

### Change root or add new user id for access MySQL from node,js
    ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'YourRootPassword';
    -- or
    CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';