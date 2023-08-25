
<?php ob_start(); ?>

<h1>Recherche avancée de cartes MTG</h1>

<form id="searchForm">
  <!-- Nom de la carte -->
  <label for="name">Nom:</label>
  <input type="text" id="name" name="name" value="">
  
  <!-- Types de carte -->
  <fieldset>
    <legend>Type:</legend>
    <label><input type="checkbox" name="type" value="Creature"> Créature</label>
    <label><input type="checkbox" name="type" value="Planeswalker"> Planeswalker</label> 
    <label><input type="checkbox" name="type" value="Artifact"> Artefact</label>
    <label><input type="checkbox" name="type" value="Instant"> Éphémère</label>
    <label><input type="checkbox" name="type" value="Sorcery"> Rituel</label>
    <label><input type="checkbox" name="type" value="Land"> Terrain</label> 
    <label><input type="checkbox" name="type" value="Enchantment"> Enchantement</label> 

    <!-- Nouvelle ligne ajoutée -->



  </fieldset>
  
  <!-- Couleurs -->
  <fieldset>
    <legend>Couleur:</legend>
    <label><input type="checkbox" name="color" value="W"> Blanc</label>
    <label><input type="checkbox" name="color" value="U"> Bleu</label>
    <label><input type="checkbox" name="color" value="B"> Noir</label>
    <label><input type="checkbox" name="color" value="R"> Rouge</label>
    <label><input type="checkbox" name="color" value="G"> Vert</label>
  </fieldset>

  <fieldset>
  <!-- Coût en mana -->
  <label for="manaCost">Coût en Mana:</label>
    <input type="number" id="manaCost" name="manaCost">
  </fieldset>

  
  
  <button type="submit">Rechercher</button>
</form>

<div id="results">
  <!-- Les résultats de la recherche seront insérés ici -->
</div>

<script src="./public/js/recherche.js"></script>

<?php 

$content = ob_get_clean();
$title = " Extensions ";
require("Gabarit.php");
?>