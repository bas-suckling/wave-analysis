
exports.up = function(knex) {
    return knex.schema.createTable('segments', table => {
      
      table.increments('session_id')
      table.int('user_id')
      table.int('segment_id')
      table.bool('is_wave')
      table.int('timestamp')
      table.int('duration')
      table.int('distance')
      table.linestring('geometry')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users')
  };