<?php

function index () {
    require("./vue/VueAcceuil.php");
}

function deckbuilder(){
    require("./vue/VueDeckBuilder.php");
} 

function extensions(){
    require("./vue/VueExtensions.php");
} 

function recherche(){
    require("./vue/Vuerecherche.php");
} 

function connexion(){
    require("./vue/Vueconnexion.php");
} 

function play(){
    require("./vue/VueTerrain.php");
} 

?>