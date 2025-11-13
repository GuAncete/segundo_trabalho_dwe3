/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("tratamento", (table) => {
    table.increments("idTratamento").primary();
    table.string("nomeTratamento").notNullable();
    table.decimal("precoTratamento").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("tratamento");
};
