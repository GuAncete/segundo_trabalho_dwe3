exports.up = function (knex) {
  return knex.schema.createTable("moto", (table) => {
    table.increments("id_moto").primary();
    table.string("modelo_moto").notNullable();
    table.string("marca_moto").notNullable();
    table.integer("ano_moto").notNullable();

    table
      .integer("id_cliente")
      .unsigned()
      .notNullable()
      .references("id_cliente")
      .inTable("cliente")
      .onDelete("RESTRICT");

    table.boolean("deleted").notNullable().defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("moto");
};
