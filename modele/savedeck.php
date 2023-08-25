<?php

// Connexion à la base de données MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "user_database";

// Crée une nouvelle connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifie la connexion
if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}

// Récupère les données POST du client (vous devrez envoyer ces données via une requête POST en utilisant, par exemple, fetch ou AJAX)
$user_id = $_POST['user_id'];
$commander_id = $_POST['commander_id'];

// Convertit le tableau deck_data en chaîne JSON
$deck_data = json_encode($_POST['deck_data']);

// Insère les données dans la table
$sql = "INSERT INTO decks (user_id, commander_id, deck_data) VALUES ('$user_id', '$commander_id', '$deck_data')";

if ($conn->query($sql) === TRUE) {
    echo "Nouvel enregistrement créé avec succès";
} else {
    echo "Erreur : " . $sql . "<br>" . $conn->error;
}

// Ferme la connexion
$conn->close();

?>
