const carrito=document.querySelector('#carrito');
const listaLibros=document.querySelector('#lista-libros');
const contenedorCarrito=document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn=document.querySelector('#vaciar-carrito');
let articulosCarrito=[];

cargarEventListeners();
function cargarEventListeners(){
  listaLibros.addEventListener('click',agregarLibro);

  carrito.addEventListener('click',eliminarLibro);

  vaciarCarritoBtn.addEventListener('click',()=>{
    articulosCarrito=[];

    limpiarHTML();
  })
}



function agregarLibro(evt){
  evt.preventDefault();
 
  if(evt.target.classList.contains('agregar-carrito')){
    const libroSeleccionado=evt.target.parentElement.parentElement;

    leerDatosLibro(libroSeleccionado);
  }

  
}

function eliminarLibro(evt){
  if(evt.target.classList.contains('borrar-libro')){
    const libroId=evt.target.getAttribute('data-id');

    //elimina del arreglo de articulosCarrito por el data-id
  articulosCarrito=articulosCarrito.filter(libroSeleccionado=> libroSeleccionado.id!==libroId);

    carritoHTML();//iterar sobre el carrito y mostar su html
  }
  
}






function leerDatosLibro(libroSeleccionado){
    const infoLibro={
       imagen: libroSeleccionado.querySelector('img').src,
       titulo: libroSeleccionado.querySelector('h4').textContent,
       precio: libroSeleccionado.querySelector('.precio span').textContent,
       id: libroSeleccionado.querySelector('a').getAttribute('data-id'),
       cantidad:1
    }
    // revisa si un elemento ya existe en el carrito
     
    const existe= articulosCarrito.some(libroSeleccionado=>libroSeleccionado.id=== infoLibro.id);
    console.log(existe);
    if(existe){
      //actualizamos la cantidad del mismo curso
      const libros=articulosCarrito.map(libroSeleccionado=>{
        if(libroSeleccionado.id===infoLibro.id){
            libroSeleccionado.cantidad++;
            return libroSeleccionado; //este retorna el libro ya actualizado y contado
        }else{
           return libroSeleccionado; // este retorna el objeto nuevo si no estaba duplicado 
        }
      })
      articulosCarrito=[...libros]
    }else{
      // agregamos el libro nuevo al carrito
      articulosCarrito=[...articulosCarrito,infoLibro]; // toma una copia del carrito para no perder la informacion
    }

    console.log(articulosCarrito);

    carritoHTML();
}


function carritoHTML(){

  // limpiar el html
    limpiarHTML();

  // recorre el carrito y genera el html

  articulosCarrito.forEach( (libroSeleccionado) =>{
    const {imagen,titulo,precio,cantidad,id}=libroSeleccionado;
    const row=document.createElement('tr') // vamos a crear un tablerow para aplicar los cursos en el carrito
    row.innerHTML=`
       <td>
          <img src="${imagen}" width"100">
       </td>
       <td>${titulo}</td>
       <td>${precio}</td>
       <td>${cantidad}</td>
       <td>
          <a href="#" class="borrar-libro" data-id="${id}"> X </a>  
       </td>
    `;

    // Agrega el html del carrito en el tbody
     contenedorCarrito.appendChild(row);
  })
}


function limpiarHTML(){
    // manera de limpiar un poco mas lenta
    //contenedorCarrito.innerHTML='';
    // manera de limpiar rapida 
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}




