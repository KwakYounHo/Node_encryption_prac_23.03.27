const mysql  = require('mysql2');
const bcrypt = require('bcrypt');

// *User 회원가입 정보 =======================================
// !User 비밀번호는 따로 저장 (암호화 해서 저장하기 위해)
let UserData = {
  ID     : 'test',
  talk   : '암호화 테스트용 계정'
}
// *=========================================================



// *User 비밀번호 ============================================
let UserPW   = 'abAB121'
// *=========================================================



// *DB 입력값 자동화 =========================================
let Attribute      = Object.keys(UserData).join();
let valuesArray    = Object.values(UserData);
let values         = valuesArray.map(element=>{return `\'${element}\'`}).join()
// *=========================================================



// *비밀번호 암호화 ==========================================
let hashPW = bcrypt.hashSync(UserPW, 10);
// *=========================================================



// *DB 연결 =================================================
const conn = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'test_youn'
})
conn.connect()
// *=========================================================



// *DB에 입력 ================================================
let insertSQL = `
insert into m_info (${Attribute},PW)
values (${values},'${hashPW}')
`
conn.query(insertSQL, (err,result)=>{
  if (err) {
    throw err;
  } else {
    console.log(result);
  }}
)
// *==========================================================



// *DB에서 조회 ==============================================
let selectSQL = `
select ID,PW from m_info where ID = '${UserData.ID}'
`
conn.query(selectSQL,(err,result)=>{
  if (err) throw err;
  if (bcrypt.compareSync('snhn43jk24bnkj', result[0].PW) === true) {
    console.log('로그인 성공');
  } else {
    console.log('로그인 실패');
  }
})
// *==========================================================

