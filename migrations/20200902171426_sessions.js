
exports.up = function(knex) {
    return knex.schema.createTable('sessions', table => {
      table.increments('session_id')
      table.integer('user_id')
      table.string('date', 255)
      table.integer('total_time')
      table.integer('distance_surfed')
      table.integer('distance_paddled')
      table.integer('wave_count')
      table.integer('beach_direction')
      table.text('raw_file')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('sessions')
  };