<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>
    <link rel="stylesheet" href="./public/css/styles.css">
</head>
<body>

    <div class="navbar">
        <center>
        <a href="index.php">Acceuil</a>
        <a href="index.php?action=deckbuilder">Builder</a>
        <a href="index.php?action=extensions">Extensions</a>
        <a href="index.php?action=recherche">Recherche</a>
        <?php
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    
    if (isset($_SESSION['username'])) {
        echo "<a>Bienvenue, " . htmlspecialchars($_SESSION['username']) . "</a>";
        echo '<a href="index.php?action=logout">Déconnexion</a>';
    } else {
        echo '<a href="index.php?action=connexion">Connexion</a>';
    }
    ?>
        </center>
    </div>

    <?=$content?>



</body>
</html>
