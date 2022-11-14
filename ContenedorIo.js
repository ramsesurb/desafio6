const { promises: fs } = require('fs');

class ContenedorIo{

    async getChat(){
        try{
            const contentChat = JSON.parse(await fs.readFile(`./api/historialChat.json`,'utf-8'))
            return contentChat
        }catch(error){
            console.log(error)
         }
    }

    async saveChat(data){ 
        
        try{
        const chat = await this.getChat()
        const newMensaje = {nombre: data.nombre,mensaje: data.mensaje,}
        await chat.push(newMensaje)
        await fs.writeFile("./api/historialChat.json", JSON.stringify(chat ,null, 2))
        return chat

        }catch(error){
        console.log(error)
        }
    }
    
    }


module.exports = ContenedorIo