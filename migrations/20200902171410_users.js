
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments('user_id')
      table.string('email')
      table.string('first_name')
      table.string('last_name')
      table.text('hash')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users')
  };