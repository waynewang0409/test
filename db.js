import mysql from "mysql";

// 注意 !! 若要包成 docker image, 必須要用 createPool, 不能用 createConnection
export const db = mysql.createPool({
    host: "10.1.71.103",
    port: 8816,
    user: "root",
    password: "sa",
    database: "MyDemo"
})
