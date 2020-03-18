// VARIABLES

var estilo = document.querySelector('#estilo');
let opcTemas = document.querySelector('.opc-tema');
let header = document.querySelector('header');
let btnTema = document.querySelector('.btn-tema');
let btnCrea = document.querySelector('.btn-crea');


//EVENT LISTENERS

btnTema.addEventListener('click', headerChange);

opcTemas.addEventListener('click', cambioTemas);



//FUNCIONES


//SWITCH ENTRE LAS DOS HOJAS DE ESTILO

function cambioTemas(e) {

    let temaActual = e.target.value;
  
    if (temaActual == "Sailor Night") {
      estilo.setAttribute('href', 'css/sailorNight.css');
    }
    else {
      estilo.setAttribute('href', 'css/sailorDay.css');
    }
  
  }

  
//EL HEADER  AMPLIA EL HEIGHT EN BASE A MOSTRAR LOS BOTONES DE CAMBIO DE TEMA
  
  function headerChange() {
  
    if (header.style.height == "210px") {
      header.style = 'height: 130px';
      opcTemas.style = 'display: none';
  
    } else {
      header.style = 'height: 210px';
      opcTemas.style = 
      `position: absolute;
       top: 36px;
       background-color: #e6e6e6;
       width:163px; 
       height: 102px;
       display:flex; 
       align-items: center;
       justify-content: center;
       flex-direction: column;`;
    }
  }
  