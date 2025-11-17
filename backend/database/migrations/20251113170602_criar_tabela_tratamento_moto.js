exports.up = function (knex) {
  return knex.schema.createTable("moto_tratamento", (table) => {
    table.increments("id_moto_tratamento").primary();

    table
      .integer("id_moto")
      .unsigned()
      .notNullable()
      .references("id_moto")
      .inTable("moto")
      .onDelete("CASCADE");

    table
      .integer("id_tratamento")
      .unsigned()
      .notNullable()
      .references("id_tratamento")
      .inTable("tratamento")
      .onDelete("CASCADE");

    table.boolean("deleted").notNullable().defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("moto_tratamento");
};
