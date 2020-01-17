<?php
$Base64Img = $_POST['img'];
$nombreImagen = rand(1, 999);

list(, $Base64Img) = explode(';', $Base64Img);
list(, $Base64Img) = explode(',', $Base64Img);

$Base64Img = base64_decode($Base64Img);
file_put_contents(dirname(__FILE__) . '/../camara/' . $nombreImagen . '.png', $Base64Img);
$enlace = dirname(__FILE__) . '/../camara/' . $nombreImagen . '.png';



