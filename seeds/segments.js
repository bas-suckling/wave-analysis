
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('segments').del()
    .then(function () {
      // Inserts seed entries
      return knex('segments').insert([
        {
          segment_id: 1,
          user_id: 1,
          session_id: 1, 
          isWave: true,
          timestamp: "10:59:55 01/08/2020",
          duration: 5400,
          distance: 600,
          geometry: []
        }
      ]);
    });
};
