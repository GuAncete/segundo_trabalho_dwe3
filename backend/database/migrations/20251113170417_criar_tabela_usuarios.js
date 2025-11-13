
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('usuario', (table) => {
    table.increments('idUsuario').primary(); 
    table.string('nomeUsuario').notNullable(); 
    table.string('emailUsuario').notNullable().unique(); 
    table.string('senhaUsuario').notNullable();
    table.integer('tipoUsuario').notNullable().defaultTo(1);
    table.timestamp('criacaoUsuario').defaultTo(knex.fn.now()); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('usuario');
};