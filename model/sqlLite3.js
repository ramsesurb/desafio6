const { options } = require ('../config/sqlLite.js')
const knex = require('knex')(options);


class ClienteSqlChat {
    
    async createTableChat (){
        
        try {
            
            return await knex.schema.dropTableIfExists(`chat`);
        } finally {
            return await knex.schema.createTable(`chat`, table => {
                table.increments("id_chat").primary();
                table.string("nombre", 50).notNullable();
                table.string("mensaje", 500).notNullable();
                
            });
        } 
    }
   
    async insertChat(chat){
        
        await knex("chat").insert(chat)
        .then(() => console.log('Producto agregado'))
    }

    async getChat(){
        try{
            const list = await knex.from('chat').select('*')
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


module.exports = ClienteSqlChat