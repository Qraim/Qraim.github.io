<?php
// Paramètres de connexion
$servername = "localhost";
$dbname = "user_database";
$username = "root";
$password = "";

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$response = ["status" => "", "message" => ""];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_POST['action'] === 'login') {
        // Processus de connexion
        $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
        $stmt->bindParam(":username", $_POST['username']);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($_POST['password'], $user['password'])) {
            $_SESSION['user_id'] = $user['id'];  
            $_SESSION['username'] = $_POST['username'];
            $response["status"] = "Good";
            $response["message"] = "Vous êtes connecté";
        }   else {
            $response["status"] = "error";
            $response["message"] = "Nom d'utilisateur ou mot de passe incorrect.";
        }

    } elseif ($_POST['action'] === 'register') {
        // Processus de création de compte
        $hashedPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
        $stmt->bindParam(":username", $_POST['username']);
        $stmt->bindParam(":password", $hashedPassword);
        $stmt->execute();
        $response["status"] = "success";
        $response["message"] = "Compte créé avec succès";
    }

} catch (PDOException $e) {
    $response["status"] = "error";
    $response["message"] = "Erreur: " . $e->getMessage();
}

// Définir le type de contenu en JSON
header('Content-Type: application/json');

// Renvoyer la réponse JSON
echo json_encode($response);
?>
