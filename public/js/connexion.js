
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form[action="./modele/connexion.php"][method="POST"][name="action"][value="login"]');
    const registerForm = document.querySelector('form[action="./modele/connexion.php"][method="POST"][name="action"][value="register"]');
    
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      sendData('./modele/connexion.php', new FormData(this));
    });
  
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault();
      sendData('./modele/connexion.php', new FormData(this));
    });
  
    async function sendData(url, formData) {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const result = await response.json();
        if (result.status === 'success') {
          // Rediriger vers la page d'accueil ou faire autre chose
          window.location.href = '/index.php';
        } else {
          // Afficher le message d'erreur ou faire autre chose
          alert(result.message);
        }
      } else {
        alert('Erreur de réseau');
      }
    }
  });