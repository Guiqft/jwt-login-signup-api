
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').unsigned().primary();
        table.dateTime('createdAt').notNull();
        table.dateTime('updatedAt').nullable();
        table.dateTime('deletedAt').nullable();
        table.string('name').notNull();
        table.string('surname').notNull();
        table.string('email').unique().notNull();
        table.string('password').notNull();
        table.string('type').notNull();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
