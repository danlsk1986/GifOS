

let misGIFOS = document.querySelector('.cajas');



window.addEventListener('load', function(){

    let largo = sessionStorage.length;   

    for(let i = 1; i <= largo; i++){

        let key = sessionStorage.getItem(i)        
        
        crearCajaGifOS(key)
    }

    
})



  function crearCajaGifOS(key) {

    var newGIF = document.createElement("img");
        newGIF.setAttribute('src', `https://media.giphy.com/media/${key}/giphy.gif`);
        newGIF.setAttribute('alt', key);
    var cajaGIF = document.createElement('div');
        cajaGIF.setAttribute('class', 'caja');
        cajaGIF.appendChild(newGIF);        
        misGIFOS.appendChild(cajaGIF);
  
  }