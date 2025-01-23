//variables
const marca = document.querySelector('#marca'),
      year = document.querySelector('#year'),
      precioMax = document.querySelector('#maximo'),
      precioMin = document.querySelector('#minimo'),
      puertas = document.querySelector('#puertas'),
      transmision = document.querySelector('#transmision'),
      color = document.querySelector('#color'),
      resultado = document.querySelector('#resultado'),
      resultados = document.querySelector('#resultados');

//Años
const max = new Date().getFullYear(),
      min = max - 10;//Para solo traer los ultimos 10 años

//Al hacer una busqueda se general el objeto y guarda la informacion
const datosBusqueda = {
    marca: '',
    year: '',
    precioMax:'',
    precioMin:'',
    puertas:'',
    transmision:'',
    color:''
};

document.addEventListener('DOMContentLoaded', () => {

    mostrarAutos(autos);

    llenarSelectYear();
} );

//EventListener
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;//Asigna el valor seleccionado al objeto

    filtrarDatos();

    cambiarTitulo();
});

year.addEventListener('change', e =>{
    datosBusqueda.year = e.target.value;//Asigna el valor seleccionado al objeto

    filtrarDatos();
    cambiarTitulo();
});

precioMin.addEventListener('change', e =>{
    datosBusqueda.precioMin = e.target.value;//Asigna el valor seleccionado al objeto

    filtrarDatos();
    cambiarTitulo();
});

precioMax.addEventListener('change', e =>{
    datosBusqueda.precioMax = e.target.value;//Asigna el valor seleccionado al objeto

    filtrarDatos();
    cambiarTitulo();
});

puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = e.target.value;//Asigna el valor seleccionado al objeto

    filtrarDatos();
    cambiarTitulo();
});

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;//Asigna el valor seleccionado al objeto

    filtrarDatos();
    cambiarTitulo();
});

color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;//Asigna el valor seleccionado al objeto

    filtrarDatos();
    cambiarTitulo();
});


//Funciones
function mostrarAutos(autos){

    limpiarHTML();

    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} puertas - Transmision ${transmision} - 
            Precio $${precio} - Color ${color}
            `;
        

        resultado.appendChild(autoHTML);
    });
}


function llenarSelectYear(){
    for(let i = max; i >= min; i--){
        const opcion =  document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function filtrarDatos(){
    const resultado = autos.filter( filtrarMarca )
                            .filter( filtrarYear )
                            .filter( filtrarPrecioMinimo )
                            .filter( filtrarPrecioMaximo )
                            .filter( filtrarPuertas )
                            .filter( filtrarTransmision )
                            .filter( filtrarColor );

    if(resultado.length){
        console.log(resultado);

        mostrarAutos(resultado);
    }else{
        limpiarHTML();
        noResultado();
    }
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;

    if(marca){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const {year} = datosBusqueda;

    if(year){
        return auto.year === parseInt(year);
    }
    return auto;
}

function filtrarPrecioMinimo(auto){
    const {precioMin} = datosBusqueda;

    if(precioMin){
        return auto.precio >= precioMin;
    }
    return auto;
}

function filtrarPrecioMaximo(auto){
    const {precioMax} = datosBusqueda;

    if(precioMax){
        return auto.precio <= precioMax;
    }
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if( puertas ){
        return auto.puertas === parseInt(puertas);
    }
    
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if( transmision ){
        return auto.transmision === transmision;
    }
    
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if( color ){
        return auto.color === color;
    }
    
    return auto;
}

function noResultado(){
    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta');
    noResultado.textContent = 'No hay Resultados...'
    resultado.appendChild(noResultado);
}


function cambiarTitulo(){
    resultados.textContent = 'Resultados...';
}