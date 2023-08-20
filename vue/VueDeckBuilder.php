<?php ob_start(); ?>

<div id="content">
    <center>
        <h1>Création de Deck MTG Commander</h1>
    
        <div class="section">
            <input type="text" id="searchTerm" placeholder="Nom de la carte">
            <button onclick="searchCard()">Rechercher</button>
            <ul id="results"></ul>

            <div id="searchModal" class="modal">
                <div class="modal-content">
                  <span class="close-button" onclick="closeModal()">&times;</span>
                  <ul id="results"></ul>
                </div>
              </div>
              
        </div>
        </center>
        <div class="section">
            <h3>Votre deck (<span id="totalCardCount">0</span> cartes)  <span id="price"></span>€</h3>
            <ul id="deckList"></ul>
        </div>
    
        <div class="section">
            <h3>Votre main :</h3>
            <button onclick="muligan()">générer</button>
            <ul id="main"></ul>
        </div>
    </div>
    
    <div id="selectedCommander" class="section">
        <h2>Commander:</h2>
    </div>  

    <script type="text/javascript" src="./public/js/deckbuilder.js"></script>

<?php 

$content = ob_get_clean();
$title = " Page Index ";
require("Gabarit.php");
?>