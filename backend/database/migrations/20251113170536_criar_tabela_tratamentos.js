exports.up = function (knex) {
  return knex.schema.createTable("tratamento", (table) => {
    table.increments("id_tratamento").primary();
    table.string("nome_tratamento").notNullable();
    table.decimal("valor_tratamento", 10, 2).notNullable();
    table.text("descricao_tratamento").nullable();

    table.boolean("deleted").notNullable().defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tratamento");
};
