
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('segments').del()
    .then(function () {
      // Inserts seed entries
      return knex('segments').insert([
        {
          session_id: 1, 
          is_wave: true,
          timestamp: "10:59:55 01/08/2020",
          duration: 5400,
          distance: 600,
          geometry: []
        }
      ]);
    });
};
