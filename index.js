const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();

app.use(bodyParser.json()); // post 요청 메소드의 request.body를 읽어옴

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

app.put("/api/memos/:idx", (req, res) => {
  console.log(req.params);
  memos[req.params.idx] = req.body.content;
  res.send(memos);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
