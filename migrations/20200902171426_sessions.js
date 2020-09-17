
exports.up = function(knex) {
    return knex.schema.createTable('sessions', table => {
      table.increments('session_id')    // table key
      table.integer('user_id')          // foreign key
      table.string('date',10 )          //      "12-45-78"
      table.integer('duration')         //      in ms (10,000,000 = 3hr)
      table.decimal('surf_dist',3,1)    //      3 sig fig
      table.decimal('paddle_dist',3,1)  //      1 deci places
      table.integer('wave_count')       //
      table.integer('beach_direction')  //
      table.text('raw_file')            //
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('sessions')
  };