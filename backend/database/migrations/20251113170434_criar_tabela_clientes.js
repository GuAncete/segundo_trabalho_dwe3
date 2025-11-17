exports.up = function (knex) {
  return knex.schema.createTable("cliente", (table) => {
    table.increments("id_cliente").primary();
    table.string("nome_cliente").notNullable();
    table.string("cpf_cliente").notNullable().unique();
    table.string("telefone_cliente").notNullable();
    table.string("email_cliente").notNullable().unique();
    table.boolean("deleted").notNullable().defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cliente");
};
