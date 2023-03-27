const bcrypt = require('bcrypt');

const APW = bcrypt.hashSync('admin',10);
const BPW = bcrypt.hashSync('admin',10);

function check() {
  if (APW === BPW) {
    return true;
  } else {
    return false;
  }
}

console.log(check());

const checkPW = bcrypt.compareSync('admin123123',BPW);
console.log(checkPW);