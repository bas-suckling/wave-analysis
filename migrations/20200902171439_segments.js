
exports.up = function(knex) {
    return knex.schema.createTable('segments', table => {
      table.increments('segment_id')  // table key
      table.integer('session_id')     // foreign key
      table.boolean('is_wave')
      table.string('timestamp')
      table.integer('duration')
      table.integer('distance')
      table.text('geometry')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('segments')
  };