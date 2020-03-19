
    var ventanaMenu = document.querySelector('.ventana');
    var ventanaCaptura = document.querySelector('.ventanaCaptura');
    var video = document.querySelector('.video');
    var image = document.querySelector('.image');
    var contador = document.querySelector('.contador');
    var btnCaptura = document.querySelector('.btnCaptura');
    
    var btnStop = document.querySelector('.btnStop');
    var lineaUno = document.querySelector('.uno');
    var lineaDos = document.querySelector('.dos');
    var mensaje = document.querySelector("#mensaje");
    var recorder;
    var copyLink = document.querySelector('#copyLink');
    var downloadGif = document.querySelector('#downloadLink');
    var anchorBajarGIF = document.querySelector('.bajarGIF');

    
    let exito = document.querySelector('.exito');

    let misGIFOS = document.querySelector('.cajas'); 


   

    var idGif = [];





    
    copyLink.addEventListener('click', function(){
        mensaje.style = "display:block";
        let ultimo =  sessionStorage.length;
        let  valor = sessionStorage.getItem(ultimo);
        
        console.log(valor);
        
        
    })



//Seteamos el Boton que va descargar nuestro GIF

    downloadGif.addEventListener("click", async() => {

        let blob = await recorder.getBlob();
        const blobUrl = URL.createObjectURL(blob);        
        anchorBajarGIF.setAttribute("href", blobUrl);
        
    })


    

    // broadcast la webCam

    function getStreamAndRecord() {

        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                height: {
                    max: 439
                }
            }
        })
            .then(function (stream) {
                video.srcObject = stream;
                video.play();
            })


        
    }




    // Record RTC 

    function captureCamera(callback) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (camera) {
                
                callback(camera);
            }).catch(function (error) {
                alert('Unable to capture your camera. Please check console logs.');
                console.error(error);
            });

        
    }

    function stopRecordingCallback() {
        image.src = URL.createObjectURL(recorder.getBlob());
        recorder.camera.stop();
        
    }


    document.getElementById('capturar').onclick = function () {

        video.style = "display: none";
        image.style = "display: block";
        lineaUno.style = "display:none";
        lineaDos.style = "display:block";
        btnCaptura.style = "display: none";
        btnStop.style = "display: flex";
        contador.style.display = "flex";        
       

        captureCamera(function (camera) {

            recorder = RecordRTC(camera, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {

                    console.log('Grabando...');

                },
                onGifPreview: function (gifURL) {
                    image.src = gifURL;                  
                }
            });

            recorder.startRecording();

            // release camera on stopRecording
            recorder.camera = camera;

            // document.getElementById('btn-stop-recording').disabled = false;
        });
    };



    document.querySelector('.btnStop').onclick = function () {

        recorder.stopRecording(stopRecordingCallback);
        exito.style = "display: flex";
        ventanaCaptura.style = "display: none";
        var gif = document.querySelector('.image').src; 
        document.querySelector('.img-exito').innerHTML = `<img src="${gif}" class="image" alt="captura">`;
             
        mostrarPost();
        
        
        
    };

    


   


    //Mostramos el menu Captura
    function menuCaptura() {
        ventanaMenu.style = "display: none";
        ventanaCaptura.style = "display: flex";
        contador.style.display = "none";
        getStreamAndRecord();
    }   
    




    function mostrarGifOS(key) {

        if (sessionStorage.length == 0) {
      
          let contador = 1;
          sessionStorage.setItem(contador, key);
          idGif.push(sessionStorage.getItem(contador));
          crearCajaGifOS(key);
      
        } else {
          contador = sessionStorage.length
          contador += 1;
          sessionStorage.setItem(contador, key);
          idGif.push(sessionStorage.getItem(contador));
          crearCajaGifOS(key);
        }
          
      
      }



      function crearCajaGifOS(key) {

        var newGIF = document.createElement("img");
            newGIF.setAttribute('src', `https://media.giphy.com/media/${key}/giphy.gif`);
            newGIF.setAttribute('alt', key);
        var cajaGIF = document.createElement('div');
            cajaGIF.setAttribute('class', 'caja');
            cajaGIF.appendChild(newGIF);        
            misGIFOS.appendChild(cajaGIF);
      
      }



      window.addEventListener('load', function () {

        for(let i= 0; i< sessionStorage.length; i++){
            let key = sessionStorage.key(i);
            let valor = sessionStorage.getItem(key);
            crearCajaGifOS(valor);
    
          }
        })
        
       

      
        function mostrarPost() {

            var apiKey = "5bIrA5CGCfUFE7P8FWJez1t14xzWVJAF";
        
            let form = new FormData();
            form.append("file", recorder.blob, "miGuifo.gif");
            console.log(form.get('file'));
        
            fetch("https://upload.giphy.com/v1/gifs?api_key=" + apiKey, {
                    
                    method: "POST",
                    body: form
                })
                .then(res => res.json())
                .then(response => {
                    var keyGiphy = response.data.id;
        
                    copiarURLGIF(keyGiphy);

                    mostrarGifOS(keyGiphy);            
        
        
        
                })
        
        }
        
        
        
        
        function copiarAlPortapapeles(valor) {
        
            // Crea un campo de texto "oculto"
            var aux = document.createElement("input");
          
            // Asigna el contenido del elemento especificado al valor del campo
            aux.setAttribute("value", `https://giphy.com/gifs/${valor}`);
          
            // Añade el campo a la página
            document.body.appendChild(aux);
          
            // Selecciona el contenido del campo
            aux.select();
          
            // Copia el texto seleccionado
            document.execCommand("copy");
          
            // Elimina el campo de la página
            document.body.removeChild(aux);
          
          }
        


          function copiarURLGIF(key){
            idGif.push(key);
            var valor = idGif[0]
            

            copyLink.addEventListener('click', function () {
                copiarAlPortapapeles(valor);
                
            })
          }