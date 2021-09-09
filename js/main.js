//CARGA ASINCRONA DE INFORMACION DE PRODUCTOS DE ORIGEN LOCAL (producto.json)
    $.get('data/productos.json',function(datos, estado){
        console.log(datos);
        console.log(estado);
        if(estado == 'success'){
            for (const tarta of datos) {
                tartas.push(new Tarta(tarta.id, tarta.nombre, tarta.precio,tarta.imagen,tarta.categoria, tarta.cantidad));
            }
        }
        console.log(tartas);
        //GENERAR INTERFAZ DE PRODUCTOS CON UNA FUNCION
        tartasUIjQuery(tartas, '#tartasContenedor')
    });


    
//FUNCION QUE SE EJECUTA CUANDO SE CARGA TODA LAS IMAGENES DE LA APLICACION
window.addEventListener('load',() =>{ 
    //ANIMACIONES CON JQUERY
    $("#tartasContenedor").fadeOut();
    $("#tartasContenedor").fadeIn(3000);
})

//CONTENEDOR PRODUCTOS ANIMACION CON ANIMATE
$("#productos").animate({
    marginLeft:'100px',
    opacity: 0.8,
    fontSize: "30px",
    width: 500,
    borderRadius: "20px",
}, 1000,()=>{
    });

//FILTRO BUSQUEDA
    $("#busquedaProducto").keydown(function (e){
       const criterio= this.value;
       if (criterio != ""){
           const encontrados = tartas.filter(t => t.nombre.includes(criterio.toUpperCase()));
           eliminarCard();
           tartasUIjQuery(encontrados, '#tartasContenedor');
       }
    });

//FILTRO PRECIO
    $(".inputPrecio").change(function (e){
        const min=$("#minProducto").val();
        const max=$("#maxProducto").val();
     if((min > 0) && (max > 0)){
        const encontrados = tartas.filter(t => t.precio >= min && t.precio <= max);
        eliminarCard();
        tartasUIjQuery(encontrados, '#tartasContenedor');
     }
     $("#tartasContenedor").fadeOut(600).fadeIn(600);
    });



//SELECTOR CATEGORIAS
    selectUI(categoria,"#filtroCategorias");
$('#filtroCategorias').change(function (e) { 
    const value = this.value;

    $('#tartasContenedor').fadeOut(600,function(){
        if(value == 'TODAS'){
            eliminarCard();
            tartasUIjQuery(tartas, '#tartasContenedor');
        }else{
            const filtrados = tartas.filter(tarta => tarta.categoria == value);
            eliminarCard();
            tartasUIjQuery(filtrados, '#tartasContenedor');                       
        }

//MOSTRAR UNA VEZ GENERADOS LOS PRODUCTOS
        $('#tartasContenedor').fadeIn();
    });
});
