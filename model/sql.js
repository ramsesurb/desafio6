const { options } = require ('../config/mariaDB.js')
const knex = require('knex')(options);


class ClienteSql {
    
    async createTable (){
        
        try {
            
            return await knex.schema.dropTableIfExists(`productos`);
        } finally {
            return await knex.schema.createTable(`productos`, table => {
                table.increments("id_producto").primary();
                table.string("title", 50).notNullable();
                table.string("thumbnail", 100).notNullable();
                table.float("price", 50).notNullable();
                table.integer("stock", 50).notNullable();
            });
        } 
    }
    async insertProducts(products){
        
        await knex("productos").insert(products)
        .then(() => console.log('Producto agregado'))
    }

    async getArticles(){
        try{
            const list = await knex.from('productos').select('*')
            return list
      
    }
        catch (error) {
            console.log(error)
            return ["error"]
            }
    }
    close() {
        return knex.destroy();
      }

}


module.exports = ClienteSql