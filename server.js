const bcrypt = require('bcrypt');
const qs     = require('qs');
const fs     = require('fs');
const http   = require('http');
const mysql  = require('mysql2');

const conn   = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'test_youn'
})

conn.connect((err)=>{
  if (err) {console.log('error!'); throw err} else {console.log('DB Server running')}
})
const server = http.createServer((req,rep)=>{
  if (req.method ==='GET' && req.url === '/') {
    const firstPage = fs.readFileSync('./index.html','utf-8');
    rep.writeHead(200, {'Content-Type':'text/html'});
    rep.end(firstPage);
  }
  if (req.method === 'POST' && req.url.includes('CheckLogin')) {
    let data = "";
    req.on('data',(chunk)=>{
      data += chunk;
    })
    req.on('end',()=>{
      const parsedData = qs.parse(data);
      conn.query(`select ID,PW from m_info where ID = '${parsedData.ID}'`,(err,result)=>{
        if (result.length === 1) {
          if (parsedData.ID === result[0].ID && bcrypt.compareSync(parsedData.PW,result[0].PW) === true) {
            console.log('모두 맞음');
          } else {console.log('비밀번호 틀림');}
        } else {console.log('없음');}
      })
    })
  }
})
server.listen(2080,(err)=>{
  if (err) {console.log('error!'); throw err;
  } else {console.log('App Server running port : 2080');}
})