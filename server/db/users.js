const database = require('./connection')

function createUser (email, first_name, last_name, hash, db = database) {
    console.log('creating user ', first_name)
    return db('users').insert({email, first_name, last_name, hash}, "user_id")  
  }

function getUserEmailByID (user_id, db = database) {
    return db('users').where("user_id", user_id)
}

module.exports = {
    createUser,
    getUserEmailByID
}