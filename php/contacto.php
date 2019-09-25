<?php 

$nombre = $_POST['name'];
$destino = "joseoviedo777@msn.com";
$correo = $_POST['email'];
$mensaje = $nombre." escribió: \n\n".$_POST['comments']." \n\nResponder a: ".$correo;

if(mail($destino, $asunto, $mensaje)) {
	echo "Mensaje enviado exitosamente";
	}else {
		echo "Error al enviar el mensaje";
		}

?>