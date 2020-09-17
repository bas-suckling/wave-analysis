const database = require('./connection')

function createUser (email, first_name, last_name, hash, db = database) {
    console.log('creating user ', first_name)
    // check email doesn't exist
    return db('users').insert({email, first_name, last_name, hash}, "user_id")  
  }

function removeUser (user_id, db = database) {
    console.log('error remove user not set up')
    return
}

function getUserEmailByID (user_id, db = database) {
    return db('users').where("user_id", user_id)

}

function changeFName (id, first_name, db = database) {
    console.log('error change first name not set up')
    return
}

function changeLName (id, last_name, db = database) {
    console.log('error change last name not set up')
    return
}

function changeEmail (id, email, db = database) {
    console.log('error change email not set up')
    return
}

function changePWord (id, pword, db = database) {
    console.log('error change pWord not set up')
    return
}

module.exports = {
    createUser,
    getUserEmailByID
}