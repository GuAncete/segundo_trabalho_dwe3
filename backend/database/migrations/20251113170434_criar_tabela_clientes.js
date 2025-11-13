
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('cliente', (table) => {
    table.increments('idCliente').primary(); 
    table.string('nomeCliente').notNullable(); 
    table.string('cpfCliente').notNullable();
    table.string('telefoneCliente').notNullable();
    table.string('emailCliente').notNullable().unique(); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('cliente');
};