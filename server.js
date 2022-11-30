const express = require('express');
const Contenedor = require('./Contenedor')
const ContenedorIo = require('./ContenedorIo');
const productos = new Contenedor('./api/productos.json')
const historial = new ContenedorIo (".api/historialChat.json")

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
  res.render('index');
  });

  



io.on('connection', async socket => {
  console.log('Nuevo cliente conectado!');

  //chat
  socket.emit('mensajes', historial.getChat());

  socket.on('new-message', async data => {
    await historial.getChat(data);
    io.sockets.emit('mensajes', historial.getChat());
    
  })

  //historial del chat
  const chat = await historial.getChat()
  socket.emit('mensajes', chat )
  socket.on('new-message', async data => {

    await historial.saveChat(data)
    const chat2 = await historial.getChat()
    io.sockets.emit('messages', chat2 );
});

 
  // productos

  const prods = await productos.getAll()
 
  socket.emit("productos", productos.getAll())

  socket.on("nuevoProducto", async saveProd => {
    await productos.getAll(saveProd)
    io.sockets.emit("productos",await  productos.getAll() )
})

//productos save

socket.emit('productos', prods )

socket.on('nuevoProducto', async prod => {

  await productos.save(prod)
  const prods2 = await productos.getAll()
  io.sockets.emit('productos', prods2 );
});


});

const port = 8080;

const server = httpServer.listen(port, () => {
  console.log(`servidor escuchando en http://localhost:${port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));