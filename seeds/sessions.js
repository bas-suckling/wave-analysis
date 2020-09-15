
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sessions').del()
    .then(function () {
      // Inserts seed entries
      return knex('sessions').insert([
        {
          user_id: 1,
          date: "10:59:25 01/08/2020",
          total_time: 5400,
          distance_surfed: 600,
          distance_paddled:5000,
          wave_count:26,
          beach_direction: 130,
          raw_file: "huge string"
        }
      ]);
    });
};
