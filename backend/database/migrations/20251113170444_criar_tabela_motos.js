/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("moto", (table) => {
    table.increments("idMoto").primary();
    table.string("modeloMoto").notNullable();
    table.string("marcaMoto").notNullable();
    table.string("anoMoto").notNullable();
    table
      .integer("idCliente")
      .references("idCliente")
      .inTable("cliente")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("moto");
};
