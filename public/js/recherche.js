document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('searchForm');

  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const name = formData.get('name') || '';
      const typesArray = formData.getAll('type');
      const colors = formData.getAll('color').join('');
      const manaCost = formData.get('manaCost') || '';

      // Construisez la chaîne de requête pour les types
      const typesQuery = typesArray.map(type => `t:${encodeURIComponent(type)}`).join('+OR+');

      const apiUrl = `https://api.scryfall.com/cards/search?q=${name ? `${encodeURIComponent(name)}+` : ''}${colors ? `c=${encodeURIComponent(colors)}+` : ''}${typesQuery ? `${typesQuery}+` : ''}`;

      try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
              console.error(`Erreur: ${response.status}`);
              return;
          }

          let data = await response.json();
          if (Array.isArray(data.data)) {
              // Filtrer les cartes qui ne correspondent pas au coût en mana
              if (manaCost) {
                  data.data = data.data.filter(card => card.cmc === parseInt(manaCost));
              }


              // Triez les cartes par nom
              data.data.sort((a, b) => a.name.localeCompare(b.name));

              populateCardList(data.data);
          } else {
              console.error("Erreur: Réponse de l'API non conforme ou data.data n'est pas un tableau");
          }
      } catch (error) {
          console.error(`Erreur: ${error}`);
      }
  });
});



  // Le reste du code reste le même
  
  
  function populateCardList(cards) {
    const results = document.getElementById("results");
    results.innerHTML = "";
  
    for (let card of cards) {
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.marginBottom = "20px";
      container.style.border = "1px solid #ccc";
      container.style.padding = "10px";
  
      const img = document.createElement("img");

        if (card.card_faces && card.card_faces.length > 1 && card.card_faces[0].image_uris) {
            img.src = card.card_faces[0].image_uris.large;
        } else {
            img.src = card.image_uris.large;
        }
      img.style.width = "auto";
      img.style.height = "300px"; // Ajustez la hauteur selon vos besoins
      img.style.marginRight = "10px";
      container.appendChild(img);
  
      const cardDetails = document.createElement("div");
      cardDetails.style.flex = "1";
      cardDetails.style.border = "1px solid #ccc";
      cardDetails.style.padding = "10px";


      console.log(card);

      let carte;

      if (card.card_faces && card.card_faces.length > 1 && card.card_faces[0].image_uris) {
        carte = card.card_faces[0];
    } else {
        carte = card;
    }

  
      const manaCost = carte.mana_cost.replace(/\{(\w+)\}/g, function(_, symbol) {
        if (/^\d+$/.test(symbol)) {
          // C'est un coût de mana incolore
          return `<img src="./public/png/Color_C.webp" style="width: 15px; height: auto;">`.repeat(parseInt(symbol));
        }
        // Autres symboles de mana
        const path = `./public/png/Color_${symbol}.webp`;
        return `<img src="${path}" style="width: 15px; height: auto;">`;
      });
      
    
      
      cardDetails.innerHTML = `
        <strong>${card.name}</strong>
        <div>${manaCost}</div>
        <br>
        <div style="font-weight: bold;">${carte.type_line}</div>
        <br>
        <div style="font-style: normal;">${carte.oracle_text}</div>
        <br>
        <div style="font-style: italic;">${carte.flavor_text || ""}</div>
      `;
  
      container.appendChild(cardDetails);
      results.appendChild(container);
    }
  }
  
  
  