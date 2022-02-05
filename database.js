const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "memo",
  charset: "utf8",
});

module.exports = {
  async run(query) {
    return new Promise((resovle) => {
      conn.connect((error) => {
        if (error) {
          console.log("DB 연결 실패", error);
        } else {
          console.log("DB 연결 성공");
        }
      });

      conn.query(query, (error, rows, fields) => {
        if (error) {
          console.log("쿼리 실패");
        } else {
          console.log("쿼리 성공 / rows : ", rows);
          console.log("fields : ", fields);
          resovle(rows);
        }
      });
    });
  },
};
