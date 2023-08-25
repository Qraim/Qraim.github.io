<?php

require("./controller/controller.php") ;

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}


if( isset ( $_GET['action']) ){
    if( $_GET['action']== 'index') index() ;
    else if( $_GET['action']== 'deckbuilder') deckbuilder() ;
    else if( $_GET['action']== 'extensions') extensions() ;
    else if( $_GET['action']== 'recherche') recherche() ;
    else if( $_GET['action']== 'connexion') connexion() ;
    if ($_GET['action'] === 'logout') {
        unset($_SESSION['username']); // ou vous pourriez utiliser session_destroy();
        index();
        exit();
    }
} else {
    index();
}

?>