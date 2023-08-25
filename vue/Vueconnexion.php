<?php ob_start(); ?>

<h1>Connexion</h1>
<form id="loginForm">
    <input type="hidden" name="action" value="login">
    <label for="login_username">Nom d'utilisateur:</label>
    <input type="text" id="login_username" name="username">
    <br>
    <label for="login_password">Mot de passe:</label>
    <input type="password" id="login_password" name="password">
    <br>
    <input type="button" value="Se connecter" onclick="submitForm('loginForm')">
</form>

<h1>Création de compte</h1>
<form id="registerForm">
    <input type="hidden" name="action" value="register">
    <label for="register_username">Nom d'utilisateur:</label>
    <input type="text" id="register_username" name="username">
    <br>
    <label for="register_password">Mot de passe:</label>
    <input type="password" id="register_password" name="password">
    <br>
    <input type="button" value="Créer un compte" onclick="submitForm('registerForm')">
</form>

<script type="text/javascript">
    function submitForm(formId) {
    var form = document.getElementById(formId);
    var formData = new FormData(form);

    fetch('./modele/connexion.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          if(data.status === "Good") {
              alert(data.message);
              // Stocke le nom d'utilisateur côté client
              localStorage.setItem("username", form.username.value);
              // Redirige vers la page d'accueil
              window.location.replace("./index.php");
          } else {
              alert(data.message);
          }
      }).catch(error => {
          console.error('Erreur:', error);
      });
}

</script>

<?php 

$content = ob_get_clean();
$title = " Connexion/Création ";
require("Gabarit.php");
?>
