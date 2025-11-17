exports.up = function (knex) {
  return knex.schema.createTable("usuario", (table) => {
    table.increments("id_usuario").primary();
    table.string("nome_usuario").notNullable();
    table.string("email_usuario").notNullable().unique();
    table.string("senha_usuario").notNullable();
    table.integer("tipo_usuario").notNullable().defaultTo(1);
    table.boolean("deleted").notNullable().defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("usuario");
};
