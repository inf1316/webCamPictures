$(document).on('ready',function() {
    $('#img').click(function () {
        window.datosVideo = {
            'StreamVideo': null
        };
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(function (stream) {
            datosVideo.StreamVideo = stream;
            video.srcObject = stream;
        }).catch(function () {
            //notificacion que se muestra si el usuario no habilita la webCam
            $.miniNoty({
                timeoutToHide: 3000,  // timeout to hide
                timeoutAnimEnd: 500, // timeout animate in SCSS
                view: 'success',
                autoHide: true,
                message: 'Por favor habilite la webCam'
            });
            $('#close').click();
        });
    });

    $('#close').click(function () {
        if (datosVideo.StreamVideo !== null && datosVideo.StreamVideo.active) {
            // datosVideo.StreamVideo.stop();
            // para detener la camara cuando cerramos la pestaña
            datosVideo.StreamVideo.getTracks()[0].stop();
        }
    });

    // cuando se da click permit realizar la foto
    $('#selfies').click(function () {
        var camara, foto, contexto, w, h, img;
        camara = $('#video'); //etiqueta video
        foto = $('#picture'); // canvas

        w = camara.width();
        h = camara.height();
        foto.attr(
            {
                'width': w,
                'height': h
            });
        contexto = foto[0].getContext('2d');
        contexto.drawImage(camara[0], 0, 0, w, h);

        img = $('#img');
        img.attr(
            {
                'src': foto[0].toDataURL("image/png")
            });
        $('#close').click();


        var data = new FormData();
        data.append('img', foto[0].toDataURL("image/png"));
        // Permite enviar los datos al servidor en una codificacion en base a 64
        $.ajax({
            url: 'php/camara.php',
            type: 'POST',
            contentType: false,
            data: data,
            processData: false,
            cache: false,
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
});
