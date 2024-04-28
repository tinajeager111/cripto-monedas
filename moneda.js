const moneda = document.querySelector('#moneda');
const cripto = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado')

document.addEventListener('DOMContentLoaded', cargarSELECT );
formulario.addEventListener('submit', cargarFormulario);
moneda.addEventListener('change', guardarValor);
cripto.addEventListener('change', guardarValor);


const criptoObj =  {
    moneda:'',
    criptomoneda:''
}

function guardarValor (e){
  criptoObj[e.target.name] = e.target.value;
  console.log(criptoObj)
}

function cargarSELECT(){

    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    fetch(url)
    .then(respuesta=>respuesta.json())
    .then(respuesta=>obtenerCripto(respuesta.Data))


}


function cargarFormulario(e){
    e.preventDefault();
    console.log('cotizar')


    const {moneda,criptomoneda} = criptoObj;

    if(moneda === '' || criptomoneda === ''){
        console.log('campos vacios');
    }else{
        console.log('campos llenos')
        consultarApi();
    }

}


function consultarApi (){
  const {moneda,criptomoneda} = criptoObj;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
  
    fetch (url)
    .then(respuesta=>respuesta.json())
    .then(a=>cotizar(a.DISPLAY [criptomoneda][moneda]))
  
  }


  function cotizar(valores){
    const {PRICE, LASTUPDATE, HIGHDAY, LOWDAY} = valores;

    const precio = document.createElement('p');
    precio.innerHTML = `el precio es: ${PRICE}`;

    const ultimaAct = document.createElement('p');
    ultimaAct.innerHTML = `Ultima actualizacion: ${LASTUPDATE}`;

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `Precio mas alto del dia: ${HIGHDAY}`;

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `Precio mas bajo del dia: ${LOWDAY}`;

    resultado.appendChild(precio);
    resultado.appendChild(ultimaAct);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);

  }

function obtenerCripto(listado){
 /*console.log(listado)*/
 listado.forEach(i=>{
    const {FullName, Name} = i.CoinInfo;
    console.log(FullName, Name);


    const option = document.createElement('option');
    option.value = Name;
    option.textContent = FullName;

    cripto.appendChild(option)
 })
}
