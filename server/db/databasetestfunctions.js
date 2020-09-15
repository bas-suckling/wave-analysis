const {createUser, getUserEmailByID} = require('./users')

createUser("test2@email.com", "Will", "Naylor", "Password")
.then(data => console.log(data))

getUserEmailByID(1)
.then(data => 
    console.log(data))