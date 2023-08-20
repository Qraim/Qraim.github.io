
<?php ob_start(); ?>

<center><h1 >Liste des Cartes par Extension</h1>

    <div id="setSearch">
        <label for="setCode">Entrez le nom ou le code de l'extension : </label>
        <input type="text" id="setCode" list="setNames">
        <datalist id="setNames">
            <!-- Les noms des extensions seront ajoutés ici par JavaScript -->
        </datalist>
        <button onclick="fetchCardsBySet()">Rechercher</button>
    </div>
</center>

<br>
    

    <div class="columns">
        <div id="white-cards" class="card-column">
            <!-- Les cartes blanches seront ajoutées ici -->
        </div>

        <div id="blue-cards" class="card-column">
            <!-- Les cartes bleues seront ajoutées ici -->
        </div>

        <div id="black-cards" class="card-column">
            <!-- Les cartes noires seront ajoutées ici -->
        </div>

        <div id="red-cards" class="card-column">
            <!-- Les cartes rouges seront ajoutées ici -->
        </div>

        <div id="green-cards" class="card-column">
            <!-- Les cartes vertes seront ajoutées ici -->
        </div>
    </div>

    <div class="rows">
        <div id="multicolor-cards" class="card-row">
            <!-- Les cartes multicolores seront ajoutées ici -->
        </div>
        
        <div id="artifact-cards" class="card-row">
            <!-- Les cartes d'artefact seront ajoutées ici -->
        </div>
        
        <div id="land-cards" class="card-row">
            <!-- Les cartes de terrain seront ajoutées ici -->
        </div>


    </div>

    <script type="text/javascript" src="./public/js/extensions.js"></script>

<?php 

$content = ob_get_clean();
$title = " Extensions ";
require("Gabarit.php");
?>