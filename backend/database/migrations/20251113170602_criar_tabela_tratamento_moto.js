/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tratamentomoto', (table) => {
    table.increments('idTratamentoMoto').primary();

    table
      .integer('idMoto')
      .notNullable()
      .references('idMoto')
      .inTable('moto')
      .onDelete('CASCADE');

    table
      .integer('idTratamento')
      .notNullable()
      .references('idTratamento')
      .inTable('tratamento')
      .onDelete('CASCADE');

    table.timestamp('dataServico').notNullable().defaultTo(knex.fn.now());
    table.text('observacaoServico'); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('tratamentomoto');
};