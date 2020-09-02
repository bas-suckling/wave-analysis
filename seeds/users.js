
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          user_id: 1,
          email: 'test@email.com',
          first_name: "Bas",
          last_name: "Suckling",
          hash: "abcdefghijklmnopqurstuvwxyz"
        },

      ]);
    });
};
