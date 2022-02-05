const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const db = require("./database");

const app = express();

app.use(bodyParser.json()); // post 요청 메소드의 request.body를 읽어옴

app.use(morgan("tiny"));

app.use(
  cors({
    origin: "http://localhost:8080/",
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
  })
);

const port = 3000;

app.get("/api/memos", async (req, res) => {
  const result = await db.run("select * from memos");
  res.send(result);
});

app.post("/api/memos", async (req, res) => {
  await db.run(`insert into memos (content) values ("${req.body.content}")`);
  const result = await db.run("select * from memos");
  res.send(result);
});

app.put("/api/memos/:id", async (req, res) => {
  // console.log(req.params);
  await db.run(`update memos set content = ${req.body.content} where id = ${req.params.id}`);
  const result = await db.run("select * from memos");
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
