<?php

require("./controller/controller.php") ;

if( isset ( $_GET['action']) ){
    if( $_GET['action']== 'index') index() ;
    else if( $_GET['action']== 'deckbuilder') deckbuilder() ;
    else if( $_GET['action']== 'extensions') extensions() ;
} else {
    index();
}

?>