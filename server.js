const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// 정적 파일 서빙
app.use(express.static("."));

// HTML 파일들에 대한 라우트
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "admin_register.html"));
});

app.get("/components", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "components.html"));
});

app.get("/member", (req, res) => {
  res.sendFile(path.join(__dirname, "html", "member_management.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다!`);
  console.log(`📱 관리자 등록: http://localhost:${PORT}/admin`);
  console.log(`🧩 컴포넌트: http://localhost:${PORT}/components`);
  console.log(`👥 회원 관리: http://localhost:${PORT}/member`);
});
