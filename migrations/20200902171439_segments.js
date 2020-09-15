
exports.up = function(knex) {
    return knex.schema.createTable('segments', table => {
      table.increments('session_id')
      table.integer('user_id')
      table.integer('segment_id')
      table.boolean('is_wave')
      table.integer('timestamp')
      table.integer('duration')
      table.integer('distance')
      table.text('geometry')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('segments')
  };