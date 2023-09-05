<?php ob_start(); ?>

<div class="container">
        <!-- First row -->
        <div class="row">
            <div class="rectangle">Deck</div>
            <div class="column">
                <div class="rectangle">Main</div>
                <div class="rectangle">Terrain</div>
            </div>
            <div class="rectangle">Cimetiere</div>
        </div>
        <!-- Second row -->
        <div class="row">
            <div class="column">
            <div class="rectangle">Créatures 
    <img id="image1" src="./public/png/Color_B.webp" alt="">
</div>

                <div class="rectangle">Créatures</div>
            </div>
        </div>
        <!-- Third row -->
        <div class="row">
            <div class="rectangle">Cimetiere</div>
            <div class="column">
                <div class="rectangle">Terrain</div>
                <div class="rectangle">Main</div>
            </div>
            <div class="rectangle" >Deck</div>
        </div>
    </div>
    
    <script>    
    document.addEventListener("DOMContentLoaded", function() {
  const rectangles = document.querySelectorAll('.rectangle');

  rectangles.forEach((rectangle) => {
    rectangle.addEventListener('dragover', function(e) {
      e.preventDefault();
    });

    rectangle.addEventListener('drop', function(e) {
      e.preventDefault();
      const draggedElement = document.getElementById(e.dataTransfer.getData("text/plain"));
      this.appendChild(draggedElement);
    });
  });

  // Supposons que les images sont dans les div avec la classe 'rectangle'
  const images = document.querySelectorAll('.rectangle img');

  images.forEach((img) => {
    img.setAttribute('draggable', true);

    img.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData("text/plain", this.id);
    });
  });
});

</script>

<?php 

$content = ob_get_clean();
$title = " Terrain ";
require("Gabarit.php");
?>