
const { promises: fs } = require('fs');
const ClienteSql = require("./model/sql")
const Sql = new ClienteSql 


class Contenedor {
   
    async getAll(){
        try {
            const content = await Sql.getArticles()
            return content
            
        } catch (error) {
        console.log(error)
        return []
        }
    }
    async getByid (id){
        try {
            const prod = await rute.getAll()
            const getByid = prod.filter(e => e.id === id)
            
            return getByid
        } catch (error) {
        console.log(error)
        }

    }
    async deleteById (id){
        try {
            const content = await rute.getAll()
            const deleteByid = content.filter(e => e.id !== id)
            await fs.writeFile(`./api/productos.json`, JSON.stringify(deleteByid ,null, 2))
            console.log(deleteByid)
            return deleteByid
            
            
        } catch (error) {
        console.log(error)
        }

    }
    async deleteAll (){
        try {
            let products = await rute.getAll()
            products = []
           
        } catch (error) {
        console.log(error)
        }

    }
    async save (prod){
        try {
            const saveCont = await this.getAll()
            const lastId = saveCont.length
            const newProduct = {id_producto:(lastId+1), title: prod.title ,price: prod.price, thumbnail: prod.thumbnail,stock:8 }
            await saveCont.push(newProduct)
            await Sql.insertProducts (newProduct)
            return saveCont
           
        } catch (error) {
        console.log(error)
        }
    }

    
}
    
const rute = new Contenedor ("productos.json")
module.exports = Contenedor


