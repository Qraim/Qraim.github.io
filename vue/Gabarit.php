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
        </center>
    </div>


    <?=$content?>

    
</body>
</html>