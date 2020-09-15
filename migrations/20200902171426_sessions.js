
exports.up = function(knex) {
    return knex.schema.createTable('sessions', table => {
      table.int('session_id')
      table.int('user_id')
      table.string('date')
      table.int('total_time')
      table.int('distance_surfed')
      table.int('distance_paddled')
      table.int('wave_count')
      table.int('beach_direction')
      table.text('raw_file')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users')
  };