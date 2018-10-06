# Memestream

Description

## Start Dev
To start the project once the setup is complete, run
```
npm run dev
```

## Setup
Install Dependencies
```
npm install
```
Deploy a (https://dzone.com/articles/docker-for-mac-mysql-setup)[local Mysql database with docker] with the following command
```
docker run -p 3306:3306 -d --name mysql -e MYSQL_ROOT_PASSWORD=password mysql/mysql-server
```
Create a user in the database
```
docker exec -it mysql bash
```
```
mysql -uroot -ppassword
```
```
CREATE USER 'admin'@'%' IDENTIFIED BY 'nimda';
```
```
GRANT ALL PRIVILEGES ON * . * TO 'admin'@'%';
```
>There exists an issue currently where it is required for you to run
> ``` ALTER USER 'admin' IDENTIFIED WITH mysql_native_password BY 'nimda' ```
