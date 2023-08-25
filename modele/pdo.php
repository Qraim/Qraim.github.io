<?php
// Paramètres de connexion
$servername = "localhost";
$dbname = "user_database";
$username = "root";
$password = "";

try {
    // Création d'une nouvelle connexion PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    
    // Définir le mode d'erreur PDO sur exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connexion réussie";
    
} catch (PDOException $e) {
    echo "Erreur: " . $e->getMessage();
}
?>
