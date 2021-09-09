//FUNCION PARA EL GUARDAR INFORMACION EN LOCALSTORAGE DE REGISTRO MEMBRESIA

function guardarInfo() {
  localStorage.nombre = document.getElementById("nombre").value;
  localStorage.password = document.getElementById("password").value;

//VALIDACION DE DATOS Y CAMPOS VACIOS
if(nombre.value  === '' || password.value === ''){
  document.getElementById("datos").innerHTML = "POR FAVOR,COMPLETE TODOS LOS CAMPOS.";
}
else{
  swal({
    title: "LE DAMOS LA BIENVENIDA " + localStorage.nombre + " YA PUEDES REALIZAR TU COMPRA." ,
    type: "success",
    timer: 7500,
    showConfirmButton: false
  });
  {
  window.location.href = "blog.html"; }
  } 
}


//FUNCION PARA RECUPERAR DATOS SI ACTUALIZA PAGINA REGISTRO MEMBRESIA
function recuperarDatos() {
  if ((localStorage.nombre != undefined) && (localStorage.password != undefined)) {
      document.getElementById("datos").innerHTML = "Usuario: " + localStorage.nombre + " Contraseña: " + localStorage.password;
  } else {
      document.getElementById("datos").innerHTML = "No has introducido tu usuario y tu contraseña";
  }
}


//FUNCION PARA VALIDAR CAMPOS EN FORMULARIO CONTACTO
function guardarConsulta(){
  if(nombre.value == '' || email.value == ''|| telefono.value == ''|| mensaje.value == '')
  {
    swal({
      title: "ERROR!",
      text: "POR FAVOR COMPLETE LOS CAMPOS",
      type: "error"
    });
  }
else{
  swal({
    title: "ENVIADO!",
    text: "MENSAJE ENVIADO CON EXITO.",
    type: "success",
    timer: 4000,
    showConfirmButton: false
  });
}
}



//ACA INCORPORE JQUERY
function tartasUIjQuery(tartas, id){
  for (const tarta of tartas){
      $ (id).append(`<div class="card" style="width: 18rem; padding: 30px;" id="itemarti">
 <p class="badge badge-success">${tarta.categoria}</p>
      <center><img class="card-img-top"  width='300' height='350' src="${tarta.imagen}"></center>

       <div class="card-body">
       <center><h2 class="card-title text-dark">${tarta.nombre}</h2></center>
       <center><h3 class="card-title text-dark"> $ ${tarta.precio}</h3></center>
      
       <br>
       <center><a href="#" id='${tarta.id}' class="btn btn-primary btn-compra">AGREGAR AL CARRITO</a></center>
        </div>
     </div>`)
  }
$('.btn-compra').on("click", comprarProducto);
}


///MANEJADOR DE COMPRA DE PRODUCTOS
function comprarProducto(e){
  e.preventDefault();
  const idProducto   = e.target.id;
  const seleccionado = carrito.find(p => p.id == idProducto);
  if(seleccionado == undefined){
    carrito.push(tartas.find(p => p.id == idProducto));
  }else{
    seleccionado.agregarCantidad(1);
  }
 
  //GUARDAR EN STORAGE
  localStorage.setItem("CARRITO",JSON.stringify(carrito));
  //GENERAR SALIDA PRODUCTO
  carritoUI(carrito);
}
//FUNCION PARA RENDERIZAR LA INTERFAZ DEL CARRITO
function carritoUI(tartas){
  $('#carritoCantidad').html(tartas.length);
  $('#carritoProductos').empty();
  for (const tarta of tartas) {
    $('#carritoProductos').append(registroCarrito(tarta));
  }


   //AGREGAR TOTAL Y BOTON COMPRAR
   $('#carritoProductos').append(`
        <h2 style="padding-left:10px;"> TOTAL  
       <span style="padding-left:600px;" > ${totalCarrito(tartas)} </span></h2>
       <button class="btn btn-primary btn-pagar">COMPRAR</button>`)
       $('.btn-pagar').on("click", pagarPro);
       function pagarPro(){
        window.location.href = "pago.html"  ;
      }


  //ASOCIAMOS LOS EVENTOS A LA INTERFAZ GENERADA
  $('.btn-delete').on('click', eliminarCarrito);
  $('.btn-add').click(addCantidad);
  $('.btn-sub').click(subCantidad);
}
//FUNCION PARA GENERAR LA ESTRUCTURA DEL REGISTO HTML
function registroCarrito(tarta){
	var table = document.getElementById("tablacarritovar");
	var devuelvohtml = "";
	if (table == null) {
	devuelvohtml = `	<table id="tablacarritovar" class="table">
  <thead>
  			    <tr>
      <th style="width:400px;" scope="col"> Producto </th>
      <th style="width:150px;" scope="col"><center>Precio Unitario</center></th>  
      <th style="width:150px;" scope="col"><center> Cantidad</center></th>  
      <th style="width:150px;" scope="col"> SubTotal </th>
      <th id="${tarta.id}" </th> 
      <th id="${tarta.id}" </th>
      <th id="${tarta.id}" </th>
    </tr>
    <tr>
      <th style="width:400px;" scope="col"> ${tarta.nombre} </th>
      <th style="width:150px;" scope="col"><center> $ ${tarta.precio}</center></th>  
      <th style="width:150px;" scope="col"><center> ${tarta.cantidad}</center></th>  
      <th style="width:150px;" scope="col"> $ ${tarta.subtotal()} </th>
      <th id="${tarta.id}" class="btn btn-info btn-add ">Agregar</th> 
      <th id="${tarta.id}" class="btn btn-warning btn-sub">Restar</th>
      <th id="${tarta.id}" class="btn btn-danger btn-delete">Eliminar Producto</th>
    </tr>
     
    </thead>
    </table>`
	} else {
	devuelvohtml = `	<table id="tablacarritovar" class="table">
  <thead>
    <tr>
      <th style="width:400px;" scope="col"> ${tarta.nombre} </th>
      <th style="width:150px;" scope="col"><center> $ ${tarta.precio}</center></th>  
      <th style="width:150px;" scope="col"><center> ${tarta.cantidad}</center></th>  
      <th style="width:150px;" scope="col"> $ ${tarta.subtotal()} </th>
      <th id="${tarta.id}" class="btn btn-info btn-add ">Agregar</th> 
      <th id="${tarta.id}" class="btn btn-warning btn-sub">Restar</th>
      <th id="${tarta.id}" class="btn btn-danger btn-delete">Eliminar Producto</th>
    </tr>
     
    </thead>
    </table>`
	}
  return devuelvohtml;
}

//FUNCION PARA ELIMINAR PRODUCTO DEL CARRITO
function eliminarCarrito(e){
  console.log(e.target.id);
  let posicion = carrito.findIndex(p => p.id == e.target.id);
  carrito.splice(posicion, 1);
  carritoUI(carrito);
  localStorage.setItem("CARRITO",JSON.stringify(carrito));
}

//FUNCION PARA AGREGAR CANTIDAD DEL BOTON AGREGAR
function addCantidad(){
  let tarta = carrito.find(p => p.id == this.id);
  tarta.agregarCantidad(1);
  $(this).parent().children()[2].innerHTML = tarta.cantidad;
  $(this).parent().children()[3].innerHTML = tarta.subtotal();
  //MODIFICAR TOTAL
  $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`);
  //GUARDAR EN STORAGE
  localStorage.setItem("CARRITO",JSON.stringify(carrito));
  carritoUI(carrito);
}


//FUNCION PARA RESTAR CANTIDAD
function subCantidad(){
  let tarta = carrito.find(p => p.id == this.id);
  if(tarta.cantidad > 1){
    tarta.agregarCantidad(-1);
    let registroUI = $(this).parent().children();
    registroUI[2].innerHTML = tarta.cantidad;
    registroUI[3].innerHTML = tarta.subtotal();

     //MODIFICAR TOTAL
  $("#totalCarrito").html(`TOTAL ${totalCarrito(carrito)}`); 
    //GUARDAR EN STORAGE
    localStorage.setItem("CARRITO",JSON.stringify(carrito));
  }
}

//FUNCION PARA OBTENER EL PRECIO TOTAL DEL CARRITO
function totalCarrito(carrito){
  console.log(carrito);
  let total = 0;
  carrito.forEach(p => total += p.subtotal());
  return total;
}


//FUNCION PARA ELIMINAR PROUDUCTOS NO SELECCIONADOS EN LOS FILTROS
function eliminarCard(){
  var myDiv = document.getElementById("tartasContenedor");
  myDiv.innerHTML = "";}


//FUNCION PARA GENERAR OPCIONES DEL SELECT CATEGORIAS
function selectUI(lista, selector){
  $(selector).empty();
  lista.forEach(element => {
      $(selector).append(`<option value='${element}'>${element}</option>`);
  });
  $(selector).prepend(`<option value='TODAS' selected>TODAS</option>`);
}


//FUNCION PARA FORMULARIO PAGO
  function guardarPago(){
    if(cardholder.value == '' || cardnumber.value == ''|| date.value == ''|| cvc.value == '')
    {
      swal({
        title: "ERROR",
        text: "COMPLETE TODOS LOS DATOS SOLICITADOS",
        type: "error"
      });
    }
  else{
    swal({
      title: "GRACIAS POR SU COMPRA!",
      text: "Verifica tu correo para el seguimiento",
      type: "success",
      timer: 4000,
      showConfirmButton: false
    });
  }
  }

//FUNCION PARA VOLVER A LA TIENDA EN EL FORMULARIO PAGO
  function volverTienda(){
    window.location.href = "carrito.html";   
  }