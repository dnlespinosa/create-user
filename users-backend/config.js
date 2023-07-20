require('dotenv').config();
require('colors');

const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev'

const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
    return (process.env.NODE_ENV === 'test')
        ? 'postgres://dnlespinosa:rice4eat@localhost:5432/new_users_test'
        : process.env.DATABASE_URL || 'postgres://dnlespinosa:rice4eat@localhost:5432/new_users'
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === 'test' ? 1 : 12;

console.log('Users Config:'.green);
console.log('SECRET_KEY:'.yellow, SECRET_KEY);
console.log('PORT'.yellow, PORT.toString());
console.log('Database:'.yellow, getDatabaseUri());
console.log('---')

module.exports =  {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR, 
    getDatabaseUri
}