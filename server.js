const express = require('express');
const Contenedor = require('./Contenedor')
const productos = new Contenedor('./api/productos.json')

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);

const io = new IOServer(httpServer);

const mensajes = [];

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (express.static( "./public"))
app.set("views", "./public")
app.set("view engine", "ejs")

app.get('/',async  (req, res) => {
  const prods = await productos.getAll()
    
  res.render('index' ,{productos:prods });
  });


app.post("/productos",async (req,res)=> {
  const prod= req.body;
  try
  {const saveProd = await productos.save(prod);  
   res.send (saveProd)
   res.redirect('/');
    next();
  }  
  catch (err) {
   console.log(err);
  }
  finally {
    res.redirect('/')
  }
});


io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!');

  //chat
  socket.emit('mensajes', mensajes);

  socket.on('new-message', data => {
    mensajes.push(data);
    io.sockets.emit('mensajes', mensajes);
    
  })
 
  // productos

  const prods = await productos.getAll()
 
  socket.emit("productos", prods)

  socket.on("nuevoProducto", saveProd => {
    prods.push(saveProd)
    io.sockets.emit("productos",prods)
})

});

const port = 8080;

const server = httpServer.listen(port, () => {
  console.log(`servidor escuchando en http://localhost:${port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));