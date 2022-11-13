
const { profileEnd } = require('console');
const { promises: fs } = require('fs');
const { json } = require('stream/consumers');

class Contenedor {
   
    async getAll(){
        try {
            const content = JSON.parse(await fs.readFile(`./api/productos.json`,'utf-8'))
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
            const newProduct = {id:(lastId+1), tittle: prod.tittle ,price: prod.price, thumbnail: prod.thumbnail }
            await saveCont.push(newProduct)
            await fs.writeFile(`./api/productos.json`, JSON.stringify(saveCont ,null, 2))
            return saveCont
           
        } catch (error) {
        console.log(error)
        }
    }

    
}
    
const rute = new Contenedor ("productos.json")
module.exports = Contenedor


