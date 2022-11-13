

const socket = io.connect();



//productos


function addItem() {
  const tittle = document.getElementById('tittle').value;
  const price = document.getElementById('price').value;
  const thumbnail = document.getElementById('thumbnail').value;


  const newItem = {
    tittle: tittle,
    price: price,
    thumbnail:thumbnail}


    socket.emit('nuevoProducto', newItem);
    fs.writeFile(`/api/productos.json`, JSON.stringify(deleteByid ,null, 2))
    return false;
}

socket.on("productos", function(saveProd) {
  renderProd(saveProd);
})

function renderProd(saveProd) {
  const prodlist = saveProd.map((elem, index) => {
    return (`
    <div class="table-responsive table-danger border rounded border-danger">
    <table class="table border-start-0 border-danger danger table-danger">
      <tr class="">
        <th colspan="3"> Product :${elem.tittle}</th>
        <th colspan="">price: ${elem.price}</th>
        <th> image: <img src="  ${elem.thumbnail}" alt="image" width="50"> </th>
      </tr>
    `);
  }).join(" ");

document.getElementById('prodDisplay').innerHTML = prodlist;
}




//chat
function addMessage() {
  const nombre = document.getElementById('nombre').value;
  const mensaje = document.getElementById('mensaje').value;


  const nuevoMensaje = {
    nombre: nombre,
    mensaje: mensaje}

    socket.emit('new-message', nuevoMensaje);
    return false;
}

socket.on('mensajes', function(data) {
  render(data);
});

function render(data) {
  const html = data.map((elem, index) => {
    return (`
      <div>
        <b>${elem.nombre}</b>: <em>${elem.mensaje}</em>
      </div>
    `);
  }).join(" ");

document.getElementById('messages').innerHTML = html;
}


