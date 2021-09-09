
//CREO FUNCION CONSTRUCTORA
class Tarta{
    constructor(id, nombre, precio, imagen, categoria,cantidad){
    this.id = parseInt(id);
    this.nombre = nombre.toUpperCase();
    this.precio = parseFloat(precio);
    this.imagen = imagen ;
    this.categoria = categoria;    
    this.cantidad = parseInt(cantidad);
}


agregarCantidad(valor) {
    this.cantidad += valor;
}

subtotal() {
    return this.cantidad * this.precio;
}
}