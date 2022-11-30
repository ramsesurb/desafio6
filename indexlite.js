const ClienteSqlChat = require("./model/sqlLite3")
const Sql = new ClienteSqlChat

await Sql.createTablechat()
  .then(() => {
    console.log('1. Tabla creada')})