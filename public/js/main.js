const socket = io.connect();


//productos
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


