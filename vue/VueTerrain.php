<?php ob_start(); ?>

<div class="container">
        <!-- First row -->
        <div class="row">
            <div class="rectangle">15%</div>
            <div class="column">
                <div class="rectangle">15%</div>
                <div class="rectangle">15%</div>
            </div>
            <div class="rectangle">15%</div>
        </div>
        <!-- Second row -->
        <div class="row">
            <div class="column">
                <div class="rectangle">15%</div>
                <div class="rectangle">15%</div>
            </div>
        </div>
        <!-- Third row -->
        <div class="row">
            <div class="rectangle">15%</div>
            <div class="column">
                <div class="rectangle">15%</div>
                <div class="rectangle">15%</div>
            </div>
            <div class="rectangle">15%</div>
        </div>
    </div>
    
<?php 

$content = ob_get_clean();
$title = " Terrain ";
require("Gabarit.php");
?>