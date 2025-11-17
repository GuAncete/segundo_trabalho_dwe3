
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('usuario', (table) => {
    table.increments('id_usuario').primary(); 
    table.string('nome_usuario').notNullable(); 
    table.string('email_usuario').notNullable().unique(); 
    table.string('senha_usuario').notNullable();
    table.integer('tipo_usuario').notNullable().defaultTo(1);
    table.timestamp('criacao_usuario').defaultTo(knex.fn.now()); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('usuario');
};