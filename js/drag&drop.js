$(document).on('ready',function() {
    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var files = evt.dataTransfer.files;
        if (files.length > 0) {
            var file = files[0];
            if (file.type.match('image.*')) {
                var reader = new FileReader();
                reader.addEventListener('loadend', function (e) {
                    var datauri = e.target.result;
                    send(datauri);
                    var img = $('#img');
                    img.attr({
                        'src': datauri
                    });
                }, false);
                reader.readAsDataURL(file);
            }
            else {
                $.miniNoty({
                    timeoutToHide: 3000,  // timeout to hide
                    timeoutAnimEnd: 500, // timeout animate in SCSS
                    view: 'error',
                    autoHide: true,
                    message: 'Solo se permiten imagenes'
                })
            }
            function send(datauri) {
                // permite enviar los datos como mismo lo haria el formulario
                var data = new FormData();
                data.append('img', datauri);
                $.ajax({
                    url: 'php/camara.php',
                    type: 'POST',
                    contentType: false,
                    data: data,
                    dataType: 'json',
                    processData: false,
                    cache: false,
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            }
        }
    }

    // Se dispara cuando se esta realizando un arrastrado
    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'Move';
    }

    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
});
