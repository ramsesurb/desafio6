const { promises: fs } = require('fs');
const ClienteSqlChat = require("./model/sqlLite3")
const Sql = new ClienteSqlChat

class ContenedorIo{

    async getChat(){
        try{
            
            const contentChat = await Sql.getChat()
            console.table(contentChat)
            return contentChat
        }catch(error){
            console.log(error)
         }
    }

    async saveChat(data){ 
        
        try{
        const chat = await this.getChat()
        const lastId = chat.length
        const newMensaje = {id_chat:(lastId+1),nombre: data.nombre,mensaje: data.mensaje,}
        await chat.push(newMensaje)
        await Sql.insertChat(newMensaje)
        await fs.writeFile("./api/historialChat.json", JSON.stringify(chat ,null, 2))
        return chat

        }catch(error){
        console.log(error)
        }
    }
    
    }


module.exports = ContenedorIo