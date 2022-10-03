// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();
function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);

     // Elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     //Muestra los cursos de LocalStorage
     document.addEventListener('DOMContentLoaded',() => {
          articulosCarrito = JSON.parse( localStorage.getItem('carrito')) || [];

          carritoHTML();
     })

     // Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', () =>{
          localStorage.clear()
          vaciarCarrito()
     });

}

// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }

     //Revisa s ya exite en el carrito
     const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
     if( existe )  { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }
     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
          carritoHTML();
     }
}

// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const {imagen, titulo, precio, cantidad, id } = curso
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${imagen}" width=100>
               </td>
               <td>${titulo}</td>
               <td>${precio}</td>
               <td>${cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     //Sincronizar con Storage
     sincroStorage()
}

function sincroStorage(){
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}

