const bcrypt = require('bcrypt')

let UserData = {
	ID   : 'admin',
	PW   : 'admin',
	info : '테스트용 계정 생성'
}

// bcrypt.hashSync(암호화 할 비밀번호, Salting 양)

const hashedPW = bcrypt.hashSync(UserData.PW, 10)

console.log(hashedPW)