<?php ob_start(); ?>

<div class="container">
    <h1>Welcome to My Homepage</h1>
    <p>This is a simple example of a homepage with a navigation bar.</p>
</div>

<?php 

$content = ob_get_clean();
$title = " Page Index ";
require("Gabarit.php");
?>